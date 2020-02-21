import request from '../utils/request'

export const getAccessToken = () => {
    try {
        return new Promise((resolve, reject) => {
            request({
                url: '/cgi-bin/token',
                methods: 'get',
                params: {
                    grant_type: 'client_credential',
                    appid: 'wxe59009a99d2c00a0',
                    secret: 'ae2ec044a28288db7b9452b40e17e6ac'
                }
            }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        }).catch(error => {
            console.log(error)
        }) 
    } catch(error) {
        console.log(error)
    }
    
}