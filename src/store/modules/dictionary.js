import {
    query
} from '../../api/dictionary'

const state = {
    chapters: []
}

const mutations = {
    setChapters (state, payload) {
        state.chapters = payload.chapters
    }
}

const actions = {
    getChapters (context) {
        query("chapter").then(response => {
            // console.log("getChapters", response);
            const d = JSON.parse(response.data[0])
            context.commit('setChapters', {chapters: d.value})
        }).catch(error => {
            console.log("getChapters -> query", error)
        });
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}