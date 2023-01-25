import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { usePermissStore } from '../store/permiss';
import Home from '../views/home.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: '系统首页',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard.vue'),
            },
            {
                path: '/user',
                name: 'user',
                meta: {
                    title: '用户列表',
                    permiss: '2',
                },
                component: () => import(/* webpackChunkName: "table" */ '../views/user.vue'),
            },
            {
                path: '/category',
                name: 'category',
                meta: {
                    title: '分类列表',
                    permiss: '2',
                },
                component: () => import(/* webpackChunkName: "charts" */ '../views/category.vue'),
            },
            {
                path: '/product',
                name: 'product',
                meta: {
                    title: '商品列表',
                    permiss: '2',
                },
                component: () => import(/* webpackChunkName: "form" */ '../views/product.vue'),
            },
            {
                path: '/order',
                name: 'order',
                meta: {
                    title: '订单列表',
                    permiss: '2',
                },
                component: () => import(/* webpackChunkName: "tabs" */ '../views/order.vue'),
            },
            {
                path:'/profile',
                name:'profile',
                meta:{
                    title:'个人资料',
                    permiss:'2',
                },
                component:()=>import('../views/profile.vue')
            }
        ],
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => { 
    document.title = `${to.meta.title} | b2c-store-back-web`;
    const role = sessionStorage.getItem('ms_username');
    const permiss = usePermissStore();
    if (!role && to.path !== '/login') {
        next('/login');
    }
    // else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
    //     // 如果没有权限，则进入403
    //     next('/403');
// } 
    else {
        next();
    }
});

export default router;
