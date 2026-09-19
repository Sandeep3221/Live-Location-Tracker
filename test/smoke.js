const assert = require("node:assert/strict")
const { createApplication } = require("../src/app")

async function run() {
    const { server, io } = createApplication()
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve))

    const baseUrl = `http://127.0.0.1:${server.address().port}`

    try {
        const protectedPage = await fetch(`${baseUrl}/`, { redirect: "manual" })
        assert.equal(protectedPage.status, 302)
        assert.equal(protectedPage.headers.get("location"), "/login")

        const loginPage = await fetch(`${baseUrl}/login`)
        assert.equal(loginPage.status, 200)

        const locationResponse = await fetch(`${baseUrl}/weather`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ id: "test-target", lat: 12.34, lng: 56.78 }),
        })
        assert.equal(locationResponse.status, 200)

        const loginResponse = await fetch(`${baseUrl}/login`, {
            method: "POST",
            redirect: "manual",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            body: "username=admin&password=admin",
        })
        const cookie = loginResponse.headers.get("set-cookie").split(";")[0]

        const dashboardResponse = await fetch(`${baseUrl}/`, { headers: { cookie } })
        assert.equal(dashboardResponse.status, 200)
        assert.match(await dashboardResponse.text(), /test-target/)

        const mapResponse = await fetch(`${baseUrl}/map?id=test-target`, { headers: { cookie } })
        assert.equal(mapResponse.status, 200)
        assert.match(await mapResponse.text(), /data-lat="12\.34"/)

        console.log("Smoke test passed")
    } finally {
        io.close()
        await new Promise((resolve) => server.close(resolve))
    }
}

run().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
