import request from '../utils/request'

export const getCollection = (pageindex = 1, pagesize = 10, condition = '{}') => {
    const limit = pagesize
    const skip = (pageindex - 1) * pagesize
    return new Promise((resolve, reject) => {
        request({
            url: '/tcb/databasequery',
            method: 'post',
            data: {
                env: 'develop-6e54e7',
                query: `db.collection("biologicals").where(${condition}).orderBy("pinyinName", "asc").limit(${limit}).skip(${skip}).get()`
            }
        }).then(response => {
            resolve(response)
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
                query: `db.collection("biologicals").doc('${id}').get()`
            }
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}