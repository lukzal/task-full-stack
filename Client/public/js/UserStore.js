/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/UserStore.js":
/*!***********************************!*\
  !*** ./resources/js/UserStore.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var UserStore = {
  data: {
    users: [],
    error: null,
    id: null,
    done: false
  },
  methods: {
    handleErrors: function handleErrors(response) {
      if (!response.ok) {
        switch (response.status) {
          case 404:
            UserStore.data.error = "User not found";
            break;
        }
      }

      return response;
    },
    clear: function clear() {
      var length = UserStore.data.users.length;
      UserStore.data.users.splice(0, length);
    },
    getUsers: function getUsers() {
      UserStore.methods.clear();
      fetch("http://127.0.0.1:8000/api/users/").then(function (response) {
        return response.json();
      }).then(function (data) {
        UserStore.data.users = data.data;
      });
    },
    getUserByID: function getUserByID(id) {
      fetch("http://127.0.0.1:8000/api/users/" + id).then(UserStore.methods.handleErrors).then(function (response) {
        return response.json();
      }).then(function (data) {
        UserStore.methods.clear();
        UserStore.data.users.push(data.data);
      });
    },
    addUser: function addUser(user, address, company) {
      UserStore.methods.clear();
      var id = null;
      fetch("http://127.0.0.1:8000/api/users/", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(user)
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        UserStore.data.users.push(data.data);
        console.log("data");
        console.log(data.data);
        id = data.data.id;
        console.log(data.data.id);
        console.log("address");
        fetch("http://127.0.0.1:8000/api/users/" + id + "/address", {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(address)
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
          console.log("company");
          fetch("http://127.0.0.1:8000/api/users/" + id + "/company", {
            headers: {
              "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(company)
          });
        });
      });
    },
    updateUser: function updateUser(user, address, company, id) {
      UserStore.methods.clear();
      fetch("http://127.0.0.1:8000/api/users/" + id, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(user)
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        UserStore.data.users.push(data.data);
        console.log("data");
        console.log(data.data);
        console.log(data.data.id);
        console.log("address");
        fetch("http://127.0.0.1:8000/api/users/" + id + "/address", {
          headers: {
            "Content-Type": "application/json"
          },
          method: "PUT",
          body: JSON.stringify(address)
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
          console.log("company");
          fetch("http://127.0.0.1:8000/api/users/" + id + "/company", {
            headers: {
              "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(company)
          });
        });
      });
    },
    importUser: function importUser() {
      var randNum = (Math.random() * (10 - 1) + 1).toFixed();
      var user;
      var address;
      var company;
      fetch("https://jsonplaceholder.typicode.com/users/" + randNum).then(function (response) {
        return response.json();
      }).then(function (data) {
        user = {
          name: data.name,
          username: data.username,
          email: data.email,
          phone: data.phone,
          website: data.website,
          address_id: "0",
          company_id: "0"
        };
        address = {
          street: data.address.street,
          suite: data.address.suite,
          city: data.address.city,
          zipcode: data.address.zipcode,
          lat: data.address.geo.lat,
          lng: data.address.geo.lng
        };
        company = {
          name: data.company.name,
          catchPhrase: data.company.catchPhrase,
          bs: data.company.bs
        };
        console.log(JSON.stringify(address));
        UserStore.methods.addUser(user, address, company);
      });
    },
    deleteUser: function deleteUser(id) {
      fetch("http://127.0.0.1:8000/api/users/" + id, {
        method: "DELETE"
      });
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (UserStore);

/***/ }),

/***/ 1:
/*!*****************************************!*\
  !*** multi ./resources/js/UserStore.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xampp\htdocs\task-full-stack\Client\resources\js\UserStore.js */"./resources/js/UserStore.js");


/***/ })

/******/ });