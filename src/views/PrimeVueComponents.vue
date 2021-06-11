<template>
  <div>
    <div>
      <Button icon="pi pi-arrow-right" @click="sideBarVisible = true" />
      <InputText v-model="title"/>
      <TextArea
        class="text-area"
        v-model="content"
        :autoResize="true"
        rows="5"
        cols="80"
      />
    </div>

    <Button label="Submit" icon="pi pi-user" @click="submit"></Button>
    <br />
    {{ content }}
    <Toast />
    <Dialog v-model:visible="display">
      <template #header>
        <h3>{{ title }}</h3>
      </template>
      {{ content }}
      <template #footer> Footer </template>
    </Dialog>
    <SideBar v-model:visible = "sideBarVisible" position="left">
      Content
    </SideBar>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PrimeVueComponents',
  data() {
    return {
      content: null,
      display: false,
      title: null,
      sideBarVisible: false,
    };
  },
  methods: {
    submit() {
      this.display = true;
      this.$toast.add({ severity: 'success', summary: 'Submitted', detail: 'Post Successfully Submitted' });
      // this.$router.go(0);
    },
  },
  components: {
  },
});
</script>
<style scoped>
</style>
