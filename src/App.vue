<template>
  <NavBar />
  <Toast></Toast>
  <router-view/>
</template>
<script lang="ts">
import NavBar from '@/components/NavigationBarComponent.vue';
import Toast from 'primevue/toast';

export default {
  components: {
    NavBar,
    Toast,
  },
};
</script>
<style lang="scss">
@import "@/styles/custom-styles.scss";
</style>
