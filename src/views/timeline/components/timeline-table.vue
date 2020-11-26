<template>
    <div>
        <el-table
            border=""
            :data="tableData"
            @row-click="rowClick"
        >
            <el-table-column type="index" />
            <el-table-column
                prop="age"
                label="age"
            />
             <el-table-column
                prop="showAge"
                label="showAge"
            />
            <el-table-column
                prop="title"
                label="title"
            />
            <el-table-column
                label="tags"
            >
                <template slot-scope="scope">
                    <el-tag 
                        v-for="tag in scope.row.tags"
                        :key="tag"
                    >{{tag}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                label="characters"
            >
                <template slot-scope="scope">
                    <el-avatar 
                        v-for="chara in scope.row.characters"
                        :key="chara.id"
                        :src="chara.avator | avatorDownload"
                        size="small"
                    />
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total"
        >
        </el-pagination>
    </div>
</template>
<script>
import { visibleDetail, currentDetail } from '@/utils/timeline';
export default {
    props: ['currentPage', 'total', 'tableData'],
    methods: {
        handleCurrentChange(val) {
            this.$emit('change', val)
        },
        rowClick(row) {
            visibleDetail(true);
            currentDetail(row._id);
        }
    },
}
</script>