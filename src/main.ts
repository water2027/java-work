import './style.css';//加入样式表,然后全局生效

import { createApp } from 'vue';//用来创建vue应用
import App from './App.vue';//当前路径下的App.vue
import router from './router';
import { createPinia } from 'pinia';//导入状态管理

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.mount('#app');
