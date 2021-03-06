import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './stores';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSuitcaseRolling, faSearch, faShoppingBag, faArrowRight, faClock, faArrowLeft, faBars, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

export const globalEventBus = new Vue();

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_DATABASEURL,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APPID,
};
const eshop = firebase.initializeApp(firebaseConfig);
export const firebaseDatabase = eshop.database();
export const firebaseStorage = eshop.storage();
export const firebaseAuth = eshop.auth();

library.add(faSuitcaseRolling);
library.add(faSearch);
library.add(faShoppingBag);
library.add(faArrowRight);
library.add(faArrowLeft);
library.add(faChevronDown);
library.add(faBars);
library.add(faClock);
library.add(faPlus);

Vue.component('faIcon', FontAwesomeIcon);