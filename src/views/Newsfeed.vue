<template>
  <div class="newsfeed">
    <PostField />
    <hr class = "divider">
    <div v-if = "posts == null || posts.length == 0" class = "message">No Posts...yet</div>
    <div class = "posts">
      <div v-for="post in posts" v-bind:key="post.id" class = "post">
         <Post :post = "post"/>
    </div>
    </div>

  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import PostField from '@/components/PostFieldComponent.vue'; // @ is an alias to /src
import Post from '@/components/PostComponent.vue';
import PostService from '@/services/PostService';
import { IPost } from '@/Interfaces/post';

export default defineComponent({
  name: 'Home',
  components: {
    PostField,
    Post,
  },
  setup() {
    const posts = ref<IPost[]>([]);
    return { posts };
  },
  created() {
    PostService.getPosts()
      .then((res) => {
        console.log(res.status);
        this.posts = res.data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
});
</script>
<style scoped>
.post{
  color:rgb(74, 92, 78);
  background-color: rgb(245, 250, 244);
  font-size:18px;
  text-align: start;
  margin:1em;
  padding:1em;
  cursor:pointer;
}
div.post:hover{
  background-color:rgb(232, 253, 230);
}
</style>
