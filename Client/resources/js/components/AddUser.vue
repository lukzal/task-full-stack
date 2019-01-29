<template>
    <form v-on:submit.prevent="addUser()" class="form-group">
        <div class="container">
            <div class="row marginbot-20">
                <h5>User details</h5>
                <input v-validate="'required'" v-model="userdetails.name" type="text" class="form-control" name="name" id="name" placeholder="Name" value="Lukas Zaleckas" required>
                <div v-show="errors.has('name')" class="alert alert-danger">{{ errors.first('name') }}</div>
                <input v-validate="'required'" v-model="userdetails.username" type="text" class="form-control" name="username" id="username" placeholder="Username" value="admin" required>
                <div v-show="errors.has('username')" class="alert alert-danger">{{ errors.first('username') }}</div>
                <input v-validate="'required|email'" v-model="userdetails.email" type="email" class="form-control" name="email" id="email" placeholder="E-mail" value="luk.zaleckas@gmail.com" required>
                <div v-show="errors.has('email')" class="alert alert-danger">{{ errors.first('email') }}</div>
                <input v-validate="'required'" v-model="userdetails.phone" type="phone" class="form-control" name="phone" id="phone" placeholder="Phone" value="68375757" required>
                <div v-show="errors.has('phone')" class="alert alert-danger">{{ errors.first('phone') }}</div>
                <input v-validate="'required|url'" v-model="userdetails.website" type="url" class="form-control" name="website" id="website" placeholder="Website" value="http://www.asadsa.lt" required>
                <div v-show="errors.has('website')" class="alert alert-danger">{{ errors.first('website') }}</div>
            </div>
            <div class="row marginbot-20">
                    <h5>Address details</h5>
                <input v-validate="'required'" v-model="address.street" type="text" class="form-control" name="street" id="street" placeholder="Street" value="Pietario g. 6-3" required>
                <div v-show="errors.has('street')" class="alert alert-danger">{{ errors.first('street') }}</div>
                <input v-validate="'required'" v-model="address.suite" type="text" class="form-control" name="suite" id="suite" placeholder="Suite" value="rth" required>
                <div v-show="errors.has('suite')" class="alert alert-danger">{{ errors.first('suite') }}</div>
                <input v-validate="'required'" v-model="address.city" type="text" class="form-control" name="city" id="city" placeholder="City" value="Kaunas" required>
                <div v-show="errors.has('city')" class="alert alert-danger">{{ errors.first('city') }}</div>
                <input v-validate="'required'" v-model="address.zipcode" type="text" class="form-control" name="zipcode" id="zipcode" placeholder="Zipcode" value="45151" required>
                <div v-show="errors.has('zipcode')" class="alert alert-danger">{{ errors.first('zipcode') }}</div>
                <input v-validate="'required|decimal'" v-model="address.lat" type="text" class="form-control" name="lat" id="lat" placeholder="Lat" value="15.5" required>
                <div v-show="errors.has('lat')" class="alert alert-danger">{{ errors.first('lat') }}</div>
                <input v-validate="'required|decimal'" v-model="address.lng" type="text" class="form-control" name="lng" id="lng" placeholder="Lng" value="51.1" required>
                <div v-show="errors.has('lng')" class="alert alert-danger">{{ errors.first('lng') }}</div>
            </div>
            <div class="row marginbot-20">
                    <h5>Company details</h5>
                <input v-validate="'required'" v-model="company.name" type="text" class="form-control" name="name" id="comp_name" placeholder="Name" value="Qwa" required>
                <div v-show="errors.has('name')" class="alert alert-danger">{{ errors.first('name') }}</div>
                <input v-validate="'required'" v-model="company.catchPhrase" type="text" class="form-control" name="catchPhrase" id="catchPhrase" placeholder="Catch Phrase" value="tyjty" required>
                <div v-show="errors.has('catchPhrase')" class="alert alert-danger">{{ errors.first('catchPhrase') }}</div>
                <input v-validate="'required'" v-model="company.bs" type="text" class="form-control" name="bs" id="bs" placeholder="Bs" value="ytjtyj" required>
                <div v-show="errors.has('bs')" class="alert alert-danger">{{ errors.first('bs') }}</div>
            </div>
            <div class="row">
                <button class="btn btn-primary" type="submit">Add</button>
            </div>
        </div>
    </form>
</template>

<script>
import UserStore from "../UserStore";

export default {
    data(){
        return {
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
    methods:{
        addUser(){
            this.$validator.validateAll().then(() => {
                UserStore.methods.addUser(this.userdetails, this.address, this.company);
            });
        }
    }
}
</script>
