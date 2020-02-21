<template>
    <el-drawer
        title="人物明细"
        :visible="visible"
        size="50%"
        @close="close"
    >
        <div>
        <el-main>
            <el-form
                label-width="80px"
                size="mini"
            >
                <el-form-item label="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="fullname">
                    <el-input v-model="form.fullname"></el-input>
                </el-form-item>
                <el-form-item label="pinyinName">
                    <el-input v-model="form.pinyinName"></el-input>
                </el-form-item>
                <el-form-item label="photo">
                    <el-image
                        :src="form.img_download_url"
                        style="width: 100px; height: 100px"
                    ></el-image>
                    <el-input v-model="form.img"></el-input>
                </el-form-item>
                <el-form-item label="characters">
                    <el-table   
                        :data="form.relationships"
                    >
                        <el-table-column
                            prop="avator"
                            label="avator"
                        >
                            <template slot-scope="scope">
                                <el-avatar
                                    :src="scope.row.avator_download_url"
                                    size="small"
                                ></el-avatar>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="name"
                        />
                    </el-table>
                    
                </el-form-item>
            </el-form>
        </el-main>
        </div>
    </el-drawer>
</template>
<script>
import {
    getDocument
} from '../../../api/character'
import {
    batchDownloadFile
} from '../../../api/file'
export default {
    data () {
        return {
            form: {
                name: ''
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
                const _character = JSON.parse(response.data[0])
                batchDownloadFile([_character.avator, _character.img]).then(response => {
                    _character.avator_download_url = response.file_list[0].download_url
                    _character.img_download_url = response.file_list[1].download_url
                    this.form = Object.assign(this.form, {..._character})
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