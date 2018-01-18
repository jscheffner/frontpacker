<template>
  <div id="app" class="container">
    <h1 class="text-primary">Wanderlust Controll Center</h1>
    <router-view/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

export default {
  name: 'app',
  data: {
    username: '',
    password: '',
  },
};
</script>

<style>

</style>
