import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Judge = () => import('@/components/content/chaxun/Judge')
const City = () => import('@/components/content/city/MainCity')
const Index = () => import('@/components/content/Index')
const Main = () => import('@/components/content/city/MainCity2')
const Mag = () => import('@/components/content/manager/Mag')
const Manager = () => import('@/components/content/Main')

const routes = [
    {
        path: '/',
        name: 'UserHome',
        component: () => import('../views/Home/UserHome'),
        redirect: to => {
            return '/home'
        },
        children: [
            {
                path: '/query',
                name: 'UserQuery',
                component: () => import('../views/User/UserQuery'),
            },
            {
                path: '/home',
                name: 'UserMax',
                component: () => import('../views/User/UserMax')
            },
            {
                path: '/feedback',
                name: 'UserBack',
                component: () => import('../views/User/UserBack')
            }
        ]
    },

    {
        path: '/mag',
        name: 'Home',
        component: () => import('../views/Home/ManagerHome'),
        // meta: {  // 加一个自定义obj
        //     requireAuth: true   // 参数 true 代表需要登陆才能进入 A
        // },
        // children: [
        //     {
        //         path: '/test',
        //         name: 'Test',
        //         component: () => import('../views/Test/Test'),
        //         meta: {  // 加一个自定义obj
        //             requireAuth: true   // 参数 true 代表需要登陆才能进入 A
        //         },
        //     },
        // ]
    },
    {
        path: '/login',
        name: 'Login',
        meta: {  // 加一个自定义obj
            requireAuth: true   // 参数 true 代表需要登陆才能进入 A
        },
        component: () => import('../views/Login/Login')
    },
    {
        path: '/center',
        name: 'Center',
        meta: {  // 加一个自定义obj
            requireAuth: true   // 参数 true 代表需要登陆才能进入 A
        },
        component: () => import('../views/Center/Center')
    },

    {
        path: '/test',
        name: 'Test',
        component: () => import('../views/Test')
    },
    {
        path: '/manager',
        name: 'Manager',
        component: Manager,
        children: [
            {
                path: '/index',
                component: Index,
            },
            {
                path: '/jug',
                component: Judge,
            },
            {
                path: '/city/:cityname',
                component: City,
            },
            {
                path: '/main',
                component: Main,
            },
            {
                path: '/magg',
                component: Mag,
            },
        ]
    },

]


export const router = new VueRouter({
    mode: 'history',
    routes,
})

export default router