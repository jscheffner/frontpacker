<template>
     <b-modal title="Locations" v-model="visible" @change="setVisibility">
      <table class="table">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>remove</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="location in user.locations">
            <td>{{location._id}}</td>
            <td>{{location.name}}</td>
            <td><button @click="deleteLocation(location._id)" class="btn btn-link text-danger btn-sm"><icon name="trash"></icon></button></td>
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
import { deleteLocation } from '../api';

export default {
  name: 'users',
  props: ['user', 'visible'],
  methods: {
    async deleteLocation(id) {
      try {
        await deleteLocation(id);

        const user = Object.create(this.user);
        user.locations = _.filter(this.user.locations, loc => loc._id !== id);
      } catch (err) {
        console.log(err);
      }
    },
    setVisibility(visibility) {
      this.$emit('update:visible', visibility);
    },
  },
};
</script>
