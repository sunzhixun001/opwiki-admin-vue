<template>
    <el-container>
        <el-container>
            <el-aside width="200px">
                <el-menu
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                >
                    <el-submenu index="1">
                        <template slot="title">
                            <span>时间线</span>
                        </template>
                        <el-menu-item index="1-2">
                            <router-link to="/timeline">时间线列表</router-link>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <span>人物</span>
                        </template>
                        <el-menu-item index="1-2">
                            <router-link to="/character">人物列表</router-link>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main><router-view></router-view></el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    name: 'Layout',
    data() {
        return {
            activeIndex: '1'
        }
    },
    mounted() {
        this.$store.dispatch('dictionary/getChapters')
    }
}
</script>