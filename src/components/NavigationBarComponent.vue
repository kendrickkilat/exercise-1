<template>
  <!-- <div id="nav">
    <a class="title">Exercise 1</a>
    <router-link to="/">Home</router-link>|
    <router-link to="/newsfeed">NewsFeed</router-link>|
    <router-link to="/prime-vue-test">PrimeVue</router-link>
  </div> -->
  <Menubar :model="items" class = "custom-menu">
    <template #start>
                <img alt="logo" src="@/assets/logo.png" height="40" class="p-mr-2">
    </template>
  </Menubar>
</template>

<script lang="ts">
import Menubar from 'primevue/menubar';
import { ref } from 'vue';

export default {
  name: 'NavBar',
  components: {
    Menubar,
  },
  setup() {
    const items = ref([
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        to: '/',
      },
      {
        label: 'Newsfeed',
        icon: 'pi pi-fw pi-book',
        to: '/newsfeed',
      },
    ]);

    return {
      items,
    };
  },
};

</script>

<style lang="scss" scoped>
::v-deep(.p-menubar.custom-menu) {
  .p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link:focus,
  .p-menubar .p-menuitem-link:focus {
    box-shadow:none!important;
  }
}
#nav {
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 10px 0px;
  a {
    font-weight: bold;
    color: white;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .title {
    position: fixed;
    left: 0;
    margin-left: 10px;
  }
}
</style>
