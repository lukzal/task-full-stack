const UserStore = {
    data: {
        users: [],
        error: null,
        id: null,
        done: false,
    },
    methods: {
        handleErrors(response) {
            if (!response.ok) {
                switch(response.status){
                    case 404:
                        UserStore.data.error = "User not found";
                    break;
                }
            }
            return response;
        },
        clear(){
            var length = UserStore.data.users.length;
            UserStore.data.users.splice(0, length);
        },
        getUsers(){
            UserStore.methods.clear();
            fetch("http://127.0.0.1:8000/api/users/")
            .then(response => response.json())
            .then((data) => {
                UserStore.data.users = data.data;
            });
        },
        getUserByID(id){
            fetch("http://127.0.0.1:8000/api/users/" + id)
            .then(UserStore.methods.handleErrors)
            .then(response => response.json())
            .then((data) => {
                UserStore.methods.clear();
                UserStore.data.users.push(data.data);
            });
        },
         addUser(user, address, company){
            UserStore.methods.clear();
            var id = null;
            fetch("http://127.0.0.1:8000/api/users/", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(user),
            })
            .then(response => response.json())
            .then((data) => {
                UserStore.data.users.push(data.data);
                
                id = data.data.id;
            fetch("http://127.0.0.1:8000/api/users/" + id + "/address", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(address),
            }).then(response => response.json())
            .then((data) => {

            fetch("http://127.0.0.1:8000/api/users/" + id + "/company", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(company),
            });
            });
            });
        },
        updateUser(user, address, company, id){
            UserStore.methods.clear();
            fetch("http://127.0.0.1:8000/api/users/" + id, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "PUT",
                body: JSON.stringify(user),
            })
            .then(response => response.json())
            .then((data) => {
                UserStore.data.users.push(data.data);
             
            fetch("http://127.0.0.1:8000/api/users/" + id + "/address", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "PUT",
                body: JSON.stringify(address),
            }).then(response => response.json())
            .then((data) => {

            fetch("http://127.0.0.1:8000/api/users/" + id + "/company", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "PUT",
                body: JSON.stringify(company),
            });
            });
            });
        },
        importUser(){
            var randNum = (Math.random() * (10-1) + 1).toFixed();
            var user;
            var address;
            var company;

            fetch("https://jsonplaceholder.typicode.com/users/" + randNum)
            .then(response => response.json())
            .then((data) => {
            user = {
                name: data.name,
                username: data.username,
                email: data.email,
                phone: data.phone,
                website: data.website,
                address_id: "0",
                company_id: "0",
            };

            address = {
                street: data.address.street,
                suite: data.address.suite,
                city: data.address.city,
                zipcode: data.address.zipcode,
                lat: data.address.geo.lat,
                lng: data.address.geo.lng,
            };

            company = {
                name: data.company.name,
                catchPhrase: data.company.catchPhrase,
                bs: data.company.bs,
            };


            UserStore.methods.addUser(user, address, company);
        });
        },
        deleteUser(id){
            fetch("http://127.0.0.1:8000/api/users/" + id, {
                method: "DELETE"
            });
        },
    }
};

export default UserStore;