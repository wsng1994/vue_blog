<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Viewer from 'v-viewer'
  import 'viewerjs/dist/viewer.css'
  Vue.use(Viewer)
  Viewer.setDefaults({
    Options: { 'inline': false, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
  })
export default {
  name: 'App'
}
</script>

<style>

  /* @import '../static/css/style.css'; */

body {
  -webkit-overflow-scrolling: touch;overflow-scrolling: touch;
}



#app {

  width:100%;
  /* min-width: 9999px; */
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  background-image: url(../static/img/background/violet.jpeg);
  background-repeat: no-repeat;
  background-size:cover;
  -moz-background-size:100% 100%;
  background-position: center;
  /* position: fixed; */
  background-attachment: fixed;
}
</style>
