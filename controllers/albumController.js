const { album, user, photo } = require("../models");
const ApiError = require("../utils/ApiError");
const validator = require("validator");

const getAllAlbum = async (req, res, next) => {
  try {
    const { name, page, limit } = req.query;

    const condition = {};

    if (name) condition.album_title = { [Op.like]: `%${name}%` };

    const pageNum = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const offset = (pageNum - 1) * pageSize;

    const totalCount = await album.count({ where: condition });

    const albums = await album.findAll({
      where: condition,
      limit: pageSize,
      offset: offset,
      order: [["created_at", "DESC"]],
    });

    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json({
      status: "Success",
      requestAt: req.requestTime,
      message: "Album data is successfully retrieved",
      data: { albums },
      pagination: {
        totalData: totalCount,
        totalPages,
        pageNum,
        pageSize,
      },
    });
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};

const getAlbumBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug;

    if (validator.isSlug(slug)) {
      const albumData = await album.findOne({
        where: {
          album_slug: slug,
        },
        order: [["created_at", "DESC"]],
        include: [
          {
            model: user,
            attributes: ["username", "name"],
            as: "user_detail",
          },
        ],
      });

      const photos = await photo.findAll({
        where: {
          album_id: albumData.album_id,
        },
        order: [["uploaded_at", "DESC"]],

        include: [
          {
            model: user,
            attributes: ["username", "name"],
            as: "user_detail",
          },
        ],
      });

      res.status(200).json({
        status: "Success",
        requestAt: req.requestTime,
        message: "Album data is successfully retrieved",
        data: {
          album: albumData,
          photos,
        },
      });
    } else {
      return next(new ApiError("Slug format is incorrect", 400));
    }
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};

module.exports = {
  getAllAlbum,
  getAlbumBySlug,
};
