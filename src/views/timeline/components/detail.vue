<template>
    <el-drawer
        title="时间线明细"
        :visible="visible"
        size="50%"
        @close="close"
    >
        <el-main>
            <el-form
                label-width="80px"
            >
                <el-form-item label="age">
                    <el-input v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="showAge">
                    <el-input v-model="form.showAge"></el-input>
                </el-form-item>
                <el-form-item label="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="photo">
                    <el-image
                        :src="form.photo_download_url"
                    ></el-image>
                    <el-input v-model="form.photo"></el-input>
                </el-form-item>
                <el-form-item label="characters">
                    <el-avatar
                        v-for="character in form.characters"
                        :src="character.avator_download_url"
                        :key="character.id"
                        size="small"
                    ></el-avatar>
                </el-form-item>
            </el-form>
        </el-main>
    </el-drawer>
</template>
<script>
import {
    getDocument
} from '../../../api/timeline'
import {
    batchDownloadFile
} from '../../../api/file'
export default {
    data () {
        return {
            form: {
                photo_download_url: ''
            }
        }
    },
    props: ['visible', 'id'],
    methods: {
        close() {
            this.$emit('update:visible', false)
        }
    },
    watch: {
        id: function (val, oldVal) {
            console.log(`val: ${val}, oldVal: ${oldVal}`)
            getDocument(val).then(response => {
                const tl = JSON.parse(response.data[0])
                this.form = Object.assign(this.form, {...tl})
                batchDownloadFile([tl.photo]).then(response => {
                    this.form.photo_download_url = response.file_list[0].download_url
                }).catch(error => {
                    console.log('error', error)
                })
            }).catch(error => {
                console.log('getDocument error', error)
            })
        }
    }
}
</script>