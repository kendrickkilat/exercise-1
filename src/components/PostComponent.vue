<template>
  <div class="posts">
    <!-- <div v-if = "isShown">
      <PostDetails :id = post.id />
    </div> -->
    <!-- <Dialog class = "detail-dialog" v-model:visible="isShown" modal=true>
      <template #header>
        <h3>{{post.title}}</h3>
      </template>
        {{post.content}}
        <template #footer>
          {{readableDate(post.date)}} <br />
        </template>
    </Dialog> -->
    <router-link
      :to="{ name: 'PostDetails', params: { id: post.id } }"
      class="router"
    >
    <!-- <div @click = "showModal()"> -->
      <div class="post-item post-title">
        <!-- {{ post.title }} -->
        <span class="post-author grid-item">
          {{ post.title }}
          <br />
          <span class="date">{{ readableDate(post.date) }}</span>
        </span>
        <div class="action-buttons grid-item">
          <button
            class="delete-button"
            v-on:click.prevent
            @click.self="deleteItem(post.id)"
          >
            X
          </button>
          <!-- <button
            disabled
            class="edit-button"
            v-on:click.prevent
            @click="deleteItem(post.id)"
          >
            Edit
          </button> -->
        </div>
      </div>
      <div class="post-item post-content">
        {{ post.content }}
      </div>
      <!-- </div> -->
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
// import PostService from '@/services/PostService';
import { IPost } from '@/Interfaces/post';
// import posts from '@/localdata/staticdata';
// import PostDetails from '@/components/PostDetailComponent.vue';

export default defineComponent({
  name: 'Post',
  setup(props, context) {
    const isShown = ref(false);

    function deleteItem(id):void {
      console.log(id);
      context.emit('delete-post', id);
    //  posts = posts.find((i) => i.id !== id);
    }

    function readableDate(temp):string {
      console.log(temp);
      const dateTime = new Date(temp);
      const date = `${dateTime.getMonth() + 1}/${dateTime.getDate()}/${dateTime.getFullYear()}`;
      const altTime = dateTime.toLocaleTimeString();
      return `${date} | ${altTime}`;
    }

    function showModal():void {
      isShown.value = true;
    }

    return {
      isShown, deleteItem, readableDate, showModal,
    };
  },
  props: {
    post: {
      type: Object as PropType <IPost>,
      required: true,
    },
  },
});
</script>
<style scoped>

/* .post-item{
   background-color: rgb(232, 253, 230);
} */
.author-icon{
  margin-right:10px;
}
.post-title{
  display:grid;
  grid-template-columns:80% 20%;
  grid-template-rows: 25% 25% 25% 25%;
  padding:0.5em 0;
  font-size:24px;
  font-weight: bold;
}
.grid-item{
  justify-self:end;
  align-self:center;
}
.post-content{
  display:-webkit-box;
  padding:1em;
  overflow:hidden;
  height:125px;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  background-color: rgba(0, 0, 0, 0.062);
}
.post-author{
  justify-self:start;
  font-size:18px;
  color: #42b983;
}
.delete-button{
  margin:0;
  z-index:2;
  font-size:18px;
  float:right;
  align-content: center;
  width:50px;
  color:#42b983;
  /* background-color: rgb(238, 51, 51); */
  padding:5px;
  background-color:unset;
}
.edit-button{
  margin:0;
  z-index:2;
  font-size:18px;
  float:right;
  width:100px;
  color:white;
  padding:5px;
  margin: 0 5px;
}
.author-icon{
  justify-self:center;
}
 .delete-button:hover{
  color:white;
  background-color: rgb(255, 147, 147)
}
.date {
  color:rgb(154, 175, 172);
  font-size:14px
}
.p-dialog{
  min-width:700px;
}
</style>
