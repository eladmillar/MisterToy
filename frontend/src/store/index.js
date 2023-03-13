import { createStore } from 'vuex'
import { toyService } from '../services/toy.service'
export const store = createStore({
    state: {
        toys: toyService.query(),
        msg: 'Store Is Running'
    },
    mutations: {
        setToys(state, { toys }) {
            state.toys = toys
        },
    },
    actions: {
        loadToys(context) {
            // console.log('context', context)
            toyService
                .query()
                .then(toys => {
                    // console.log('toys:', toys)
                    context.commit({ type: 'setToys', toys })
                })
                .catch(err => {
                    throw err
                })
        },
    },
    getters: {
        getMsg(state) {
            return state.msg
        },
        toysToDisplay(state) {
            // console.log('getter toys:', toys)
            if (!state.toys) return null
            return state.toys
        }
    },
    modules: {}
})
