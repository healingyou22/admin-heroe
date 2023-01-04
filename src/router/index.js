import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReportView from '../views/ReportView.vue'
import PricingView from '../views/PricingView.vue'
import PricingCreateView from '../components/Pricing/CreateView.vue'
import PricingEditView from '../components/Pricing/EditView.vue'
import GalleryView from '../views/GalleryView.vue'
import GalleryCreateView from '../components/Gallery/CreateView.vue'
import OrderView from '../views/OrderView.vue'
import OrderCreateView from '../components/Order/CreateView.vue'
import UserView from '../views/UserView.vue'
import UserCreateView from '../components/User/CreateView.vue'
import UserEditView from '../components/User/EditView.vue'
import LoginView from '../views/LoginView.vue'
import ErrorView from '../views/ErrorView.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            requiresAuth: true,
            role: true
        }
    }, {
        path: '/report',
        name: 'report.index',
        component: ReportView,
        meta: {
            requiresAuth: true,
            role: true
        }
    }, {
        path: '/pricing',
        name: 'pricing.index',
        component: PricingView,
        meta: {
            requiresAuth: true,
            role: true
        }
    }, {
        path: '/gallery',
        name: 'gallery.index',
        component: GalleryView,
        meta: {
            requiresAuth: true,
            role: true
        }
    }, {
        path: '/order',
        name: 'order.index',
        component: OrderView,
        meta: {
            requiresAuth: true,
            role: true
        }
    }, {
        path: '/user',
        name: 'user.index',
        component: UserView,
        meta: {
            requiresAuth: true,
            role: true
        }
    }, {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: {
            guest: true,
        }
    }, {
        path: '/404',
        name: '404',
        component: ErrorView,
    }, {
        path: '/user-create',
        name: 'user.create',
        component: UserCreateView,
        meta: {
            requiresAuth: true,
            role: true
        }
    }, {
        path: '/user-edit/:id',
        name: 'user.edit',
        component: UserEditView,
        meta: {
            requiresAuth: true,
            role: true
        }
    }, {
        path: '/pricing-create',
        name: 'pricing.create',
        component: PricingCreateView,
        meta: {
            requiresAuth: true,
        }
    }, {
        path: '/pricing-edit/:id',
        name: 'pricing.edit',
        component: PricingEditView,
        meta: {
            requiresAuth: true,
        }
    }, {
        path: '/gallery-create',
        name: 'gallery.create',
        component: GalleryCreateView,
        meta: {
            requiresAuth: true,
        }
    }, {
        path: '/order-create',
        name: 'order.create',
        component: OrderCreateView,
        meta: {
            requiresAuth: true,
        }
    }, ]
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token') == null;

    let user = JSON.parse(localStorage.getItem('data'))
        // window.localStorage.clear();

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (token) {
            next({
                name: 'login',
            })
        } else {
            if (to.matched.some(record => record.meta.role)) {
                if (user.data.role == 'administrator' || user.data.role == 'karyawan') {
                    next()
                } else {
                    next({ name: '404' })
                }
            }
            next()
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (!token) {
            next({ name: 'home' })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router