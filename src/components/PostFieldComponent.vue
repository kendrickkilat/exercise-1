<template>
  <div class="input-field">
    <InputText v-model="title" placeholder="Title" v-on:click.prevent></InputText>
    <br />
    <TextArea
    v-model="content"
    rows="4"
    placeholder="Whats on your mind"
    v-on:click.prevent></TextArea>
    <br />
    <div class="p-fluid p-grid">
      <Button @click="triggerAddPost" label="SUBMIT" class="submit-button"></Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import PostService from '@/services/PostService';
import usePostSpace from '@/composables/use-post-space';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import TextArea from 'primevue/textarea';
import useToastSpace from '@/composables/use-toast';

export default defineComponent({
  name: 'CreatePost',
  components: {
    Button,
    InputText,
    TextArea,
  },
  setup() {
    const { instantiateToast } = useToastSpace();
    const {
      content,
      title,
      addPost,
    } = usePostSpace();

    function triggerAddPost() {
      const result = addPost();
      console.log('triggerAddPost', result);
      let msg = {};
      if (result) {
        msg = {
          severity: 'success', summary: 'Success!', detail: 'Post has successfully Added!', life: 3000,
        };
      } else {
        msg = {
          severity: 'error', summary: 'Error while Submitting Form', detail: 'Title and/or Content is empty', life: 3000,
        };
      }
      instantiateToast(msg);
    }

    return {
      content,
      title,
      addPost,
      triggerAddPost,
    };
  },
});
</script>
<style scoped lang="scss">
.input-field input,
.input-field textarea {
  border: none;
  font-size: 18px;
  padding: 1em;
  width: 80%;
  margin: 1em;
  color: black;
  outline: none;
  resize: none;
}
.submit-button {
  margin: 1em 4em;
  font-size: 18px;
  padding: 0.5em 0;
}
input,
textarea {
  background-color: var(--surface-0);
}
::placeholder {
  color: grey;
}
.input-field #content {
  height: 10em;
  width: 80%;
}
</style>
