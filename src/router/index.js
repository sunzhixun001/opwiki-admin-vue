import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout'
import Home from '../views/home'
import Login from '../views/login'
import Timeline from '../views/timeline/time-line'
import Character from '../views/character'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/home',
        component: Layout,
        children: [
            {
                path: 'home',
                component: Home
            },
            {
                path: 'timeline',
                component: Timeline
            },
            {
                path: 'character',
                component: Character
            }
        ]
    }, {
        path: '/login',
        component: Login
    }
];

export default new VueRouter({routes});