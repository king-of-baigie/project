// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

// axios.defaults.baseURL='http://139.129.94.50:3389';
axios.defaults.headers.post['Content-Type'] = 'application/json';
const baseUrl='http://172.17.2.241:8080';//设置自己服务器ip地址+端口号
axios.defaults.baseURL=baseUrl;//为axios对象的默认属性baseURL设置值

axios.interceptors.request.use(function(config) {
  let token = sessionStorage.getItem("token");
  console.log(config);
  if (token) {
    config.headers["token"] = token;
  }
  // loadinginstace = Loading.service({ fullscreen: true });
  return config;
}, function(error) {
  // loadinginstace.close();
  // Message.error('加载超时');
  return Promise.reject(error);
});


// 解决表格操作选项的跳转报错
import Router from 'vue-router'
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
};
import echarts from 'echarts'
import XLSX from 'xlsx'


Vue.prototype.$echarts = echarts;
Vue.prototype.$axios=axios;   //设置axios
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$XLSX = XLSX;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render:h=>h(App),
  router,
  components: { App },
  template: '<App/>',
});
