<template>
  <div class="users">
    <h1>Users</h1>

    <user-table :users="users" v-on:openLocationsModal="openLocationsModal" v-on:openEditModal="openEditModal" v-on:openFriendsModal="openFriendsModal" v-on:users="setUsers"></user-table>
    <user-modal :visible="editVisible" :user="edit" v-on:visible="setEditVisible" v-on:edit="setEdit"></user-modal>
    <friends-modal :visible="friendsVisible" :user="edit" :users="users" v-on:visible="setFriendsVisible"></friends-modal>
    <edit-locations :visible="locationsVisible" :user="edit" :users="users" v-on:visible="setLocationsVisible"></edit-locations>

  </div>
</template>

<script>
import axios from 'axios';
import * as _ from 'lodash';
import FriendsModal from '@/components/FriendsModal';
import UserModal from '@/components/UserModal';
import EditLocations from '@/components/EditLocations';
import UserTable from '@/components/UserTable';

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
    setEditVisible(visible) {
      this.editVisible = visible;
    },
    setFriendsVisible(visible) {
      this.friendsVisible = visible;
    },
    setLocationsVisible(visible) {
      this.locationsVisible = visible;
    },
    setUsers(users) {
      this.users = users;
    },
    openEditModal(user) {
      this.edit = user;
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
    setEdit(user) {
      this.edit = user;
    }
  },
  async mounted() {
    try {
      this.users = await this.fetchUsers();
    } catch (err) {
      this.users = [];
    }
  },
  components: {
    'user-modal': UserModal,
    'friends-modal': FriendsModal,
    'edit-locations': EditLocations,
    'user-table': UserTable,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
