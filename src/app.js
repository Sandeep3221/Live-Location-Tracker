const path = require("path")
const http = require("http")
const express = require("express")
const cookieParser = require("cookie-parser")
const socketIo = require("socket.io")
const tarkine = require("tarkine")

const createRouter = require("./routes")
const targetStore = require("./store/targets")

function createApplication() {
    const app = express()
    const server = http.createServer(app)
    const io = new socketIo.Server(server)

    app.set("views", path.join(__dirname, "..", "views"))
    app.set("view engine", "html")
    app.engine("html", tarkine.renderFile)

    app.use(cookieParser())
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.use(express.static(path.join(__dirname, "..", "public")))
    app.use("/", createRouter({ io, targetStore }))

    return { app, server, io }
}

module.exports = { createApplication }
