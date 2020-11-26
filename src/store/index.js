import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import dictionary from './modules/dictionary'
import timeline from './modules/timeline'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        dictionary,
        timeline
    }
})