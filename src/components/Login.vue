<template>
  <div class='login'>
    <h3>Login</h3>
    <input type="text" ref="login" id="login" />
    <input type="password" ref="pass" id="pass" />
    <button type="button" v-on:click="login()">OK</button>
  </div>
</template>

<script>
// import 'bootstrap';
import axios from 'axios';

export default {
  name: 'Login',
  props: ['credentials'],
  methods: {
    async login() {
      try {
        console.log('username:', this.$refs.login.value, 'password:', this.$refs.pass.value)
        const credentials = {
          username: this.$refs.login.value,
          password: this.$refs.pass.value
          };
        await axios({
          method: 'get',
          url: 'http://localhost:3000/auth/admin',
          auth: credentials,
        });
        this.$route.$data.credentials = credentials;
        console.log('data', data);
      } catch(err) {
        console.log('Error:', err);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
