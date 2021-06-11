<template>
  <div class="input-field">
    <input id = "title" v-model="title" placeholder="Title">
    <br />
    <textarea
      id="content"
      v-model="content"
      placeholder="What's on your mind?"
    ></textarea>
    <br />
    <button @click="post" class="submit-button">SUBMIT</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostService from '@/services/PostService';

export default defineComponent({
  name: 'CreatePost',
  data() {
    return {
      title: '',
      content: '',
    };
  },
  methods: {
    post() {
      const test = {
        content: this.content,
        title: this.title,
        author: 'John Doe',
        date: Date.now(),
      };
      PostService.addPost(test)
        .then((res) => {
          console.log(res.status);
          this.$router.go(0);
        });
    },
  },
});
</script>
<style scoped>
.input-field input,
.input-field textarea,
button {
    border:none;
    font-size:18px;
    padding: 1em;
    width:80%;
    margin:1em;
    color: black;
    outline:none;
    resize:none;
}
.submit-button{
  background-color: #42b983;
  color: White
}
.submit-button:hover{
  background-color: #4fdb9c;
  color: White
}
input,textarea{
  background-color: rgb(245, 250, 244);
}
::placeholder{
  color:grey
}
.input-field #content {
    height:10em;
    width:80%;
}

</style>
