const state = {
    visibleDetail: false,
    currentId: 0
}
const mutations = {
    changeVisible (state, payload) {
        state.visibleDetail = payload;
    },
    changeCurrent (state, payload) {
        state.currentId = payload;
    }
}

const actions = {
    
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}