<template>
  <b-modal title="Edit User" :visible="visible" @change="setVisibility">
      <b-alert variant="danger" dismissible :show="showAlert" @dismissed="showAlert = false">Could not save changes.</b-alert>
      <b-container fluid>
        <b-row>
          <div class="col-3"><label for="firstName">First Name</label></div>
          <div class="col-9">
            <input type="text" name="firstName" id="firstName" v-model="formUser.firstName">
          </div>
        </b-row>
        <b-row>
          <div class="col-3"><label for="lastName">Last Name</label></div>
          <div class="col-9">
            <input type="text" name="lastName" id="lastName" v-model="formUser.lastName">
          </div>
        </b-row>
        <b-row>
          <div class="col-3"><label for="email">Email</label></div>
          <div class="col-9">
            <input type="text" name="email" id="email" v-model="formUser.email">
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
  data() {
    return {
      formUser: Object.assign({}, this.user),
      showAlert: false,
    };
  },
  methods: {
    async editUser() {
      const { formUser } = this;
      try {
        const data = _.pick(formUser, ['firstName', 'lastName', 'email']);
        await updateUser(formUser._id, data);
        this.$emit('updateUser', formUser);
        this.setVisibility(false);
      } catch (err) {
        this.showAlert = true;
      }
    },
    setVisibility(visibility) {
      this.showAlert = false;
      this.formUser = Object.assign({}, this.user);
      this.$emit('update:visible', visibility);
    },
  },
};
</script>
