import Vue from 'vue'
import VueRouter from 'vue-router';

import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Search from '@/views/Search'
import Play from '@/views/Play'

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', redirect: "/layout" },
        {
            path: '/layout',
            component: Layout,
            redirect: '/layout/home',
            children: [{
                    path: 'home',
                    component: Home,
                    meta: {
                        title: '首页'
                    }
                },
                {
                    path: 'search',
                    component: Search,
                    meta: {
                        title: "搜索"
                    }
                },
            ]
        },
        { path: '/play', component: Play },
    ]
});