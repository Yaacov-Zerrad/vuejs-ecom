import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import store from '@/store'

import Product from '../views/Product.vue'
import Category from '../views/Category.vue'
import Search from '../views/Search.vue'
import Cart from '../views/Cart.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import MyAccount from '../views/MyAccount.vue'
import Checkout from '../views/Checkout.vue'
import CheckoutPaypal from '../views/CheckoutPaypal.vue'
import Success from '../views/Success.vue'
import NewProduct from '../views/NewProduct.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/:category_slug/:product_slug',
    name: 'Product',
    component: Product,
    meta:{
      title:''
    }
  },
  {
    path:'/:category_slug',
    name: 'Category',
    component: Category,
    meta:{
      title:''
    }
  },
  {
    path:'/cart',
    name: 'Cart',
    component: Cart,
    meta:{
      title:'cart'
    }
  },
  {
    path:'/sign-up',
    name: 'SignUp',
    component: SignUp,
    meta:{
      title:'Sign In'
    }
  },
  {
    path:'/log-in',
    name: 'LogIn',
    component: LogIn,
    meta:{
      title:'Log In'
    }
  },
  {
    path:'/my-account',
    name: 'MyAccount',
    component: MyAccount,
    props:true,
    meta:{
      requireLogin: true,
      title: 'My account'
    }
  },
  {
    path:'/cart/success',
    name: 'Success',
    component: Success,
    meta:{
      requireLogin: true,
      title: 'success',
    }
  },
  {
    path:'/cart/checkout',
    name: 'Checkout',
    component: Checkout,
    meta:{
      requireLogin: true,
      title: 'Checkout',
    }
  },
  {
    path:'/new-product',
    name: 'NewProduct',
    component: NewProduct,
    meta:{
      requireLogin: true,
      title: 'New product',
    }
  },
  {
    path:'/cart/paypal',
    name: 'CheckoutPaypal',
    component: CheckoutPaypal,
    props:true,
    meta:{
      requireLogin: true,
      title: 'Checkout Paypal',
    }
  },
  {
    path:'/search',
    name: 'Search',
    component: Search,
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  // verifi si login
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated){
    next({name:'LogIn', query:{ to: to.path } })
  } else {
    next()
  }
})
router.afterEach((to) =>{
  // name of title
  if (to.meta.title !== ''){
  document.title = to.meta.title + ' | ETalit'
}
})

export default router
