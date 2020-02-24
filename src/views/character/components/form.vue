<template>
    <el-form
        inline
    >
        <el-form-item label="关键字">
            <el-input v-model="form.keyword">
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            form: {
                keyword: '草帽',
            }
        }
    },
    mounted () {
        this.$emit('search', this.form)
    },
    computed: {
        chapters () {
            return this.$store.state.dictionary.chapters
        }
    },
    methods: {
        onSubmit() {
            this.$emit('search', this.form)
        },
        handleAdd () {
            this.$emit('add')
        }
    }
}
</script>