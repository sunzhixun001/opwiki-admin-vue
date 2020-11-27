<template>
    <div>
        <search-from v-on:search="handleSearch" />
        <timeline-table
            :currentPage="currentPage"
            :total="total"
            :tableData="tableData"
            v-on:change="handlePage"
        />
        <el-drawer
            title="时间线明细"
            :visible.sync="visibleDetail"
            size="50%"
            destroy-on-close
        >
            <timeline-detail />
        </el-drawer>
        <character-search />
    </div>
</template>
<script>
import {
    getCollection
} from '@/api/timeline'
import { visibleDetail } from '@/utils/timeline';
import SearchFrom from './components/timeline-form'
import TimelineTable from './components/timeline-table'
import TimelineDetail from './components/timeline-detail'
export default {
    name: 'timeLime',
    data() {
        return {
            tableData: [],
            form: {
                chapter: '',
                keyword: ''
            },
            currentPage: 1,
            total: 0,
            visibleDeatil: false,
            timeline: {},
            id: ''
        }
    },
    methods: {
        handleSearch(form) {
            this.form = form;
            this.fetchGetCollection(form, 1);
        },
        handlePage(page) {
            this.currentPage = page;
            this.fetchGetCollection(this.form, page);
        },
        getSearchParams(form) {
            return (`
                db.command.and([
                    {
                        title: db.RegExp({
                            regexp: '.*${form.keyword}.*',
                            options: 'i'
                        })
                    },
                    {
                        tags: db.RegExp({
                            regexp: '.*${form.chapter}.*',
                            options: 'i'
                        })
                    }
                ])
                
            `).replace(/\s/g, '');
        },
        fetchGetCollection(form, index = 1) {
            getCollection(index, this.getSearchParams(form)).then(data => {
                console.log(data);
                this.tableData = data.data.map(item => {
                    return JSON.parse(item)
                })
                this.total = data.pager.Total
            }, error => {
                console.warn(error);
            })
        }
    },
    mounted() {
        console.log(this.$store);
    },
    filters: {
        avatorDownlong: function(value) {
            return value.replace('cloud://develop-6e54e7.6465-develop-6e54e7', 'https://6465-develop-6e54e7-1259274378.tcb.qcloud.la')
        }
    },
    computed: {
        visibleDetail: {
            get() {
                return this.$store.state.timeline.visibleDetail
            },
            set(v) {
                visibleDetail(v);
            }
            
        }
    },
    components: {
        'search-from': SearchFrom,
        'timeline-table': TimelineTable,
        'timeline-detail': TimelineDetail
    }
}
</script>