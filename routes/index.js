const router = require("express").Router();

const categoryRouter = require("./categoryRouter");
const postRouter = require("./postRouter");
const projectRouter = require("./projectRouter");
const siteRouter = require("./siteRouter");

router.use("/api/v1/category", categoryRouter);
router.use("/api/v1/post", postRouter);
router.use("/api/v1/project", projectRouter);
router.use("/api/v1/site", siteRouter);

module.exports = router;
