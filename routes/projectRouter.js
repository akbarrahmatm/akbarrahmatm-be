const router = require("express").Router();

const project = require("../controllers/projectController");

router.get("/", project.getAllProject);
router.get("/:slug", project.getProjectBySlug);

module.exports = router;
