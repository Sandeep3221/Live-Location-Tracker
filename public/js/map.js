const targetId = new URLSearchParams(window.location.search).get("id")
const displayId = document.querySelector("#display-id")
const initialLocation = [Number(document.body.dataset.lat), Number(document.body.dataset.lng)]

displayId.textContent = targetId

const map = L.map("map").setView(initialLocation, 12)
const marker = L.marker(initialLocation).addTo(map)

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors",
}).addTo(map)

const socket = io({ path: "/socket.io", transports: ["websocket"] })
let statusTimer

socket.on("map-data", ({ id, lat, lng }) => {
    if (id !== targetId) return

    const nextLocation = [Number(lat), Number(lng)]
    displayId.textContent = `${targetId} - updating`
    marker.setLatLng(nextLocation)
    map.setView(nextLocation)

    clearTimeout(statusTimer)
    statusTimer = setTimeout(() => {
        displayId.textContent = targetId
    }, 2500)
})
