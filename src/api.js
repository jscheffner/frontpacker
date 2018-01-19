const axios = require('axios');

const auth = { username: 'admin', password: '1234' };
const baseUrl = 'http://localhost:3000/api/v0';

function removeFriend(userId, friendId) {
  return axios({
    method: 'delete',
    url: `${baseUrl}/users/${userId}/friends/${friendId}`,
    auth,
  });
}

function updateUser(userId, data) {
  return axios({
    method: 'patch',
    url: `${baseUrl}/users/${userId}`,
    auth,
    data,
  });
}

function deleteLocation(locationId) {
  return axios({
    method: 'delete',
    url: `${baseUrl}/locations/${locationId}`,
    auth,
  });
}

function getUsers() {
  return axios({
    method: 'get',
    url: `${baseUrl}/users`,
    auth,
  });
}

function deleteUser(userId) {
  return axios({
    method: 'delete',
    url: `${baseUrl}/users/${userId}`,
    auth,
  });
}

export {
  removeFriend,
  updateUser,
  deleteLocation,
  getUsers,
  deleteUser,
};
