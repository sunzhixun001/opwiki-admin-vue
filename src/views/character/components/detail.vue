<template>
    <el-drawer
        custom-class="character-detail-drawer"
        title="人物明细"
        :visible="visible"
        size="50%"
        @close="close"
        :withHeader="false"
    >
        <el-container
             style="height: 100%;"
        >
            <el-main>
                <el-form
                    label-width="120px"
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
                    <el-form-item label="englishName">
                        <el-input v-model="form.englishName"></el-input>
                    </el-form-item>
                    <el-form-item label="japaneseName">
                        <el-input v-model="form.japaneseName"></el-input>
                    </el-form-item>
                    <el-form-item label="age">
                        <el-input v-model="form.age"></el-input>
                    </el-form-item>
                    <el-form-item label="height">
                        <el-input v-model="form.height"></el-input>
                    </el-form-item>
                    <el-form-item label="birthday">
                        <el-input v-model="form.birthday"></el-input>
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
                            v-show="form.relationships && form.relationships.length"
                            :data="form.relationships"
                            :show-header="false"
                        >
                            <el-table-column
                                prop="avator"
                            >
                                <template slot-scope="scope">
                                    <el-avatar
                                        :src="scope.row.avator_download_url"
                                        size="small"
                                    ></el-avatar>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="type"
                            />
                        </el-table>
                        <div style="margin-top: 20px">
                            <el-button
                                icon="el-icon-plus"
                            >添加</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </el-main>
            <el-footer>
                <el-button>保存</el-button>
            </el-footer>
        </el-container>
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
        },
        getChatacter (id) {
            getDocument(id).then(response => {
                const _character = JSON.parse(response.data[0])
                batchDownloadFile([_character.avator, _character.img]).then(response => {
                    _character.avator_download_url = response.file_list[0].download_url
                    _character.img_download_url = response.file_list[1].download_url
                    this.form = Object.assign(this.form, {..._character})
                    this.getRelationshipImage(_character.relationships || [])
                }).catch(error => {
                    console.log('error', error)
                })
            }).catch(error => {
                console.log('getDocument error', error)
            })
        },
        getRelationshipImage (relationships) {
            if (relationships && relationships.length > 0) {
                batchDownloadFile(relationships.map(current => current.avator)).then(response => {
                    const files = response.file_list
                    files.forEach((current) => {
                        const target = this.form.relationships.find((element) => element.avator === current.fileid)
                        if (target) {
                            this.$set(target, 'avator_download_url', current.download_url)
                        }
                    })
                }).catch(error => {
                    console.log('getRelationshipImage error', error)
                })
                }
            }
    },
    watch: {
        id: function (val, oldVal) {
            console.log(`val: ${val}, oldVal: ${oldVal}`)
            this.getChatacter(val)
        }
    },
    beforeUpdate () {
        console.log('beforeUpdate')
    }
}
</script>
<style>
    .character-detail-drawer .el-drawer__body {
        height: 100%;
    }
    .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
</style>