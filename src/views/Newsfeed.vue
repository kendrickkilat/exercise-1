<template>
  <div class="newsfeed">
    <PostField></PostField>
    <div class="posts">
      <div v-for="post in posts" v-bind:key="post.id" class="post">
        <Post :post="post"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import PostField from '@/components/PostFieldComponent.vue';
import Post from '@/components/PostComponent.vue';
import usePostSpace from '@/composables/use-post';

export default defineComponent({
  name: 'Home',
  components: {
    PostField,
    Post,
  },
  setup() {
    const { posts } = usePostSpace();
    return { posts };
  },
});
</script>
<style scoped lang="scss">
.message {
  color: var(--text-color);
}
.post {
  color: rgb(74, 92, 78);
  font-size: 18px;
  text-align: start;
  margin: 1em;
  padding: 1em;
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
  background-color: var(--primary-color)
}
::placeholder {
  color: grey;
}
.input-field #content {
  height: 10em;
  width: 80%;
}
</style>
