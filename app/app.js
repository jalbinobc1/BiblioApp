import Vue from 'nativescript-vue';
import RadListView from 'nativescript-ui-listview/vue'
import firebase from "nativescript-plugin-firebase";
import Login from "./components/Login"
import BackendService from './services/BackendService' 
import AuthService from './services/AuthService' 

// Uncommment the following to see NativeScript-Vue output logs
//Vue.config.silent = false;


import { TNSFontIcon, fonticon } from './nativescript-fonticon';
TNSFontIcon.debug = false;
TNSFontIcon.paths = {
    'fa': './fonts/font-awesome.css',
    'ion': './fonts/ionicons.css',
};
TNSFontIcon.loadCss();
Vue.filter('fonticon', fonticon);

//shared among components
export const backendService = new BackendService()
export const authService = new AuthService()
import store from './store';



Vue.use(RadListView)
Vue.prototype.$authService = authService
Vue.prototype.$backendService = backendService
Vue.prototype.$store = store;

firebase
  .init({
    showNotifications: true,
    showNotificationsWhenInForeground: true,
    onPushTokenReceivedCallback: function(token) {
      console.log("Firebase push token: " + token);
    },
    onMessageReceivedCallback: function(message) {
      //console.log("Title: " + message.title);
      //console.log("Body: " + message.body);
      // if your server passed a custom property called 'foo', then do this:
      //console.log("Value of 'foo': " + message.data.foo);
      
    },
    onAuthStateChanged: data => { 
    console.log((data.loggedIn ? "Logged in to firebase" : "Logged out from firebase") + " (firebase.init() onAuthStateChanged callback)");
    if (data.loggedIn) {
      backendService.token = data.user.uid
      console.log("uID: " + data.user.uid)
      store.commit('setIsLoggedIn', true)
    }
    else {      
      store.commit('setIsLoggedIn', false)
    }
  }

  })
  .then(
    function(instance) {
      console.log("firebase.init done");
    },
    function(error) {
      console.log("firebase.init error: " + error);
    }
  );

new Vue({

    render: h => h('frame', [h(Login)])

}).$start();