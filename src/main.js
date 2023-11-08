import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const app = createApp(App)

const options = {
    // You can set your default options here for Toastification
    position: "top-right",
    timeout: 5000,
    closeOnClick: false,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: false,
    showCloseButtonOnHover: true,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false
};

app.use(Toast, options);
app.use(router)

app.mount('#app')
