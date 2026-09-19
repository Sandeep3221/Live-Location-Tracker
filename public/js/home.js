const targetList = document.querySelector("#target-list")
const socket = io({ path: "/socket.io", transports: ["websocket"] })

socket.on("user-connected", (targetId) => {
    const targetLink = document.createElement("a")
    targetLink.href = `/map?id=${encodeURIComponent(targetId)}`
    targetLink.className = "button is-fullwidth"
    targetLink.textContent = targetId
    targetList.appendChild(targetLink)
})
