const router = require("express").Router();

const site = require("../controllers/siteController");

router.get("/", site.getSiteInfo);

module.exports = router;
