import request from '../utils/request'

export const getCollection = (pageindex = 1, condition = '{}') => {
    const limit = 10
    const skip = (pageindex - 1) * 10
    return new Promise((resolve, reject) => {
        request({
            url: '/tcb/databasequery',
            method: 'post',
            data: {
                env: 'develop-6e54e7',
                query: `db.collection("events").where(${condition}).orderBy("age", "asc").limit(${limit}).skip(${skip}).get()`
            }
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error)
        })
    })
}

export const getDocument = (id) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/tcb/databasequery',
            method: 'post',
            data: {
                env: 'develop-6e54e7',
                query: `db.collection("events").doc('${id}').get()`
            }
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

export const updateDocument = (id, data) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/tcb/databaseupdate',
            method: 'post',
            data: {
                env: 'develop-6e54e7',
                query: `db.collection("events").doc('${id}').update({data:${data}})`
            }
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}