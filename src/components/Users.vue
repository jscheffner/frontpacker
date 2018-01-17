<template>
  <div class="users">
    <h1>Users</h1>
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

    <b-modal id="modal1" title="Edit User" ref="edit_user_modal" v-model="editVisible">
      <b-container fluid>
        <b-row>
          <div class="col-3"><label for="firstName">First Name</label></div>
          <div class="col-9">
            <input type="text" name="firstName" id="firstName" v-model="editTmp.firstName">
          </div>
        </b-row>
        <b-row>
          <div class="col-3"><label for="lastName">Last Name</label></div>
          <div class="col-9">
            <input type="text" name="lastName" id="lastName" v-model="editTmp.lastName">
          </div>
        </b-row>
        <b-row>
          <div class="col-3"><label for="email">Email</label></div>
          <div class="col-9">
            <input type="text" name="email" id="email" v-model="editTmp.email">
          </div>
        </b-row>
      </b-container>
      <div slot="modal-footer">
        <button v-on:click="editUser" class="btn btn-success">Save</button>
        <button v-on:click="editVisible=false" class="btn">Cancel</button>
      </div>
    </b-modal>

   <b-modal id="editFriends" title="Friends" v-model="friendsVisible">
      <table class="table">
        <thead>
          <tr>
            <th>id</th>
            <th>first name</th>
            <th>last name</th>
            <th>unfriend</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="friend in edit.friends">
            <td>{{friend._id}}</td>
            <td>{{friend.firstName}}</td>
            <td>{{friend.lastName}}</td>
            <td><button v-on:click="deleteFriend(friend)" class="btn btn-link text-danger btn-sm"><icon name="trash"></icon></button></td>
          </tr>
        </tbody>
      </table>
      <div slot="modal-footer">
        <button v-on:click="friendsVisible=false" class="btn">Cancel</button>
      </div>
    </b-modal>

   <b-modal id="editLocations" title="Locations" v-model="locationsVisible">
      <table class="table">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>remove</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="location in edit.locations">
            <td>{{location._id}}</td>
            <td>{{location.name}}</td>
            <td><button v-on:click="deleteLocation(location._id)" class="btn btn-link text-danger btn-sm"><icon name="trash"></icon></button></td>
          </tr>
        </tbody>
      </table>
      <div slot="modal-footer">
        <button v-on:click="locationsVisible=false" class="btn">Cancel</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import * as _ from 'lodash';

export default {
  name: 'users',
  data() {
    return {
      users: [],
      edit: {},
      editTmp: {},
      editVisible: false,
      friendsVisible: false,
      locationsVisible: false,
    };
  },
  methods: {
    async fetchUsers() {
      const { data } = await axios({
        method: 'get',
        url: 'http://localhost:3000/api/v0/users',
        headers: { accept: '*/*' },
        auth: { username: 'admin', password: '1234' },
      });

      return data;
    },
    async deleteUser(id) {
      try {
        const { status } = await axios({
          method: 'delete',
          url: `http://localhost:3000/api/v0/users/${id}`,
          headers: { accept: '*/*' },
          auth: { username: 'admin', password: '1234' },
        });

        this.users = _.filter(this.users, user => user._id !== id);
      } catch(err) {
        console.log(err);
      }
    },
    async deleteFriend(friend) {
      try {
        const { status } = await axios({
          method: 'delete',
          url: `http://localhost:3000/api/v0/users/${this.edit._id}/friends/${friend._id}`,
          headers: { accept: '*/*' },
          auth: { username: 'admin', password: '1234' },
        });

        const friendUser = _.find(this.users, { _id: friend._id });
        friendUser.friends = _.filter(this.edit.friends, f => f._id !== friend._id);
        this.edit.friends = _.filter(this.edit.friends, f => friend._id !== f._id);
      } catch(err) {
        console.log(err);
      }
    },
    async deleteLocation(id) {
      try {
        const { status } = await axios({
          method: 'delete',
          url: `http://localhost:3000/api/v0/locations/${id}`,
          headers: { accept: '*/*' },
          auth: { username: 'admin', password: '1234' },
        });

        this.edit.locations = _.filter(this.edit.locations, loc => loc._id !== id);
      } catch(err) {
        console.log(err);
      }
    },
    openEditModal(user) {
      this.edit = user;
      this.editTmp = Object.assign({}, user);
      this.editVisible = true;
    },
    openFriendsModal(user) {
      this.edit = user;
      this.friendsVisible = true;
    },
    openLocationsModal(user) {
      this.edit = user;
      this.locationsVisible = true;
    },
    async editUser() {
      const user = this.editTmp;
      try {
        const data = _.diff(user, ['firstName', 'lastName', 'email'])
        const { status } = await axios({
          method: 'patch',
          url: `http://localhost:3000/api/v0/users/${user._id}`,
          headers: { accept: '*/*' },
          auth: { username: 'admin', password: '1234' },
          data,
        });
        Object.assign(this.edit, user);
        this.editVisible = false;
      } catch(err) {
        console.log(err);
      }
    }
  },
  async mounted() {
    try {
      this.users = await this.fetchUsers();
    } catch (err) {
      this.users = [];
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
