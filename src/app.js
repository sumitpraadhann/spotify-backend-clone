const express = require("express")
const cookie =  require("cookie-parser")
const authtouter = require("./routes/auth.routes")
const musicrouter = require('./routes/music.routes')

const app = express()
app.use(cookie())
app.use(express.json())
app.use("/api/auth",authtouter)
app.use("/api/music",musicrouter)
module.exports = app