import Vue from 'vue'
import App from './App.vue'
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
import {Button, MessageBox} from 'element-ui'
// 引入饿了么ui实现走马灯效果
// import { Carousel, CarouselItem } from 'element-ui';
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagination.name,Pagination)
Vue.component(Button.name,Button)
// Vue.component(Carousel.name, Carousel)
// Vue.component(CarouselItem.name, CarouselItem);
Vue.config.productionTip = false
// ElementUI注册组件时的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from '@/router' 
// 引入仓库
import store from '@/store'
// 引入swiper样式
import "swiper/css/swiper.css"
// 引入MockServer.js 
import '@/mock/mockServer'
// 统一接口api文件夹里面全部请求函数。不用vuex的另一种方式
import * as API from '@/api'
new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate() {
    // this是大写的vm
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }, 
  // 注册路由：底下的写法KV一致省略V【router小写的】
  router,
  // 注册仓库:组件实例的身上会多一个属性$store属性
  store
}).$mount('#app')
