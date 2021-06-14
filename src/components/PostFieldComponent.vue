<template>
  <div class="input-field">
    <input id="title" v-model="title" placeholder="Title" />
    <br />
    <textarea id="content" v-model="content" placeholder="What's on your mind?"></textarea>
    <br />
    <button class="submit-button" @click="post">SUBMIT</button>
    <Toast></Toast>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PostService from '@/services/PostService';
import Toast from 'primevue/toast';
// import ToastService from 'primevue/toastservice';

export default defineComponent({
  name: 'CreatePost',
  components: {
    Toast,
  },
  setup() {
    const title = ref('');
    const content = ref('');

    function post():void {
      const test = {
        content: content.value,
        title: title.value,
        author: 'John Doe',
        date: Date.now(),
      };
      PostService.addPost(test)
        .then((res) => {
          console.log(res.status);
          // Toast.add
          // ({ severity: 'success', summary: 'Submitted', detail: 'Post Successfully Submitted' });
          // this.$router.go(0);
        });
    }
    return { title, content, post };
  },
});
</script>
<style scoped>
.input-field input,
.input-field textarea,
button {
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
  background-color: #42b983;
  color: White;
}
.submit-button:hover {
  background-color: #4fdb9c;
  color: White;
}
input,
textarea {
  background-color: rgb(245, 250, 244);
}
::placeholder {
  color: grey;
}
.input-field #content {
  height: 10em;
  width: 80%;
}
</style>
