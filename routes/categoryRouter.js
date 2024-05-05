const router = require("express").Router();

const category = require("../controllers/categoryController");

router.get("/", category.getAllCategory);
router.get("/:id", category.getCategoryById);
router.get("/detail/:slug", category.getCategoryBySlug);

module.exports = router;
