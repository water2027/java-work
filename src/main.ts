import './style.css';//加入样式表,然后全局生效

import { createApp } from 'vue';//用来创建vue应用
import App from './App.vue';//当前路径下的App.vue
import router from './router';

const app = createApp(App);

app.use(router);

app.mount('#app');
