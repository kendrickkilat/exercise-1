<template>
  <br />
  <h1>Oops</h1>
  <h3>Page not Found</h3>

  <router-link :to="toNewsFeed">Head back to Newsfeed</router-link>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import rn from '@/enums/routenames';

export default defineComponent({
  name: 'Error404',
  setup() {
    const toNewsFeed = computed(() => ({ name: rn.Newsfeed }));

    return {
      toNewsFeed,
    };
  },
});
</script>
