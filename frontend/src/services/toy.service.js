import { storageService } from "./asyncStorage.service.js"
import { utilService } from "./util-service"
import { httpService } from "./http.service.js"

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
}
const KEY = 'toy_DB'

console.log('Toy service is up')
// _createToys()

const API = 'toy/'

function query(filter) {
    return storageService.query(KEY, filter)
    // return httpService.get(BASE_URL, filter).then(res => res.data)
}

function getById(toyId) {
    // return storageService.getById(KEY, toyId)
    // return httpService.get(BASE_URL, toyId).then(res => res.data)
}

function save(toyToSave) {
    // if (toyToSave._id) return storageService.put(KEY, toyToSave)
    // else return storageService.post(KEY, toyToSave)

    // if (toyToSave._id) return httpService.put(BASE_URL, toyToSave).then(res => res.data)
    // else return httpService.post(BASE_URL, toyToSave).then(res => res.data)
}

function remove(toyId) {
    // return storageService.remove(KEY, toyId)
    // return httpService.delete(BASE_URL, toyId).then(res => res.data)
}

function getEmptyToy() {
    return {
        _id: '',
        name: '',
        price: null,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: new Date(Date.now()).toLocaleString(),
        inStock: true,
    }
}

function _createToys() {
    var toys = JSON.parse(localStorage.getItem(KEY))
    if (!toys || !toys.length) {
        toys = [
            _createToy('Talking Doll', 123, ['Doll', 'Battery Powered', 'Baby'], ['Good', 'Nice', 'Fun']
            ),
            _createToy('Ball', 50, ['Outdoor', 'Baby'], ['Amazing!']),
            _createToy('Cards', 250, ['Box game'], ['wow!', 'awesome']),
        ]
        localStorage.setItem(KEY, JSON.stringify(toys))
    }
}

function _createToy(name, price, labels, reviews) {
    return {
        _id: utilService.makeId(),
        name,
        price,
        labels,
        inStock: true,
        createdAt: new Date(Date.now()).toLocaleString(),
        reviews: reviews,
    }
}