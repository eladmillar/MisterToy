import { createStore } from 'vuex';

import { toyStore } from './toy.store.js'
import { userStore } from './user.store.js'

const store = createStore({
    strict: true,
    state() { return { msg: 'Store Is Running' } },
    mutations: {},
    getters: {
        getMsg(state) {
            return state.msg
        },
    },
    actions: {},
    modules: {
        toyStore,
        userStore
    }
})
export default store;
