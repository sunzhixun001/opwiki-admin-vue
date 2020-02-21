import router from './router'
import {
    getToken
} from './utils/auth'

router.beforeEach((to, from, next) => {
    // console.log('store', store);
    // console.log('to', to);
    // console.log('from', from);
    // console.log('next', next);
    if (!getToken() && to.path !== '/login') {
        next('/login');
        // next();
    } else {
        next();
    }
})
