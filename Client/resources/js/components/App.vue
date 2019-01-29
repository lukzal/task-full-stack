<template>
<div>
    <div>
    <nav class="navbar navbar-expand navbar-light bg-light">
            <div class="nav navbar-nav">
                <router-link to="/" class="nav-item nav-link">Users List</router-link>
                <router-link to="/adduser/" class="nav-item nav-link">Add User</router-link>
                <button v-on:click="importUser()" class="btn btn-sm btn-secondary">Import Random User</button>
            </div>
    </nav>
    </div>
    <div id="container">
        <router-view></router-view>
    </div>
</div>
</template>


<script>
import UserStore from '../UserStore';

export default {
    methods:{
        importUser(){
            UserStore.methods.importUser();
            setTimeout( () => this.$router.push({path: "/importuser/"}), 1000);
        }
    }
}
</script>
