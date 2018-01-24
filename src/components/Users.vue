<template>
  <div class="users">
    <h1>Users</h1>

    <b-alert variant="danger" dismissible :show="alert.show" @dismissed="alert.show = false">{{ this.alert.message }}</b-alert>

    <table class="table">
      <thead>
        <tr>
          <th>id</th>
          <th>google id</th>
          <th>name</th>
          <th>email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <td>{{user._id}}</td>
          <td>{{user.googleId}}</td>
          <td>{{user.firstName}} {{user.lastName}}</td>
          <td>{{user.email}}</td>
          <td><button @click="openLocationsModal(user)" class="btn btn-link btn-sm"><icon name="globe"></icon> {{user.locations.length}}</button></td>
          <td><button @click="openFriendsModal(user)" class="btn btn-link btn-sm"><icon name="users"></icon> {{user.friends.length}}</button></td>
          <td><button @click="openEditModal(user)" class="btn btn-link btn-sm"><icon name="edit"></icon></button></td>
          <td><button @click="removeUser(user._id)" class="btn btn-link btn-sm text-danger"><icon name="trash"></icon></button></td>
        </tr>
      </tbody>
    </table>

    <user-modal :visible.sync="editVisible" :user="user" @updateUser="updateUser"></user-modal>
    <friends-modal :visible.sync="friendsVisible" :user.sync="user" :users="users" @updateUser="updateUser"></friends-modal>
    <locations-modal :visible.sync="locationsVisible" :user="user" @updateUser="updateUser"></locations-modal>

  </div>
</template>

<script>
import * as _ from 'lodash';
import FriendsModal from './FriendsModal';
import LocationsModal from './LocationsModal';
import UserModal from './UserModal';
import { getUsers, deleteUser } from '../api';

export default {
  name: 'users',
  data() {
    return {
      users: [],
      user: {},
      editVisible: false,
      friendsVisible: false,
      locationsVisible: false,
      alert: {
        text: 'Something went wrong',
        show: false,
      },
    };
  },
  methods: {
    async removeUser(id) {
      try {
        await deleteUser(id);
        this.users = _.filter(this.users, user => user._id !== id);
      } catch (err) {
        this.showAlert('Could not delete user');
      }
    },
    openEditModal(user) {
      this.user = user;
      this.editVisible = true;
    },
    openFriendsModal(user) {
      this.user = user;
      this.friendsVisible = true;
    },
    openLocationsModal(user) {
      this.user = user;
      this.locationsVisible = true;
    },
    updateUser(newUser) {
      const user = _.find(this.users, { _id: newUser._id });
      Object.assign(user, newUser);
    },
    showAlert(message) {
      this.alert = {
        message,
        show: true,
      };
    },
  },
  async mounted() {
    try {
      const { data } = await getUsers();
      this.users = data;
    } catch (err) {
      this.showAlert('Loading users failed.');
    }
  },
  components: {
    'user-modal': UserModal,
    'friends-modal': FriendsModal,
    'locations-modal': LocationsModal,
  },
};
</script>
