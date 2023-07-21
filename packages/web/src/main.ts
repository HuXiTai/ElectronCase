import { createApp } from 'vue'
import './style/style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

// 类型声明文件，增强Window接口
import "./utils/renderer.d";

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
