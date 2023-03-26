import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Notifications from '@kyvg/vue3-notification'

import './assets/reset.css'
import './styles/global.scss'

const app = createApp(App)
  .use(router)
  .use(store)
  .use(Notifications)
  .mount('#app')
