<template>
    <div>
        <el-table
            :data="tableData"
            @row-click="rowClick"
        >
            <el-table-column
                prop="avator"
                label="avator"
            >
                <template slot-scope="scope">
                    <el-avatar 
                        size="small" 
                        :src="scope.row.avator_download_url"
                    />
                </template>
             </el-table-column>
            <el-table-column
                prop="name"
                label="name"
            />
             <el-table-column
                prop="fullname"
                label="fullname"
            />
            <el-table-column
                prop="pinyinName"
                label="pinyinName"
            />
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
    </div>
</template>
<script>
export default {
    props: ['currentPage', 'total', 'tableData'],
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        rowClick(row) {
            this.$emit("row-click", row._id)
        }
    },
}
</script>