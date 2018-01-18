<template>
  <b-modal title="Edit User" v-model="visible" v-on:change="setVisibility">
      <b-container fluid>
        <b-row>
          <div class="col-3"><label for="firstName">First Name</label></div>
          <div class="col-9">
            <input type="text" name="firstName" id="firstName" v-model="user.firstName">
          </div>
        </b-row>
        <b-row>
          <div class="col-3"><label for="lastName">Last Name</label></div>
          <div class="col-9">
            <input type="text" name="lastName" id="lastName" v-model="user.lastName">
          </div>
        </b-row>
        <b-row>
          <div class="col-3"><label for="email">Email</label></div>
          <div class="col-9">
            <input type="text" name="email" id="email" v-model="user.email">
          </div>
        </b-row>
      </b-container>
      <div slot="modal-footer">
        <button v-on:click="editUser" class="btn btn-success">Save</button>
        <button v-on:click="setVisibility(false)" class="btn">Cancel</button>
      </div>
    </b-modal>
</template>

<script>
import axios from 'axios';
import * as _ from 'lodash';

export default {
  name: 'UserModal',
  props: ['user', 'visible'],
  methods: {
    async editUser() {
      const user = Object.create(this.user);
      try {
        const data = _.pick(user, ['firstName', 'lastName', 'email'])
        const { status } = await axios({
          method: 'patch',
          url: `http://localhost:3000/api/v0/users/${user._id}`,
          headers: { accept: '*/*' },
          auth: { username: 'admin', password: '1234' },
          data,
        });
        this.$emit('edit', user);
        this.setVisibility(false);
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
