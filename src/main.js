import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {  } from '@fortawesome/free-solid-svg-icons'
import { faCompass } from '@fortawesome/free-regular-svg-icons';

/* add icons to the library */
library.add(faCompass)

const app = createApp(App)

const options = {
    // You can set your default options here for Toastification
    transition: "Vue-Toastification__fade",
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
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
