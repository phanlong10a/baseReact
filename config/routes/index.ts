export const authRoutes = [
  {
    exact: true,
    path: '/',
    component: '@/pages/Users/index',
    title: 'navigation_user',
    routes: [],
    wrappers: ['@/layouts/Wrapper'],
  },
  {
    exact: true,
    path: '/profile',
    component: '@/pages/Profile/index',
    title: 'navigation_profile',
    routes: [],
    wrappers: ['@/layouts/Wrapper'],
  },
  {
    exact: true,
    path: '/user',
    component: '@/pages/Users/index',
    title: 'navigation_user',
    routes: [],
    wrappers: ['@/layouts/Wrapper'],
  },
  {
    exact: true,
    path: '/kyc',
    component: '@/pages/ManageUser/index',
    title: 'navigation_user_kyc',
    routes: [],
    wrappers: ['@/layouts/Wrapper'],
  },
  {
    exact: true,
    path: '/admin',
    component: '@/pages/Admin/index',
    title: 'navigation_admin_manage',
    routes: [],
    wrappers: ['@/layouts/Wrapper'],
  },
  {
    exact: true,
    path: '/bike-station',
    component: '@/pages/bikeStation/index',
    title: 'navigation_bike_station',
    wrappers: ['@/layouts/Wrapper'],
  },
  {
    exact: true,
    path: '/admin_account',
    component: '@/pages/AdminAccount/index',
    title: 'navigation_admin_manage',
  },
  {
    exact: true,
    path: '/vehicles',
    component: '@/pages/Vehicle/index',
    title: 'navigation_vihicle',
  },
  {
    exact: true,
    path: '/lock',
    component: '@/pages/Locks/index',
    title: 'navigation_lock',
  },
  {
    exact: true,
    path: '/travel',
    component: '@/pages/Travel/index',
    title: 'navigation_travel',
  },
  {
    exact: true,
    path: '/user_wallet',
    component: '@/pages/UserWallet/index',
    title: 'navigation_user_wallet',
  },
  {
    exact: true,
    path: '/ticket',
    component: '@/pages/Ticket/index',
    title: 'navigation_ticket',
  },
  {
    exact: true,
    path: '/payment_method',
    component: '@/pages/PaymentMethod/index',
    title: 'navigation_method',
  },
  {
    exact: true,
    path: '/promotion',
    component: '@/pages/Promotion/index',
    title: 'navigation_promotion',
  },
  {
    exact: true,
    path: '/tutorial',
    component: '@/pages/Tutorial/index',
    title: 'navigation_tutorial',
  },
  {
    exact: true,
    path: '/news',
    component: '@/pages/News/index',
    title: 'navigation_news',
  },
  {
    exact: true,
    path: '/rate',
    component: '@/pages/Rate/index',
    title: 'navigation_rate',
  },
  {
    exact: true,
    path: '/notifications',
    component: '@/pages/Notification/index',
    title: 'navigation_notification',
  },
  {
    exact: true,
    path: '/notification-template',
    component: '@/pages/NotificationTemplate/index',
    title: 'navigation_notification_template',
  },
];

export default [
  {
    exact: true,
    path: '/login',
    component: '@/layouts/AuthLayout/index',
    title: 'Login',
    wrappers: ['@/layouts/Wrapper'],
    routes: [
      { exact: true, path: '/login', component: '@/pages/SignIn/index' },
    ],
  },
  {
    exact: false,
    path: '/',
    component: '@/layouts/MainLayout',
    wrappers: ['@/layouts/Wrapper'],
    routes: authRoutes,
  },
];
