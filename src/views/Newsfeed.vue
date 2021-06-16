/* eslint-disable @typescript-eslint/no-non-null-assertion */
<template>
  <div class="newsfeed">
    <!-- <Toast></Toast> -->
    <!-- INPUT FIELDS -->
    <div class="input-field">
      <input id="title" v-model="title" placeholder="Title" />
      <br />
      <textarea id="content" v-model="content" placeholder="What's on your mind?"></textarea>
      <br />
      <button class="submit-button" @click="post">SUBMIT</button>
    </div>
    <!-- LIST -->
    <hr class="divider" />
    <div v-if="posts == null || posts.length == 0" class="message">No Posts...yet</div>
    <div class="posts">
      <div v-for="post in posts" v-bind:key="post.id" class="post">
        <Post :post="post" @delete-post="deletePost" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
// import PostField from '@/components/PostFieldComponent.vue'; // @ is an alias to /src
import Post from '@/components/PostComponent.vue';
// import PostService from '@/services/PostService';
import { IPost } from '@/Interfaces/post';
import { useToast } from 'primevue/usetoast';
// import Toast from 'primevue/toast';
import staticPosts from '@/localdata/staticdata';

export default defineComponent({
  // inject: ['localPosts'],
  name: 'Home',
  components: {
    // PostField,
    Post,
    // Toast,
  },
  setup() {
    const toast = useToast();
    const title = ref('');
    const content = ref('');
    const posts = ref<IPost[]>(staticPosts);

    function deletePost(value): void {
      console.log('emit: ', value, posts.value);
      posts.value.forEach((item, index) => {
        console.log(item, index);
        if (item.id === value) {
          console.log('id', item.id, 'item index', index, 'value: ', value);
          posts.value.splice(index, 1);
        }
        console.log(posts.value);
      });
    }

    function instantiateToast(data): void {
      toast.add(data);
    }

    function post(): void {
      let msg = {};
      if (title.value === '' || content.value === '') {
        msg = {
          severity: 'error', summary: 'Error while Submitting Form', detail: 'Title and/or Content is empty', life: 3000,
        };
      } else {
        console.log('posts:length: ', posts.value.length);
        const len = posts.value.length;
        const test = {
          content: content.value,
          title: title.value,
          author: 'Kendrick Kilat',
          date: Date.now(),
          id: len === 0 ? len : len + 1,
        };
        posts.value.unshift(test);
        title.value = '';
        content.value = '';

        msg = {
          severity: 'success', summary: 'Post Succesfully Added!', detail: `${title.value} Successfully Added`, life: 3000,
        };
      }
      instantiateToast(msg);
    }
    return {
      title, content, posts, post, instantiateToast, deletePost,
    };
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
