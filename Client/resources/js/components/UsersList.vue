<template>
    <div class="container">
        <div v-for="user, i in users.users" class="user">
            <h2>{{user.username}}</h2>
            <div class="row information">
                <div class="col-4"><b>Name</b>: {{user.name}}</div>
                <div class="col-4"><b>Email</b>: {{user.email}}</div>
                <div class="col-4"><b>Company</b>: {{user.company.name}}</div>
            </div>
            <div class="actions">
                <button v-on:click="viewUser(user.id, i)" class="btn btn-primary">View</button>
                <button v-on:click="editUser(user.id)" class="btn btn-primary">Edit</button>
                <button v-on:click="deleteUser(user.id, i)" class="btn btn-danger">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
import UserStore from "../UserStore";

export default {
    data(){
        return {
            users: ""
        };
    },
    mounted(){
        UserStore.methods.getUsers();
        //console.log(UserStore.data);
        this.users = UserStore.data;
        //console.log(this.users);
    },
    methods: {
        viewUser(id, arrayItem){
           this.users.users.splice(0, this.users.users.length);
            this.$router.push({ path: '/viewuser/' + id });
        },
        editUser(id){
            this.$router.push({ path: '/edituser/' + id });
        },
        deleteUser(id, arrayItem){
            UserStore.methods.deleteUser(id);
            this.users.users.splice(arrayItem, 1);
        }
    }
}
</script>


