import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixins from './mixin'
import store from './store'
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'



createApp(App).use(router).mixin(mixins).use(store).mount('#app')


window.Kakao.init('6ac2b649b280a169dd9ade7be75c4b21');