<template>
  <div class="input-field">
    <input id="title" v-model="title" placeholder="Title" /><br /><textarea
      id="content"
      v-model="content"
      placeholder="What's on your mind?"
    ></textarea
    ><br /><button class="submit-button" @click="post">SUBMIT</button
    ><Toast></Toast>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostService from '@/services/PostService';
import Toast from 'primevue/toast';

export default defineComponent({
  name: 'CreatePost',
  components: {
    Toast,
  },
  data() {
    return {
      title: '',
      content: '',
    };
  },
  methods: {
    post() {
      const test = {
        id: 1,
        content: this.content,
        title: this.title,
        author: 'John Doe',
        date: Date.now(),
      };
      PostService.addPost(test)
        .then((res) => {
          console.log(res.status);
          this.$toast.add({ severity: 'success', summary: 'Submitted', detail: 'Post Successfully Submitted' });
          // this.$router.go(0);
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
