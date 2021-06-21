<template>
  <div class="newsfeed">
    <!-- <Toast></Toast> -->
    <!-- INPUT FIELDS -->
    <PostField></PostField>
    <!-- LIST -->
    <hr class="divider" />
    <div v-if="posts == null || posts.length == 0" class="message">No Posts...yet</div>
    <div class="posts">
      <div v-for="post in posts" v-bind:key="post.id" class="post">
        <Post :post="post"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import PostField from '@/components/PostFieldComponent.vue'; // @ is an alias to /src
import Post from '@/components/PostComponent.vue';
import usePostSpace from '@/use/post-space';

export default defineComponent({
  // inject: ['localPosts'],
  name: 'Home',
  components: {
    PostField,
    Post,
    // Toast,
  },
  setup() {
    const { posts } = usePostSpace();
    // provide('inputs', title.value);
    return { posts };
  },
});
</script>
<style scoped>
.post {
  color: rgb(74, 92, 78);
  background-color: rgb(245, 250, 244);
  font-size: 18px;
  text-align: start;
  margin: 1em;
  padding: 1em;
  cursor: pointer;
}
div.post:hover {
  background-color: rgb(232, 253, 230);
}
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
