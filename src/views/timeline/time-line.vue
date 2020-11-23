<template>
    <div>
        <search-from v-on:search="handleSearch" />
        <timeline-table
            :currentPage="currentPage"
            :total="total"
            :tableData="tableData"
            v-on:row-click="tableRowClick"
        />
        <timeline-detail
            v-bind:visible.sync="visibleDeatil"
            :id="id"
        />
    </div>
</template>
<script>
import {
    getCollection
} from '@/api/timeline'
import SearchFrom from './components/form'
import TimelineTable from './components/table'
import TimelineDetail from './components/timeline-detail'
export default {
    name: 'timeLime',
    data() {
        return {
            tableData: [],
            currentPage: 1,
            total: 0,
            visibleDeatil: false,
            timeline: {},
            id: ''
        }
    },
    methods: {
        handleSearch(form) {
            this.fetchGetCollection(form.keyword);
        },
        tableRowClick(id) {
            this.id = id
            this.visibleDeatil = true
        },
        getSearchParams(keyword) {
            return (`
                {
                    title: db.RegExp({
                        regexp: '.*${keyword}.*',
                        options: 'i'
                    })
                }
            `).replace(/\s/g, '');
        },
        fetchGetCollection(keyword) {
            getCollection(1, this.getSearchParams(keyword)).then(data => {
                console.log(data);
                this.tableData = data.data.map(item => {
                    return JSON.parse(item)
                })
            this.total = data.pager.Total
        })
        }
    },
    mounted() {
       this.fetchGetCollection();
    },
    filters: {
        avatorDownlong: function(value) {
            return value.replace('cloud://develop-6e54e7.6465-develop-6e54e7', 'https://6465-develop-6e54e7-1259274378.tcb.qcloud.la')
        }
    },
    components: {
        'search-from': SearchFrom,
        'timeline-table': TimelineTable,
        'timeline-detail': TimelineDetail
    }
}
</script>