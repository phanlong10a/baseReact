export default [
  {
    exact: true,
    path: '/login',
    component: '@/layouts/AuthLayout',
    title: 'Login',
    wrappers: ['@/layouts/Wrapper'],
    routes: [{ exact: true, path: '/login', component: '@/pages/Login' }],
  },
  {
    exact: false,
    path: '/',
    component: '@/layouts/MainLayout',
    wrappers: ['@/layouts/Wrapper'],
    routes: [
      {
        exact: true,
        path: '/profile',
        component: '@/pages/Profile',
        title: 'navbar.Profile',
        routes: [],
        wrappers: ['@/layouts/Wrapper'],
      },
      {
        exact: true,
        path: '/user',
        component: '@/pages/User',
        title: 'navbar.Profile',
        routes: [],
        wrappers: ['@/layouts/Wrapper'],
      },
    ],
  },
];
