import request from '../utils/request'

export const query = (key) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/tcb/databasequery',
            method: 'post',
            data: {
                env: 'develop-6e54e7',
                query: `db.collection("dictionary").where({key: "${key}"}).limit(1).skip(0).get()`
            }
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}