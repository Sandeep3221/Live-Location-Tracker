const { tunnel } = require("cloudflared")

let publicUrl = ""

async function startTunnel(localUrl) {
    try {
        publicUrl = (await tunnel({ "--url": localUrl })).url
    } catch (error) {
        publicUrl = localUrl
        console.warn("Cloudflare tunnel unavailable; using the local URL.")
    }

    return publicUrl
}

function getPublicUrl() {
    return publicUrl
}

module.exports = { startTunnel, getPublicUrl }
