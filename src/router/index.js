// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter);
// 引入路由组件
import Detail from '@/pages/Detail'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
// 引入store
import store from '@/store'
// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
// 第二个参数： 成功回调
// 第三个参数： 失败的回调
VueRouter.prototype.push = function (location, resolve,reject) {
    // 函数的上下文为VueRouter类的一个实例
    if(resolve && reject) {
        // call || apply 区别
        // 相同点： 都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点： call与apply传递参数： call传递参数用逗号隔开， apply方法执行， 传递数组
        originPush.call(this,locationn,resolve,reject);
    } else {
        originPush.call(this,location,()=>{},()=>{});
    }
}
VueRouter.prototype.replace = function(location,resolve,reject) {
    if (resolve && reject) {
        originReplace.call(this,location,resolve,reject);
    } else {
        originReplace.call(this,location,()=>{},()=>{});
    }
}
// 配置路由
let router = new VueRouter({
    // 配置路由组件
    routes:[
        {
            path:'/addcartsuccess',
            name:'addcartsuccess',
            component:AddCartSuccess,
            meta:{Show: true}
        },
        {
            path:'/detail/:skuid',
            component:Detail,
            meta:{show:true}
        },
        {
            path:'/home',
            component:Home,
            meta:{show:true}
        },
        {
            path:'/search/:keyword?',
            // path: '/search',
            component:Search,
            meta:{show:true},
            name:'search',
            // 路由组件能不能传递props数据？
            // 布尔值写法
            // props:true
            // 对象写法
            // props:{a:1,b:2},
            // 函数写法：可以params参数、query参数，通过props传递给路由组件
            props:($route) => {
                return {keyword:$route.params.keyword,k:$route.query.k}
            }
        },
        {
            path:'/login',
            component:Login,
            meta:{show:false}
        },
        {
            path:'/register',
            component:Register,
            meta:{show:false}
        },
        // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
        {
            path:'*',
            redirect:"/home",
            meta:{show:true}
        },
        {
            path:'/shopcart',
            component:ShopCart,
            meta:{show:true}
        },
        {
            path:'/trade',
            component:Trade,
            meta:{show:true}
        },
        {
            path:'/pay',
            component:Trade,
            meta:{show:true}
        }
    ],
    // 滚动行为
    scrollBehavior (to ,fro, savedPosition) {
        return {y:0}
    }
})

router.beforeEach(async (to, from, next) => {
    // to, from 可以是 name, path 
    // to: 可以获取到要跳转哪个路由的信息
    // from: 获取从哪个路由来的信息
    // next: 放行
    // 用户信息
    let name = store.state.user.userInfo.name
    // 用户登录了，才会有token
    let token = store.state.user.token
    // 用户已经登陆
    if (token) {
        if (to.path == '/login') {
            next('/home')
        } else {
            if (name) { 
                next()
            } else {
                // 没有用户信息，派发action让仓库存储用户信息再跳转
                try {
                    // 获取用户信息成功
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效获取不到用户信息，重新登录
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        next()
    }
}) 

export default router 