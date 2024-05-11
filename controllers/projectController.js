const ApiError = require("../utils/ApiError");
const { project, user } = require("../models");
const validator = require("validator");
const { Op } = require("sequelize");

const getAllProject = async (req, res, next) => {
  try {
    const { name, page, limit } = req.query;

    const condition = {};

    if (name) condition.project_title = { [Op.like]: `%${name}%` };

    const pageNum = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const offset = (pageNum - 1) * pageSize;

    const totalCount = await project.count({ where: condition });

    const projects = await project.findAll({
      where: condition,
      limit: pageSize,
      offset: offset,
      attributes: [
        "project_title",
        "project_description",
        "project_image",
        "project_slug",
        "created_at",
      ],
      order: [["created_at", "DESC"]],
    });

    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json({
      status: "Success",
      requestAt: req.requestTime,
      message: "Project data successfully retrieved",
      data: { projects },
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

const getProjectBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug;

    if (validator.isSlug(slug)) {
      const projectData = await project.findOne({
        where: {
          project_slug: slug,
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
        message: "Project data successfully retrieved",
        data: { project: projectData },
      });
    } else {
      return next(new ApiError("Slug format is not valid", 400));
    }
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};

module.exports = {
  getAllProject,
  getProjectBySlug,
};
