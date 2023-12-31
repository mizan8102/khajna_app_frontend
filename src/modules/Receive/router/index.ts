export default [
    {
        path: '/receive/create',
        name: 'receive.create',
        component: () => import('../views/LocalReceive.vue'),
    },
    {
        path: '/receive/home',
        name: 'receive.home',
        component: () => import('../views/HomePage.vue'),
    },
    {
        path: '/receive/import-home',
        name: 'receive.import-home',
        component: () => import('../views/ImportHomePage.vue'),
    },
];
