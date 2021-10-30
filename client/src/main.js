import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixins from './mixin'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'



createApp(App).use(router).mixin(mixins).use(store).use(VueSweetalert2).mount('#app')


window.Kakao.init('6ac2b649b280a169dd9ade7be75c4b21');