<template>
    <el-container>
        <el-main>
            <el-form
                label-width="80px"
            >   
                <el-form-item label="id">
                    {{form._id}}
                </el-form-item>
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
                        :src="form.photo_download_url || form.photo"
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
        <el-footer>
            <div class="action">
                <div class="button">
                    <el-button type="primary" @click="handleSave">保存</el-button>
                </div>
            </div>
        </el-footer>
    </el-container>
</template>
<script>
import {
    getDocument,
    updateDocument
} from '@/api/timeline'
import {
    batchDownloadFile
} from '@/api/file'
export default {
    data () {
        return {
            form: {
                photo_download_url: ''
            }
        }
    },
    methods: {
        saveParams (form) {
            return (`
                {
                    showAge: "${form.showAge}",
                    photo: "${form.photo}"
                }
            `).replace(/\s/g, '')
        },
        handleSave() {
            updateDocument(this.form._id, this.saveParams(this.form));
        }
    },
    mounted() {
         getDocument(this.id).then(response => {
            const tl = JSON.parse(response.data[0])
            this.form = Object.assign({}, this.form, {...tl})
            if (tl.photo.indexOf('cloud') === 0) {
                batchDownloadFile([tl.photo]).then(response => {
                    this.form.photo_download_url = response.file_list[0].download_url
                }).catch(error => {
                    console.log('error', error)
                })
            }
        }).catch(error => {
            console.log('getDocument error', error)
        })
    },
    computed: {
        id () {
            return this.$store.state.timeline.currentId
        }
    }
}
</script>