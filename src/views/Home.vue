<template>
  <div class="home">
    <NameComponent :msg="name" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import NameComponent from '@/components/NameComponent.vue';

export default defineComponent({
  name: 'Home',
  components: {
    NameComponent,
  },
  setup() {
    const name = ref('Kendrick Jordan B. Kilat');
    return {
      name,
    };
  },
});
</script>
