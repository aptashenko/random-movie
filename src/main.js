import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { plugin, defaultConfig } from '@formkit/vue'

import 'windi.css'

const app = createApp(App)


app.use(plugin, defaultConfig).use(router).mount('#app')
