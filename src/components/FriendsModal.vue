<template>
  <b-modal title="Friends" v-model="visible" @change="setVisibility">
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
  props: ['user', 'visible', 'initialUsers', 'users'],
  methods: {
    async deleteFriend(friend) {
      try {
        const { user, users } = this;
        await removeFriend(user._id, friend._id);
        user.friends = _.filter(user.friends, f => friend._id !== f._id);

        const friendUser = _.find(users, { _id: friend._id });
        friendUser.friends = _.filter(user.friends, f => f._id !== friend._id);

        this.$emit('update:user', user);
        this.$emit('update:users', friendUser);
      } catch (err) {
        // TODO show error badge
      }
    },
    setVisibility(visibility) {
      this.$emit('update:visible', visibility);
    },
  },
};
</script>
