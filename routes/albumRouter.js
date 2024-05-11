const router = require("express").Router();

const album = require("../controllers/albumController");

router.get("/", album.getAllAlbum);
router.get("/:slug", album.getAlbumBySlug);

module.exports = router;
