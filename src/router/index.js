import Layout from '../views/layout'
import Home from '../views/home'

const routers = [{
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
        {
            path: 'home',
            component: Home
        }
    ]
}];

export default routers