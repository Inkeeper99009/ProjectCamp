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
import { faDoorOpen, faGear, faXmark, faPeopleRoof, faCalendarDays, faCaravan, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons'
import { faCompass, faUser, faTrashCan, } from '@fortawesome/free-regular-svg-icons';

/* add icons to the library */
library.add(faCompass, faDoorOpen, faUser, faTrashCan, faGear, faXmark, faPeopleRoof, faCalendarDays, faCaravan, faHandHoldingDollar)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARVefseCj0RcJRtWh6DveDFa0G8N20v5s",
  authDomain: "compass-5f6fc.firebaseapp.com",
  databaseURL: "https://compass-5f6fc-default-rtdb.firebaseio.com",
  projectId: "compass-5f6fc",
  storageBucket: "compass-5f6fc.appspot.com",
  messagingSenderId: "91812735735",
  appId: "1:91812735735:web:8804014d090899300001f2"
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
