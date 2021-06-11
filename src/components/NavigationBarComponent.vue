<template>
  <div id="nav">
    <a class = "title">Exercise 1</a>
    <router-link to="/">Home</router-link> |
    <router-link to="/newsfeed">NewsFeed</router-link> |
    <!-- <router-link to="/prime-vue-test">PrimeVue</router-link> -->
  </div>
</template>

<script lang="ts">

export default {
  name: 'NavBar',
};

</script>

<style lang="scss" scoped>
#nav {
  background-color:rgba(0, 0, 0, 0.80);
  z-index:999;
  position:fixed;
  top:0;
  width:100%;
  padding: 10px 0px;
  a {
    font-weight: bold;
    color: white;
    text-decoration:none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .title{
    position:fixed;
    left:0;
    margin-left:10px;
  }
}
</style>
