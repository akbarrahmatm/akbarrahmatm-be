const ApiError = require("../utils/ApiError");
const { post, category, user } = require("../models");
const validator = require("validator");
const { Op } = require("sequelize");

const getAllPost = async (req, res, next) => {
  try {
    const { name, page, limit } = req.query;

    const condition = {};

    if (name) condition.post_title = { [Op.like]: `%${name}%` };

    const pageNum = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const offset = (pageNum - 1) * pageSize;

    const totalCount = await post.count({ where: condition });

    const posts = await post.findAll({
      where: condition,
      limit: pageSize,
      offset: offset,
      attributes: [
        "post_title",
        "post_image",
        "post_slug",
        "category_id",
        "created_at",
      ],

      include: [
        {
          model: category,
          attributes: ["category", "slug_category"],
          as: "category_detail",
        },
      ],
      order: [["created_at", "DESC"]],
    });

    const totalPages = Math.ceil(totalCount / pageSize);

    if (posts && posts.length > 0) {
      res.status(200).json({
        status: "Success",
        requestAt: req.requestTime,
        message: "Post data successfully retrieved",
        data: {
          posts,
        },
        pagination: {
          totalData: totalCount,
          totalPages,
          pageNum,
          pageSize,
        },
      });
    } else {
      return next(new ApiError("Data not found", 404));
    }
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};

const getPostBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug;

    const postData = await post.findOne({
      where: {
        post_slug: slug,
      },
      include: [
        {
          model: category,
          attributes: ["category", "slug_category"],
          as: "category_detail",
        },
        {
          model: user,
          attributes: ["username", "name"],
          as: "user_detail",
        },
      ],
    });

    if (postData) {
      res.status(200).json({
        status: "Success",
        requestAt: req.requestTime,
        message: `Post data is successfully retrieved`,
        data: {
          post: postData,
        },
      });
    } else {
      return next(new ApiError("Data not found", 404));
    }
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};

const getPostByCategory = async (req, res, next) => {
  try {
    const slug = req.params.slug;

    if (validator.isSlug(slug)) {
      const posts = await post.findAll({
        attributes: [
          "post_title",
          "post_image",
          "post_slug",
          "category_id",
          "created_at",
        ],

        include: [
          {
            model: category,
            attributes: ["category", "slug_category"],
            where: {
              slug_category: slug,
            },
            as: "category_detail",
          },
        ],
        order: [["created_at", "DESC"]],
      });

      const categoryData = await category.findOne({
        where: {
          slug_category: slug,
        },
      });

      if (posts) {
        res.status(200).json({
          status: "Success",
          requestAt: req.requestTime,
          message: `Post data with category: '${categoryData.category}' is successfully retrieved`,
          data: {
            posts,
          },
        });
      } else {
        return next(new ApiError("Data not found", 404));
      }
    } else {
      return next(new ApiError("Slug format is not valid", 400));
    }
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};

module.exports = {
  getAllPost,
  getPostByCategory,
  getPostBySlug,
};
