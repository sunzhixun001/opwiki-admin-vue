import {
    getAccessToken
} from '../../api/user'
import {
    getToken
} from '../../utils/auth'

const state = {
    name: '',
    token: getToken()
};

const mutations = {
    setToken(state, { token }) {
        state.token = token
    }
}

const actions = {
    getToken() {
        return new Promise((resolve, reject) => {
            getAccessToken().then(response => {
                console.log('getToken response', response);
                localStorage.setItem('access_token', response.access_token);
                localStorage.setItem('expires_in', (new Date()).getTime() + (response.expires_in * 1000))
                resolve();
            }).catch(error => {
                reject(error)
            })
        })
    },
    login() {
        return new Promise((resolve) => {
            resolve();
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}