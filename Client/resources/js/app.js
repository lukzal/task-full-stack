
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from "vue";
import VueRouter from "vue-router";
import VeeValidate from "vee-validate";

Vue.use(VueRouter);
Vue.use(VeeValidate);


import App from "./components/App";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import UsersList from "./components/UsersList";
import ImportUser from "./components/ImportUser";
import ViewUser from "./components/ViewUser";

const routes = [
    {
        path: '/adduser',
        name: 'adduser',
        component: AddUser
    },
    {
        path: '/edituser/:id',
        name: 'edituser',
        component: EditUser,
        props: true
    },
    {
        path: '/',
        name: 'userslist',
        component: UsersList
    },
    {
        path: '/importuser',
        name: 'importuser',
        component: ImportUser
    },
    {
        path: '/viewuser/:id',
        name: 'viewuser',
        component: ViewUser,
        props: true
    }
];

const router = new VueRouter({ routes });

const app = new Vue({
    el: "#app",
    template: "<app/>",
    components: {
        App,
    },
    router
});
/** 
window.Vue = require('vue');


 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('home', require('./components/Home.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 

const app = new Vue({
    el: '#app'
});


*/