<template>
  <b-modal title="Friends" :visible="visible" @change="setVisibility">
    <b-alert variant="danger" dismissible :show="showAlert" @dismissed="showAlert = false">Could not remove friend.</b-alert>
    <table class="table">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>unfriend</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="friend in user.friends">
          <td>{{friend._id}}</td>
          <td>{{friend.firstName}} {{friend.lastName}}</td>
          <td><button @click="deleteFriend(friend)" class="btn btn-link text-danger btn-sm"><icon name="trash"></icon></button></td>
        </tr>
      </tbody>
    </table>
    <div slot="modal-footer">
      <button @click="setVisibility(false)" class="btn">Cancel</button>
    </div>
  </b-modal>
</template>

<script>
import * as _ from 'lodash';
import { removeFriend } from '../api';

export default {
  name: 'FriendsModal',
  props: ['user', 'visible', 'users'],
  data() {
    return { showAlert: false };
  },
  methods: {
    async deleteFriend(friend) {
      try {
        const user = Object.create(this.user);
        const users = Object.create(this.users);
        await removeFriend(user._id, friend._id);
        user.friends = _.filter(user.friends, f => friend._id !== f._id);

        const friendUser = _.find(users, { _id: friend._id });
        friendUser.friends = _.filter(user.friends, f => f._id !== friend._id);

        this.$emit('updateUser', user);
        this.$emit('updateUser', friendUser);
      } catch (err) {
        this.showAlert = true;
      }
    },
    setVisibility(visibility) {
      this.showAlert = false;
      this.$emit('update:visible', visibility);
    },
  },
};
</script>
