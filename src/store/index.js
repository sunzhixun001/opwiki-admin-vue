import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import dictionary from './modules/dictionary'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        dictionary
    }
})