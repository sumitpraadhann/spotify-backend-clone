const express = require("express")
const musiccontroller = require("../controller/music.controllers")
const middlewears = require("../middlewares/auth.midllewears")
const multer = require("multer")

const upload = multer({
    storage:multer.memoryStorage()
})
const router = express.Router()

router.post("/upload",middlewears.authartist,upload.single("music"),musiccontroller.createmusic)

router.post("/album",middlewears.authartist,upload.single("music"),musiccontroller.createalbum)

router.get("/",middlewears.authuser,musiccontroller.getallmusic)
router.get("/albums",middlewears.authuser,musiccontroller.getalbum)


module.exports = router