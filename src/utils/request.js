import axios from 'axios'
import {
    Message,
    Loading
} from 'element-ui'
import {
    getToken
} from '../utils/auth'

let loading = null;

const service = axios.create({
    baseURL: ''
})

service.interceptors.request.use(config => {
    loading = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    // console.log('config', config);
    if (config.method === 'post') {
        config.url = `${config.url}?access_token=${getToken()}`
    }
    return config;
}, error => {
    return Promise.reject(error)
});

service.interceptors.response.use(response => {
    loading.close()
    
    if(response.status === 200) {
        if (response.config.url.indexOf('cgi-bin/token') >= 0) {
            return Promise.resolve(response.data)
        } else {
            if (response.data.errcode !== 0) {
                Message({
                    message: response.data.errmsg,
                    type: 'error'
                })
                return Promise.reject(response.data.errmsg)
            } else {
                return Promise.resolve(response.data)
            }  
        }
    }
}, error => {
    loading.close()
    return Promise.reject(error)
})

export default service