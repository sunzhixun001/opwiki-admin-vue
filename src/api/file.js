import request from '../utils/request'

export const batchDownloadFile = (fileids) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/tcb/batchdownloadfile',
            method: 'post',
            data: {
                env: 'develop-6e54e7',
                file_list: fileids.map(f => {
                    return {
                        fileid: f,
                        max_age: 7200
                    }
                })
            }
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}