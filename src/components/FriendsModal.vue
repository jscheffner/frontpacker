<template>
  <b-modal title="Friends" v-model="visible" v-on:change="setVisibility">
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
        <tr v-for="friend in user.friends">
          <td>{{friend._id}}</td>
          <td>{{friend.firstName}}</td>
          <td>{{friend.lastName}}</td>
          <td><button v-on:click="deleteFriend(friend)" class="btn btn-link text-danger btn-sm"><icon name="trash"></icon></button></td>
        </tr>
      </tbody>
    </table>
    <div slot="modal-footer">
      <button v-on:click="setVisibility(false)" class="btn">Cancel</button>
    </div>
  </b-modal>
</template>

<script>
import axios from 'axios';
import * as _ from 'lodash';

export default {
  name: 'FriendsModal',
  props: ['user', 'visible', 'initialUsers', 'users'],
  methods: {
    async deleteFriend(friend) {
      try {
        const { status } = await axios({
          method: 'delete',
          url: `http://localhost:3000/api/v0/users/${this.user._id}/friends/${friend._id}`,
          headers: { accept: '*/*' },
          auth: { username: 'admin', password: '1234' },
        });

        const user = Object.create(this.user);
        const users = Object.create(this.users);
        user.friends = _.filter(this.user.friends, f => friend._id !== f._id);
        this.$emit('edit', user);
        const friendUser = _.find(users, { _id: friend._id });
        friendUser.friends = _.filter(this.user.friends, f => f._id !== friend._id);
        this.$emit('users', friendUser);

      } catch(err) {
        console.log(err);
      }
    },
    setVisibility(visibility) {
      this.$emit('visible', visibility);
    }
  },
};
</script>
