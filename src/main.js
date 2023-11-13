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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaxz528yP4scrj3psKTFyE3c0DupMnjIA",
  authDomain: "compass-bef8b.firebaseapp.com",
  projectId: "compass-bef8b",
  storageBucket: "compass-bef8b.appspot.com",
  messagingSenderId: "1057761439906",
  appId: "1:1057761439906:web:5cc6c5dec3bb6e2f71a7fb"
};

// Initialize Firebase
initializeApp(firebaseConfig);


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
