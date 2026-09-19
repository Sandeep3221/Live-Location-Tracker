const { createApplication } = require("./src/app")
const { startTunnel } = require("./src/services/tunnel")
const config = require("./config")

function startServer() {
    const { server } = createApplication()

    server.listen(config.port, async () => {
        const localUrl = `http://localhost:${config.port}`
        const publicUrl = await startTunnel(localUrl)

        console.log(`LOCAL  : ${localUrl}`)
        console.log(`REMOTE : ${publicUrl}`)
    })
}

startServer()
