<template>
    <el-form
        inline
        :model="form"
    >
        <el-form-item label="篇章">
            <el-select 
                v-model="form.chapter"
                clearable
            >
                <el-option
                    v-for="chap in chapters"
                    :key="chap.$index"
                    :value="chap.name"
                >
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="关键字">
            <el-input v-model="form.keyword">
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="onAdd">新增</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            form: {
                chapter: '',
                keyword: ''
            }
        }
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
        onAdd() {
            this.$store.commit('changeVisible', true);
        }
    }
}
</script>