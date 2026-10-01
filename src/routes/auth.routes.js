const express = require("express")
const authtoute = require("../controller/auth.controllers")

const router = express.Router()

router.post("/register",authtoute.registeruser)
router.post("/login",authtoute.loginuser)
router.post("/logout",authtoute.logoutusers)


module.exports = router