<template>
    <el-form>
        <el-form-item>
            <el-button type="primary" v-on:click="submit">获取token</el-button>
        </el-form-item>

    </el-form>
</template>

<script>
    import {
        getAccessToken
    } from '../../api/user'
    export default {
        methods: {
            submit: function() {
                getAccessToken().then(response => {
                    console.log('getAccessToken response', response);
                    localStorage.setItem('access_token', response.access_token);
                    localStorage.setItem('expires_in', (new Date()).getTime() + (response.expires_in * 1000))
                    const router = this.$router
                    console.log('router', router);
                    this.$router.push('/');
                }).catch(error => {
                    this.$message({
                        message: error,
                        type: 'error'
                    })
                    console.log(error);
                })
            }
        }
    }
</script>