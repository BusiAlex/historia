<template>
  <div class="p-5 my-width-login my-loginview">
 <div class="mt-5 ms-4 me-3 my-login">

   <!-- user name -->
   <div class="mb-3">
     <label for="userName" class="form-label">Felhasználónév</label>
      <input
        type="text"
        class="form-control custom-input"
        id="userName"
        v-model="storeLogin.userName"
      />
    </div>
    <!-- password -->
    <div class="mb-3 ">
      <label for="password" class="form-label">Jelszó</label>
      <input
        type="password"
        class="form-control custom-input"
        id="password"
        v-model="storeLogin.password"
      /> 
    </div>
    <!-- Button login -->
    <button type="button" class="btn btn-primary mb-3 " @click="login()">
      Bejelentkezés
    </button>
    
    <div v-if="loginErrorMessage" class="alert alert-danger" role="alert">
      {{ loginErrorMessage }}
    </div>
  </div>
  </div>
</template>

<script>
import { useUrlStore } from "@/stores/url";
const storeUrl = useUrlStore();
import { useLoginStore } from "@/stores/login";
import router from "../router";
const storeLogin = useLoginStore();
export default {
  data() {
    return {
      storeUrl,
      storeLogin,
      loginErrorMessage: null,
    };
  },
  methods: {
    loginErrorMessageShow(message) {
      this.loginErrorMessage = message;
      setTimeout(() => { 
        this.loginErrorMessage = null;
      }, 3000);
    },
    async login() {
      const url = this.storeUrl.urlLogin;
      const user = {
        userName: this.storeLogin.userName,
        password: this.storeLogin.password,
      };
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };
      try {
        // this.errorMessage = null;
        const response = await fetch(url, config);
        if (!response.ok) {
          this.loginErrorMessageShow("Server error 1");
          return;
        }
        const data = await response.json();
        console.log("xxx",data);

        if (data.success) {
          //sikeres bejelentkezés
          this.storeLogin.loginSuccess = data.success;
          this.storeLogin.accessToken = data.data.accessToken;
          this.storeLogin.refreshToken = data.data.refreshToken;
          this.storeLogin.userId = data.data.userId;
          this.storeLogin.number = data.data.number;
          this.storeLogin.loginSuccess = data.success;
          this.storeLogin.accessTime = parseInt(data.data.accessTime);
          router.push("/");
          // this.timer();
          // this.getTodos();
        } else {
          //sikertelen bejelenkezés
          
          this.loginErrorMessageShow("Hibás usernév vagy jelszó");
        }
      } catch (error) {
        // this.errorMessage = `Server error`;
        this.loginErrorMessageShow("Server error 2");
      }
    },
  },
};
</script>

<style>

.custom-input{
  width: 200px;
  position: relative;
  left: 40%;
}

.my-login{
  position: relative;
  text-align: center;
  font-weight: bolder;
  font-size: 35px;
}
</style>