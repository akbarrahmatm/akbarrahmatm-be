const ApiError = require("../utils/ApiError");
const { site } = require("../models");

const getSiteInfo = async (req, res, next) => {
  try {
    const siteInfo = await site.findOne({
      where: {
        site: "main_site",
      },
      attributes: ["announcement", "site_name"],
    });

    res.status(200).json({
      status: "Success",
      requestAt: req.requestTime,
      message: "Site information successfully retrieved",
      data: siteInfo,
    });
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};

module.exports = {
  getSiteInfo,
};
