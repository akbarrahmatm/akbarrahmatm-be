const { album, user, photo } = require("../models");
const ApiError = require("../utils/ApiError");
const validator = require("validator");

const getAllAlbum = async (req, res, next) => {
  try {
    const albums = await album.findAll();

    res.status(200).json({
      status: "Success",
      requestAt: req.requestTime,
      message: "Album data is successfully retrieved",
      data: { albums },
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
