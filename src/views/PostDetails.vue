<template>
  <div v-if="post" class="post">
    <router-link class ="router" :to = "toNewsFeed">Back to Newsfeed</router-link>
    <div class="post-item post-title">
      <!-- {{post.title}} -->
      <span class = "post-author">{{post.author}}</span>
      <br />
      <span class = "date">{{readableDate(post.date)}}</span>
      </div>
    <div class="post-item post-content">
      {{post.content}}
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import PostService from '@/services/PostService';
import { IPost } from '@/Interfaces/post';

export default defineComponent({
  name: 'PostDetails',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const post = ref<IPost>();
    const toNewsFeed = computed(() => ({ name: 'NewsFeed' }));

    function readableDate(temp):string {
      console.log(temp);
      const dateTime = new Date(temp);
      const date = `${dateTime.getMonth() + 1}/${dateTime.getDate()}/${dateTime.getFullYear()}`;
      const altTime = dateTime.toLocaleTimeString();
      return `${date} | ${altTime}`;
    }
    return { post, toNewsFeed, readableDate };
  },
  created() {
    // console.log(this.$route.query.post);
    PostService.getPost(this.id)
      .then((res) => {
        console.log(res.status);
        [this.post] = res.data;
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
  background-color: rgb(245, 250, 244);;
  font-size:18px;
  text-align: start;
  margin:1em;
  padding:1em;
}
.post-title{
  padding:0.5em;
  font-size:24px;
  font-weight: bold;
  background-color: rgb(245, 250, 244);
  margin:0.5em 0em
}
.post-content{
  padding:1em;
  overflow-wrap: break-word;
  background-color: rgba(0, 0, 0, 0.062);
}
.post-author{
  font-size:24px;
  color: #42b983;
}
.date {
  color:rgb(208, 214, 213);
  font-size:14px
}
</style>
