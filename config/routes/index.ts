export const authRoutes = [
  { path: '/', component: '@/pages/index', title: 'index.title', exact: true },
  {
    path: '/bike-station',
    component: '@/pages/bikeStation/index',
    title: 'Quản lý trạm xe',
    exact: true,
  },
  {
    path: '/user',
    component: '@/pages/user/index',
    title: 'Quản lý người dùng',
    exact: true,
  },
];

export default [
  {
    path: '/login',
    component: '@/pages/login/index',
    title: 'Đăng nhập',
    exact: true,
  },
  { path: '/404', component: '@/pages/404' },
  {
    exact: false,
    path: '/',
    component: '@/layouts/index',
    routes: [
      ...authRoutes.map((item, index) => {
        return {
          ...item,
          wrappers: ['@/wrappers/auth'],
        };
      }),
    ],
  },
];
