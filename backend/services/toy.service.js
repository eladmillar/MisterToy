const fs = require('fs')
const toys = require('../data/toy.json')

module.exports = {
    query,
    getById,
    save,
    remove,
}

function query(filterBy) {
    if (!filterBy) return Promise.resolve(toys)
    const filteredToys = _filterToys(toys, filterBy)
    return Promise.resolve(filteredToys)
}

function getById(toyId) {
    return new Promise((resolve, reject) => {
        if (!toyId) reject('No toy Id')

        const toy = toys.find(bug => bug._id === toyId)
        if (!toy) reject('toy not found')
        resolve(toy)
    })
}

function remove(toyId) {
    if (!toyId) return Promise.reject('No toy Id')

    const idx = toys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('Toy not found')
    toys.splice(idx, 1)
    return _saveToysToFile()
}

function save(newToy) {
    if (newToy._id) {
        const idx = toys.findIndex(toy => toy._id === newToy._id)
        if (idx === -1) return Promise.reject('Toy not found')
        toys.splice(idx, 1, newToy)
    } else {
        newToy._id = _makeId()
        newToy.createdAt = Date.now()
        toys.unshift(newToy)
    }
    return _saveToysToFile()
        .then(() => newToy)
}

function _filterToys(toyToFilter, filter) {
    var toys = [...toyToFilter]
    const str = JSON.stringify(filter)
    filter = JSON.parse(str)

    const { sortBy } = filter
    if (filter.name) {
        const regex = new RegExp(filter.name, 'i')
        toys = toys.filter(toy => regex.test(toy.name))
    }
    if (filter.inStock) {
        toys = toys.filter(toy => toy.inStock === filter.inStock)
    }
    if (filter.labels.length) {
        toys = toys.filter(toy => {
            return filter.labels.every(label => toy.labels.includes(label))
        })
    }
    if (sortBy.by === 'name') {
        toys = toys.sort((a, b) => a.name.localeCompare(b.name) * sortBy.desc)
    }
    if (sortBy.by === 'price') {
        toys = toys.sort((a, b) => (a.price - b.price) * sortBy.desc)
    }
    if (sortBy.by === 'created') {
        toys = toys.sort((a, b) => (a.createdAt - b.createdAt) * sortBy.desc)
    }
    return Promise.resolve(toys)
}

function _makeId(length = 5) {
    let txt = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {
        const content = JSON.stringify(toys, null, 2)
        fs.writeFile('./data/toy.json', content, err => {
            if (err) return reject(err)
            resolve()
        })
    })
}

