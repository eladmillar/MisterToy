import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import  store  from './store'
import ElementPlus from 'element-plus'

// import './assets/old-css/main.css'
import './assets/styles.scss'

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
app.use(ElementPlus)