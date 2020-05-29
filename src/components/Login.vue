<template>
 <div>
   <form class="login" @submit.prevent="login">
     <h1>Sign in</h1>
     <label>User name</label>
     <input required v-model="username" type="text" placeholder="Snoopy"/>
     <label>Password</label>
     <input required v-model="password" type="password" placeholder="Password"/>
     <hr/>
     <button type="submit"><router-link to='/'>Login</router-link></button>
   </form>
 </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "its",
      password: "its"
    };
  },
  methods: {
    login: function() {
      const { username, password } = this;
      if(this.username = username, this.password = password)
      return('#')
    }
  }
};
</script>

<style>
.login {
  display: flex;
  flex-direction: column;
  position: relaative;
  width: 300px;
  padding: 10px;
}
</style>