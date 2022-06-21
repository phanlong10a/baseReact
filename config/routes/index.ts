export default [
  {
    exact: true,
    path: '/login',
    component: '@/layouts/AuthLayout',
    title: 'Login',
    routes: [{ exact: true, path: '/login', component: '@/pages/Login' }],
  },
  {
    exact: true,
    path: '/register',
    component: '@/layouts/AuthLayout',
    title: 'Register',
    wrappers: ['@/layouts/auth'],
    routes: [{ exact: true, path: '/register', component: '@/pages/Register' }],
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
    ],
  },
];
