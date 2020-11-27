import Vue from 'vue'
import {
    batchDownloadFile
} from '../api/file'

Vue.filter('avatorDownload', function (value) {
    return value
    .replace('cloud://', 'https://')
    .replace(/develop-6e54e7\.6465-develop-6e54e7-1259274378|develop-6e54e7\.6465-develop-6e54e7/, '6465-develop-6e54e7-1259274378.tcb.qcloud.la')
})

const fetchBatchDownloadFile = async (value) => {
    const response = await batchDownloadFile([value])
    console.log("batchDownloadFile response", response)
    return response.file_list[0].download_url
}

Vue.filter('batchDownloadFile', function (value) {
    return fetchBatchDownloadFile(value.photo)
})