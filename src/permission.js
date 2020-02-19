import store from './store'
import router from './router'

router.beforeEach((to, from, next) => {
    // console.log('store', store);
    // console.log('to', to);
    // console.log('from', from);
    // console.log('next', next);
    if (!store.state.user.token && to.path !== '/login') {
        next('/login');
    } else {
        next();
    }
})
