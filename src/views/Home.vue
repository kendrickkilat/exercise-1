<template>
  <div class="home">
    <NameComponent msg="Kendrick Jordan B. Kilat" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NameComponent from '@/components/NameComponent.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    NameComponent,
  },
});
</script>
