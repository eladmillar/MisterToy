import { toyService } from '../services/toy.service'

export const toyStore = ({
    state: {
        toys: null,
        labels:
            ['On wheels',
                'Box game',
                'Art',
                'Baby',
                'Doll',
                'Puzzle',
                'Outdoor',],
        filterBy: null,
    },
    mutations: {
        setToys(state, { toys }) {
            state.toys = toys
        },
        setFilterBy(state, { filterBy }) {
            console.log('test1')
            state.filterBy = filterBy
        },
        addToy({ toys }, { toy }) {
            toys.push(toy)
        },
        updateToy({ toys }, { toy }) {
            const idx = toys.findIndex(td => td._id === toy._id)
            toys.splice(idx, 1, toy)
        },
        removeToy({ toys }, { toyId }) {
            const idx = toys.findIndex(toy => toy._id === toyId)
            toys.splice(idx, 1)
        },
    },
    actions: {
        async loadToys({ commit }, { filterBy }) {
            try {
                const toys = await toyService.query(filterBy)
                commit({ type: 'setToys', toys })
            } catch (err) {
                throw err
            }
        },
        async setFilter({ commit }, { filterBy }) {
            try {
                // commit({ type: 'setFilterBy', filterBy })
                const toys = await toyService.query(filterBy)
                commit({ type: 'setToys', toys })
            } catch (err) {
                console.error('Cannot set filter', err)
                throw err
            }
        },
        async saveToy({ commit }, { toy }) {
            const type = (toy._id) ? 'updateToy' : 'addToy'
            try {
                const savedToy = await toyService.save(toy)
                commit({ type, toy: savedToy })
            } catch (err) {
                console.error('Cannot save toy', err)
                throw err
            }
        },
        async removeToy({ commit }, { toyId }) {
            try {
                await toyService.remove(toyId)
                commit({ type: 'removeToy', toyId })
            } catch (err) {
                console.error('Cannot remove toy', err)
                throw err
            }
        },
    },
    getters: {
        labels(state) {
            return state.labels
        },
        toysToDisplay({ toys }) {
            if (!toys) return null
            return toys
        },
        pricesPerLabel({ toys }) {
            let res = {}
            toys.forEach(toy => {
                res = toy.labels.reduce((obj, label) => {
                    if (!obj[label]) obj[label] = 0
                    obj[label] += toy.price
                    return obj
                }, res)
            })
            return res
        },
    },
    modules: {}
})