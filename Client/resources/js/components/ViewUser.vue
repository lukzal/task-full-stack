<template>
        <div class="container">
            <div v-if="userById.error === null">
                    <div v-for="user in userById.users" class="user">
                            <h2>{{user.username}}</h2>
                            <div class="row">
                                <div class="col-sm information">
                                    <ul class="list-group">
                                        <li class="list-group-item "><h5>User Details</h5></li>
                                        <li class="list-group-item "><b>Name</b>: {{user.name}}</li>
                                        <li class="list-group-item"><b>Email</b>: {{user.email}}</li>
                                        <li class="list-group-item "><b>Phone</b>: {{user.phone}}</li>
                                        <li class="list-group-item "><b>Website</b>: {{user.website}}</li>
                                    </ul>
                                </div>
                                <div class="col-sm">
                                    <ul class="list-group information">
                                        <li class="list-group-item "><h5>User Address Details</h5></li>
                                        <li class="list-group-item "><b>Street</b>: {{user.address.street}}</li>
                                        <li class="list-group-item"><b>Suite</b>: {{user.address.suite}}</li>
                                        <li class="list-group-item "><b>City</b>: {{user.address.city}}</li>
                                        <li class="list-group-item "><b>Zip Code</b>: {{user.address.zipcode}}</li>
                                        <li class="list-group-item "><b>Lat</b>: {{user.address.lat}}</li>
                                        <li class="list-group-item "><b>Lng</b>: {{user.address.lng}}</li>
                                    </ul>
                                </div>
                                <div class="col-sm">
                                    <ul class="list-group information">
                                        <li class="list-group-item "><h5>User Company Details</h5></li>
                                        <li class="list-group-item "><b>Name</b>: {{user.company.name}}</li>
                                        <li class="list-group-item"><b>Catch Phrase</b>: {{user.company.catchPhrase}}</li>
                                        <li class="list-group-item "><b>Bs</b>: {{user.company.bs}}</li>
                                    </ul>
                                </div>
                            </div>

                            <button v-on:click="goBack()" class="btn btn-primary">Go Back</button>
                    </div>
            </div>
            <div v-else class="user">{{userById.error}}</div>
        </div>
    </template>
    
    <script>
    import UserStore from "../UserStore";
    
    export default {
        data(){
            return {
                userById: []
            };
        },
        mounted(){
            //this.userById.users.splice(0, this.users.users.length);
            UserStore.methods.getUserByID(this.id);
            this.userById = UserStore.data;
        },
        destroyed(){
            this.userById.error = null;
        },
        props: {
            id: {
                validator: function (value){
                    return UserStore.methods.getUserByID(value) != -1;
                }
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1);
            }
        },
    }
    </script>
    
    
    