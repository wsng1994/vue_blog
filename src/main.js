// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'jquery'
import hljs from "highlight.js";
import "highlight.js/styles/atelier-cave-dark.css";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor';
Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'

})
router.beforeEach((to, from, next) => {
       // 让页面回到顶部
        // chrome
        document.body.scrollTop = 0;
        // firefox
        document.documentElement.scrollTop = 0;
        // safari
        window.pageYOffset = 0;
       // 调用 next()，一定要调用 next 方法，否则钩子就不会被销毁
      next()
   })
