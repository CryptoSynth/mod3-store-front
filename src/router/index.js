import Vue from 'vue';
import VueRouter from 'vue-router';
import { auth } from '../services/firebase';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home')
  },
  {
    path: '/admin-login',
    name: 'admin-login',
    component: () => import('../views/AdminLogin'),
    beforeEnter: (to, from, next) => {
      if (auth.currentUser) {
        next('/admin-dashboard');
      } else {
        next();
      }
    }
  },
  {
    path: '/admin-dashboard',
    name: 'Admin-Dashboard',
    component: () => import('../views/AdminDashboard'),
    redirect: '/admin-dashboard/products', //better way of doing this???
    meta: { requiresAuth: true },
    children: [
      {
        path: 'products',
        component: () => import('../views/AdminProducts')
      },
      {
        path: 'profile',
        component: () => import('../views/AdminProfile')
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth) {
    if (!auth.currentUser) {
      next('/admin-login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
