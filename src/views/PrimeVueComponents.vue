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
import { defineComponent, ref } from 'vue';
import { useToast } from 'primevue/usetoast';

export default defineComponent({
  name: 'PrimeVueComponents',
  setup() {
    const content = ref(null);
    const display = ref(false);
    const title = ref(null);
    const sideBarVisible = ref(false);
    const toast = useToast();

    function submit():void {
      display.value = true;
      toast.add({ severity: 'success', summary: 'Submitted', detail: 'Post Successfully Submitted' });
    }

    return {
      content,
      display,
      title,
      sideBarVisible,
      toast,
      submit,
    };
  },
  components: {
  },
});
</script>
<style scoped>
</style>
