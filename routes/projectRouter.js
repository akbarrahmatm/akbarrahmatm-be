const router = require("express").Router();

const project = require("../controllers/projectController");

router.get("/", project.getAllProject);
// router.get("/:slug", project.getPostBySlug);
// router.get("/category/:slug", project.getPostByCategory);

module.exports = router;
