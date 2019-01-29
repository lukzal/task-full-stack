<template>
    <form v-on:submit.prevent="updateUser()" class="form-group">
        <div class="container">
            <div v-if="userById.error === null">
                <div v-for="user in userById.users">
            <div class="row marginbot-20">
                <h5>User details</h5>
                <input v-validate="'required'" v-model="userdetails.name" type="text" class="form-control" name="name" id="name" placeholder="Name" required>
                <div v-show="errors.has('name')" class="alert alert-danger">{{ errors.first('name') }}</div>
                <input v-validate="'required'" v-model="userdetails.username" type="text" class="form-control" name="username" id="username" placeholder="Username" required>
                <div v-show="errors.has('username')" class="alert alert-danger">{{ errors.first('username') }}</div>
                <input v-validate="'required|email'" v-model="userdetails.email" type="email" class="form-control" name="email" id="email" placeholder="E-mail" required>
                <div v-show="errors.has('email')" class="alert alert-danger">{{ errors.first('email') }}</div>
                <input v-validate="'required'" v-model="userdetails.phone" type="phone" class="form-control" name="phone" id="phone" placeholder="Phone" value="68375757" required>
                <div v-show="errors.has('phone')" class="alert alert-danger">{{ errors.first('phone') }}</div>
                <input v-validate="'required|url'" v-model="userdetails.website" class="form-control" name="website" id="website" placeholder="Website" required>
                <div v-show="errors.has('website')" class="alert alert-danger">{{ errors.first('website') }}</div>
            </div>
            <div class="row marginbot-20">
                    <h5>Address details</h5>
                <input v-validate="'required'" v-model="address.street" type="text" class="form-control" name="street" id="street" placeholder="Street" required>
                <div v-show="errors.has('street')" class="alert alert-danger">{{ errors.first('street') }}</div>
                <input v-validate="'required'" v-model="address.suite" type="text" class="form-control" name="suite" id="suite" placeholder="Suite" required>
                <div v-show="errors.has('suite')" class="alert alert-danger">{{ errors.first('suite') }}</div>
                <input v-validate="'required'" v-model="address.city" type="text" class="form-control" name="city" id="city" placeholder="City" required>
                <div v-show="errors.has('city')" class="alert alert-danger">{{ errors.first('city') }}</div>
                <input v-validate="'required'" v-model="address.zipcode" type="text" class="form-control" name="zipcode" id="zipcode" placeholder="Zipcode" required>
                <div v-show="errors.has('zipcode')" class="alert alert-danger">{{ errors.first('zipcode') }}</div>
                <input v-validate="'required|decimal'" v-model="address.lat" type="text" class="form-control" name="lat" id="lat" placeholder="Lat" required>
                <div v-show="errors.has('lat')" class="alert alert-danger">{{ errors.first('lat') }}</div>
                <input v-validate="'required|decimal'" v-model="address.lng" type="text" class="form-control" name="lng" id="lng" placeholder="Lng" required>
                <div v-show="errors.has('lng')" class="alert alert-danger">{{ errors.first('lng') }}</div>
            </div>
            <div class="row marginbot-20">
                    <h5>Company details</h5>
                <input v-validate="'required'" v-model="company.name" type="text" class="form-control" name="name" id="comp_name" placeholder="Name" required>
                <div v-show="errors.has('name')" class="alert alert-danger">{{ errors.first('name') }}</div>
                <input v-validate="'required'" v-model="company.catchPhrase" type="text" class="form-control" name="catchPhrase" id="catchPhrase" placeholder="Catch Phrase" required>
                <div v-show="errors.has('catchPhrase')" class="alert alert-danger">{{ errors.first('catchPhrase') }}</div>
                <input v-validate="'required'" v-model="company.bs" type="text" class="form-control" name="bs" id="bs" placeholder="Bs" required>
                <div v-show="errors.has('bs')" class="alert alert-danger">{{ errors.first('bs') }}</div>
            </div>
            <div class="row">
                <button class="btn btn-primary" type="submit">Update</button>
            </div>
        </div>
        </div>
        <div v-else class="user">{{userById.error}}</div>
        </div>
    </form>
</template>

<script>
import UserStore from "../UserStore";

export default {
    data(){
        return {
            updated: false,
            userById: [],
            userdetails: {
                name: "",
                username: "",
                email: "",
                phone: "",
                website: "",
                address_id: "0",
                company_id: "0",
            },
            address: {
                street: "",
                suite: "",
                city: "",
                zipcode: "",
                lat: "",
                lng: "",
            },
            company: {
                name: "",
                catchPhrase: "",
                bs: "",
            }
        };
    },
        props: {
            id: {
                validator: function (value){
                    return UserStore.methods.getUserByID(value) != -1;
                }
            }
        },
        created(){
            UserStore.methods.getUserByID(this.id);
            this.userById = UserStore.data;
        },
        beforeUpdate(){
            if(this.updated === false){
                this.userdetails.name = UserStore.data.users[0].name;
                this.userdetails.username = UserStore.data.users[0].username;
                this.userdetails.email = UserStore.data.users[0].email;
                this.userdetails.phone = UserStore.data.users[0].phone;
                this.userdetails.website = UserStore.data.users[0].website;

                this.address.street = UserStore.data.users[0].address.street;
                this.address.suite = UserStore.data.users[0].address.suite;
                this.address.city = UserStore.data.users[0].address.city;
                this.address.zipcode = UserStore.data.users[0].address.zipcode;
                this.address.lat = UserStore.data.users[0].address.lat;
                this.address.lng = UserStore.data.users[0].address.lng;

                this.company.name = UserStore.data.users[0].company.name;
                this.company.catchPhrase = UserStore.data.users[0].company.catchPhrase;
                this.company.bs = UserStore.data.users[0].company.bs;
                this.updated = true;
            }
        },
    destroyed(){
            this.userById.error = null;
    },
    methods:{
        updateUser(){
            this.$validator.validateAll().then(() => {
                UserStore.methods.updateUser(this.userdetails, this.address, this.company, this.id);
            });
        }
    }
}
</script>
