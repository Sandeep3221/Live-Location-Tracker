const targets = Object.create(null)

function has(id) {
    return Object.hasOwn(targets, id)
}

function get(id) {
    return targets[id]
}

function set(id, lat, lng) {
    targets[id] = [Number(lat), Number(lng)]
}

function all() {
    return targets
}

module.exports = { has, get, set, all }
