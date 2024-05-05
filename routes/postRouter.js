const router = require("express").Router();

const post = require("../controllers/postController");

router.get("/", post.getAllPost);
router.get("/:slug", post.getPostBySlug);
router.get("/category/:slug", post.getPostByCategory);

module.exports = router;
