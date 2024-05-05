const { category } = require("../models");
const validator = require("validator");
const ApiError = require("../utils/ApiError");

const getAllCategory = async (req, res, next) => {
  try {
    const categories = await category.findAll();

    if (categories && categories.length > 0) {
      res.status(200).json({
        status: "Success",
        message: "Category data successfully retrieved",
        requestAt: req.requestTime,
        data: {
          categories,
        },
      });
    } else {
      return next(new ApiError("Data not found", 404));
    }
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (validator.isUUID(id)) {
      const categoryData = await category.findOne({
        where: {
          category_id: id,
        },
      });

      console.log(categoryData);

      if (categoryData) {
        res.status(200).json({
          status: "Success",
          message: `Category data with id ${categoryData.category_id} successfully retrieved`,
          requestAt: req.requestTime,
          data: {
            category: categoryData,
          },
        });
      } else {
        return next(new ApiError("Category is not found", 404));
      }
    } else {
      return next(new ApiError("ID format is not valid", 400));
    }
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};

const getCategoryBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug;

    const categoryData = await category.findOne({
      where: {
        slug_category: slug,
      },
    });

    if (categoryData) {
      res.status(200).json({
        status: "Success",
        message: "Category data successfully retrieved",
        requestAt: req.requestTime,
        data: {
          category: categoryData,
        },
      });
    } else {
      return next(new ApiError("Data not found", 404));
    }
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};

module.exports = {
  getAllCategory,
  getCategoryById,
  getCategoryBySlug,
};
