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
      {
        exact: true,
        path: '/kyc',
        component: '@/pages/Kyc',
        title: 'navbar.Profile',
        routes: [],
        wrappers: ['@/layouts/Wrapper'],
      },
      {
        exact: true,
        path: '/admin',
        component: '@/pages/Admin',
        title: 'navbar.Profile',
        routes: [],
        wrappers: ['@/layouts/Wrapper'],
      },
      {
        exact: true,
        path: '/bike-station',
        component: '@/pages/bikeStation',
        title: 'navbar.Profile',
        routes: [],
        wrappers: ['@/layouts/Wrapper'],
      },
      {
        exact: true,
        path: '/admin_account',
        component: '@/pages/AdminAccount',
        title: 'navbar.Profile',
      },
      {
        exact: true,
        path: '/vihicle',
        component: '@/pages/Vihicle',
        title: 'navbar.Profile',
      },
      {
        exact: true,
        path: '/lock',
        component: '@/pages/Locks',
        title: 'navbar.Profile',
      },
      {
        exact: true,
        path: '/travel',
        component: '@/pages/Travel',
        title: 'navbar.Profile',
      },
      {
        exact: true,
        path: '/user_wallet',
        component: '@/pages/UserWallet',
        title: 'navbar.Profile',
      },
      {
        exact: true,
        path: '/ticket',
        component: '@/pages/Ticket',
        title: 'navbar.Profile',
      },
      {
        exact: true,
        path: '/payment_method',
        component: '@/pages/PaymentMethod',
        title: 'navbar.Profile',
      },
      {
        exact: true,
        path: '/promotion',
        component: '@/pages/Promotion',
        title: 'navbar.Profile',
      },
      {
        exact: true,
        path: '/tutorial',
        component: '@/pages/Tutorial',
        title: 'navbar.Profile',
      },
      {
        exact: true,
        path: '/news',
        component: '@/pages/News',
        title: 'navbar.Profile',
      },
      {
        exact: true,
        path: '/rate',
        component: '@/pages/Rate',
        title: 'navbar.Profile',
      },
    ],
  },
];
