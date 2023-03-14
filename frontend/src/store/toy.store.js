import { toyService } from '../services/toy.service'

export const toyStore = {
    state: {
        toys: toyService.query(),
        msg: 'Store Is Running'
    },
    mutations: {
        setToys(state, { toys }) {
            state.toys = toys
        },
        setFilterBy(state, { filterBy }) {
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
        loadToys({ commit }, { filterBy }) {
            toyService
                .query(filterBy)
                .then(toys => {
                    commit({ type: 'setToys', toys })
                })
                .catch(err => {
                    throw err
                })
        },
        setFilter({ commit }, { filterBy }) {
            commit({ type: 'setFilterBy', filterBy })
            toyService.query(filterBy)
                .then(toys => {
                    commit({ type: 'setToys', toys })
                })
                .catch((err) => {
                    console.error('Cannot set filter', err)
                    throw err
                })
        },
        saveToy({ commit }, { toy }) {
            const type = (toy._id) ? 'updateToy' : 'addToy'
            return toyService.save(toy)
                .then(savedToy => {
                    commit({ type, toy: savedToy })
                })
                .catch((err) => {
                    console.error('Cannot save toy', err)
                    throw err
                })
        },
        removeToy({ commit }, { toyId }) {
            return toyService.remove(toyId)
                .then(() => {
                    commit({ type: 'removeToy', toyId })
                })
                .catch((err) => {
                    console.error('Cannot remove toy', err)
                    throw err
                })
        },
    },
    getters: {
        getMsg(state) {
            return state.msg
        },
        toysToDisplay({ toys }) {
            if (!toys) return null
            return toys
        },
        toyById: ({ toys }) => (toyId) => {
            return { ...toys.find(toy => toy._id === toyId) }
        },
    },
    modules: {}
}
