import {createStore} from 'vuex'
import persistedstate from 'vuex-persistedstate'

const store = createStore({
    state() {
        return {
            user: {}
        }
    },
    plugins: [
        persistedstate({paths:['user']})
    ],
    mutations: {
        user(state, data) {
            state.user = data;
        }
    }
});

export default store