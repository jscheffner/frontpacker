<template>
  <b-modal title="Edit User" v-model="visible" @change="setVisibility">
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
        <button @click="editUser" class="btn btn-success">Save</button>
        <button @click="setVisibility(false)" class="btn">Cancel</button>
      </div>
    </b-modal>
</template>

<script>
import * as _ from 'lodash';
import { updateUser } from '../api';

export default {
  name: 'UserModal',
  props: ['user', 'visible'],
  methods: {
    async editUser() {
      const { user } = this;
      try {
        const data = _.pick(user, ['firstName', 'lastName', 'email']);
        await updateUser(user._id, data);
        this.$emit('update:user', user);
        this.setVisibility(false);
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
