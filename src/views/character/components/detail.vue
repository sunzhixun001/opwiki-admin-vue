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
                    <el-form-item label="名字">
                        <el-col :span="10">
                            <el-input v-model="form.name"></el-input>
                        </el-col>
                        <el-col :span="4">
                            全名
                        </el-col>
                        <el-col :span="10">
                            <el-input v-model="form.fullname"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="拼音名">
                        <el-col :span="10">
                            <el-input v-model="form.pinyinName"></el-input>
                        </el-col>
                        <el-col :span="4">
                            英文名
                        </el-col>
                        <el-col :span="10">
                            <el-input v-model="form.englishName"></el-input>
                        </el-col>
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
                        <el-date-picker 
                            v-model="form.birthday"
                            type="date"
                            placeholder="生日"
                            default-value="1500-01-01"
                            value-format="yyyy-MM-dd"
                        ></el-date-picker>
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
                    <el-form-item label="角色">
                        <el-radio-group v-model="form.role">
                            <el-radio :label="0">无</el-radio>
                            <el-radio :label="1">海贼</el-radio>
                            <el-radio :label="2">海军</el-radio>
                            <el-radio :label="3">革命家</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="海贼团">
                        <el-col :span="10">
                            <el-input v-model="form.priateRegimentName"></el-input>
                        </el-col>
                        <el-col :span="4">
                            -
                        </el-col>
                        <el-col :span="10">
                            <el-input v-model="form.job"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="赏金">
                        <el-col :span="10">
                            <el-input v-model="form.bounty"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="能力">
                        <el-col :span="14">
                            <el-radio-group v-model="form.devilfruitType">
                                <el-radio label="超人系">超人系</el-radio>
                                <el-radio label="自然系">自然系</el-radio>
                                <el-radio label="动物系">动物系</el-radio>
                            </el-radio-group>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="form.devilfruitName"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <i class="el-icon-delete-solid"></i>
                        </el-col>
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
    </el-drawer>
</template>
<script>
import {
    getDocument,
    UpdateDocument
} from '../../../api/character'
import {
    batchDownloadFile
} from '../../../api/file'
export default {
    data () {
        return {
            form: {
                name: '',
                role: 0,
                birthday: ''
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
        },
        handleSave () {
            UpdateDocument(this.id, (`
                {
                    birthday: "${this.form.birthday}"
                }
            `).replace(/\s/g, '')).then(response => {
                const {matched, modified} = response
                if (matched && modified) {
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                }
                console.log(response)
            }).catch(error => {
                console.log(error);
            })
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
        border-top: solid 1px #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    .action {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .action .button {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
</style>