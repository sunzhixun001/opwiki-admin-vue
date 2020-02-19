<template>
    <div>
        <el-table
            :data="tableData"
            @row-click="rowClick"
        >
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