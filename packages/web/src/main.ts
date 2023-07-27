import { createApp } from 'vue'
import './style/style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import "./utils/renderer.d";

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.mount('#app')
