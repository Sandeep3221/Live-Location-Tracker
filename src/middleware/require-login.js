const config = require("../../config")

function requireLogin(req, res, next) {
    if (req.cookies.token === config.token) return next()

    res.clearCookie("token")
    return res.redirect("/login")
}

module.exports = requireLogin
