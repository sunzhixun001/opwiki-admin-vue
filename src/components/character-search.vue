<template>
    <el-dialog
        title="提示"
        visible
    >
        <el-container>
            <el-main>
                <el-form :model="form">
                    <el-form-item>
                        <el-input placeholder="请输入内容" class="input-with-select" v-model="form.keyword">
                            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                        </el-input>
                    </el-form-item>
                </el-form>
                <el-row>
                    <el-col
                        :span="6"
                        :class="{'avatar': true, 'selected': character.selected}"
                        v-for="character in characters"
                        :key="character.id"
                    >
                        <div
                            @click="handleClick(character)"
                        >
                            <el-avatar
                                :size="50"
                                :src="character.avator | avatorDownload"  
                        />
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary">确定</el-button>
            </div>
    </el-dialog>
</template>
<script>
import { getCollection } from '@/api/character'
import { searchCondition } from '@/utils/timeline'
export default {
    data () {
        return {
            characters: [],
            form: {
                keyword: ''
            }
        }
    },
    methods: {
        handleClick(character) {
            const {
                id
            } = character;
            this.characters.forEach((c) => {
                if (c.id === id) {
                    c.selected = !c.selected;
                }
            });
        },
        handleSearch () {
            getCollection(1, 10, searchCondition(this.form)).then(data => {
                this.characters = data.data.map(d => {
                    let c = JSON.parse(d);
                    return {
                        id: c._id,
                        avator: c.avator,
                        selected: false
                    };
                });
            })
        }
    }
}
</script>
<style lang="less" scoped>
.avatar {
    padding: 10px 0;
}
.selected {
    .el-avatar {
        border: orangered solid 2px;
    }
}
</style>