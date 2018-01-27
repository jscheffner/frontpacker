# Wanderlust Administration Interface

This is a simple administration interface for the Wanderlust app. Wanderlust was developed as part of a class at the [Media University Stuttgart](https://www.hdm-stuttgart.de/english). Wanderlust is supposed to help backpackers to connect with fellow backpackers and to share their favorite places. It isn't published and the backend, database, and this administration interface aren't deployed anywhere. While the app and the backend were developed with security in mind and could actually be deployed and published the way they are, this web application can't. It doesn't implement any authentication and holds default credentials inside its code. Also, it expects the backend to run under localhost:3000.

So, look on this web application as what it is: the result of learning how to write a single page application in [Vue.js](https://vuejs.org/).

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
