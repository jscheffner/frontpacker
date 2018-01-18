<template>
  <table class="table">
      <thead>
        <tr>
          <th>id</th>
          <th>google id</th>
          <th>first name</th>
          <th>last name</th>
          <th>email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <td>{{user._id}}</td>
          <td>{{user.googleId}}</td>
          <td>{{user.firstName}}</td>
          <td>{{user.lastName}}</td>
          <td>{{user.email}}</td>
          <td><button v-on:click="openLocationsModal(user)" class="btn btn-link btn-sm"><icon name="globe"></icon> {{user.locations.length}}</button></td>
          <td><button v-on:click="openFriendsModal(user)" class="btn btn-link btn-sm"><icon name="users"></icon> {{user.friends.length}}</button></td>
          <td><button v-on:click="openEditModal(user)" class="btn btn-link btn-sm"><icon name="edit"></icon></button></td>
          <td><button v-on:click="deleteUser(user._id)" class="btn btn-link btn-sm text-danger"><icon name="trash"></icon></button></td>
        </tr>
      </tbody>
    </table>
</template>

<script>
import axios from 'axios';
import * as _ from 'lodash';

export default {
  name: 'UserTable',
  props: ['users'],
  methods: {
    openLocationsModal (user) {
      this.$emit('openLocationsModal', user);
    },
    openFriendsModal (user) {
      this.$emit('openFriendsModal', user);
    },
    openEditModal (user) {
      this.$emit('openEditModal', user);
    },
    async deleteUser(id) {
      try {
        const { status } = await axios({
          method: 'delete',
          url: `http://localhost:3000/api/v0/users/${id}`,
          headers: { accept: '*/*' },
          auth: { username: 'admin', password: '1234' },
        });

        const users = _.filter(this.users, user => user._id !== id);
        this.$emit('users', users);
      } catch(err) {
        console.log(err);
      }
    },
  },
};
</script>
