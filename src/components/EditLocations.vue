<template>
     <b-modal id="editLocations" title="Locations" v-model="visible" v-on:change="setVisibility">
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
            <td><button v-on:click="deleteLocation(location._id)" class="btn btn-link text-danger btn-sm"><icon name="trash"></icon></button></td>
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
  name: 'users',
  props: ['user', 'visible', 'initialUsers'],
  methods: {
    async deleteLocation(id) {
      try {
        const { status } = await axios({
          method: 'delete',
          url: `http://localhost:3000/api/v0/locations/${id}`,
          headers: { accept: '*/*' },
          auth: { username: 'admin', password: '1234' },
        });

        const user = Object.create(this.user);
        user.locations = _.filter(this.user.locations, loc => loc._id !== id);
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
