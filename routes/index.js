const router = require("express").Router();

const categoryRouter = require("./categoryRouter");
const postRouter = require("./postRouter");

router.use("/api/v1/category", categoryRouter);
router.use("/api/v1/post", postRouter);

module.exports = router;
