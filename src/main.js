import Vue from 'vue'
import App from './App.vue'
import router from "./router/index";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);

const app =new Vue({
    render: h => h(App),
    router
})
app.$mount('#app')
