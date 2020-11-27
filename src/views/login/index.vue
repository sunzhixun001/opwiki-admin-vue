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
    } from '@/api/user'
    export default {
        methods: {
            submit: function() {
                try {
                    getAccessToken().then(response => {
                        console.log('getAccessToken response', response);
                        localStorage.setItem('access_token', (response && response.access_token) || '');
                        localStorage.setItem('expires_in', response && ((new Date()).getTime() + ((response.expires_in || 0) * 1000)) || '')
                        const router = this.$router
                        console.log('router', router);
                        this.$router.replace('/').then(() => {
                          console.log('push on complete');  
                        }).catch(err => { console.log(err) });
                    }).catch(error => {
                        this.$message({
                            message: error,
                            type: 'error'
                        })
                        console.log(error);
                    })
                } catch ( submitError) {
                    console.log('submitError', submitError)
                }
            }
        }
    }
</script>