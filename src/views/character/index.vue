<template>
    <div>
        <search-from 
            @search="doSearch"
        />
        <character-table 
            :currentPage="currentPage"
            :total="total"
            :tableData="tableData"
            v-on:row-click="tableRowClick"
        />
        <character-detail 
            v-bind:visible.sync="visibleDeatil"
            :id="id"
        />
    </div>
</template>
<script>
import SearchFrom from './components/form'
import CharacterTable from './components/table'
import CharacterDetail from './components/detail'
import {
    getCollection
} from '../../api/character'
import {
    batchDownloadFile
} from '../../api/file'
export default {
    data () {
        return {
            tableData: [],
            currentPage: 1,
            total: 0,
            id: '',
            visibleDeatil: false
        }
    },
    mounted() {
        this.doSearch({})
    },
    components: {
        'search-from': SearchFrom,
        'character-table': CharacterTable,
        'character-detail': CharacterDetail
    },
    methods: {
        tableRowClick(id) {
            this.id = id
            this.visibleDeatil = true
        },
        doSearch (form) {
            console.log(form)
            getCollection(1, 10, 
            (`
                db.command.or([
                    {
                        fullname: db.RegExp({
                            regexp: ".*${form.keyword || ''}.*",
                            options: 'i'
                        })
                    }
                ])
            `).replace(/\s/g, '')
            ).then(response => {
                console.log('getCollection response', response)
                const list = response.data.map(item => {
                    return JSON.parse(item)
                })
                batchDownloadFile(list.map(item => item.avator)).then(fileResponse => {
                    console.log('fileResponse', fileResponse)
                    fileResponse.file_list.forEach((current) => {
                        const target = list.find((element) => element.avator === current.fileid);
                        if (target) {
                            target.avator_download_url = current.download_url
                        }
                    })
                    this.tableData = list
                    this.currentPage = 1
                    this.total = response.pager.Total
                })
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>