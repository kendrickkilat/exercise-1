<template>
  <div class="posts">
    <!-- <div v-if = "isShown">
      <PostDetails :id = post.id />
    </div>-->
    <!-- <Dialog class = "detail-dialog" v-model:visible="isShown" modal=true>
      <template #header>
        <h3>{{post.title}}</h3>
      </template>
        {{post.content}}
        <template #footer>
          {{readableDate(post.date)}} <br />
        </template>
    </Dialog>-->
    <router-link :to="toPostDetails" class="router">
      <!-- <div @click = "showModal()"> -->
      <div class="post-item post-title">
        <!-- {{ post.title }} -->
        <span v-if="!editMode" class="post-author grid-item">
          {{ post.title }}
          <br />
          <span class="date">{{ formatDate(post.date) }}</span>
        </span>
        <input v-if="editMode" id="title" v-model="title" placeholder="Title" v-on:click.prevent />
        <div class="action-buttons grid-item">
          <button class="delete-button"
          v-on:click.prevent
          @click.self="deletePost(post.id)">X</button>

          <button v-if="!editMode" class="edit-button"
          v-on:click.prevent
          @click.self="toggleEditMode(post.id)">
          Edit
          </button>

          <button v-if="editMode" class="cancel-button"
          v-on:click.prevent
          @click.self="toggleEditMode(post.id)">
          Cancel
        </button>

        <button v-if="editMode" class="edit-button"
          v-on:click.prevent
          @click.self="edit(post.id)">
          Save
          </button>

        </div>
      </div>
      <textarea v-if="editMode" id="content"
      v-model="content" placeholder="What's on your mind?" v-on:click.prevent></textarea>
      <div v-if = "!editMode" class="post-item post-content">{{ post.content }}</div>
      <!-- </div> -->
    </router-link>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, PropType, ref,
} from 'vue';
// import PostService from '@/services/PostService';
import { IPost } from '@/Interfaces/post';
import usePostSpace from '@/use/post-space';
import formatDate from '@/use/use-date-formatter';
import rn from '@/enums/routenames';

export default defineComponent({
  name: 'Post',
  components: {
  },
  setup(props) {
    const toPostDetails = computed(() => ({ name: rn.PDetails, params: { id: props.post.id } }));
    const {
      deletePost, setInputs, title, content, editPost,
    } = usePostSpace();
    const editMode = ref(false);

    function toggleEditMode(id) {
      editMode.value = !editMode.value;
      setInputs(id); //  cause no mutating props
    }
    function edit(id) {
      editPost(id);
      toggleEditMode(id);
    }

    return {
      edit,
      deletePost,
      toPostDetails,
      editPost,
      title,
      toggleEditMode,
      editMode,
      content,
      formatDate,
    };
    // for dialog box when needed
    // const isShown = ref(false);
    // function showModal():void {
    //   isShown.value = true;
    // }

    // return {
    //   isShown, deleteItem, readableDate, showModal, toPostDetails,
    // };
  },
  props: {
    post: {
      type: Object as PropType<IPost>,
      required: true,
    },
  },
});
</script>
<style scoped>
/* .post-item{
   background-color: rgb(232, 253, 230);
} */
.author-icon {
  margin-right: 10px;
}
.post-title {
  display: grid;
  grid-template-columns: 70% 30%;
  grid-template-rows: 25% 25% 25% 25%;
  padding: 0.5em 0;
  font-size: 24px;
  font-weight: bold;
}
.grid-item {
  justify-self: end;
  /* align-self: center; */
}
.post-content {
  display: -webkit-box;
  padding: 1em;
  overflow: hidden;
  height: 125px;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  background-color: rgba(0, 0, 0, 0.062);
}
.post-author {
  justify-self: start;
  font-size: 18px;
  color: #42b983;
}
.delete-button {
  margin: 0;
  z-index: 2;
  font-size: 18px;
  float: right;
  align-content: center;
  width: 50px;
  color: #42b983;
  /* background-color: rgb(238, 51, 51); */
  padding: 5px;
  background-color: unset;
}
.cancel-button,
.edit-button {
  margin: 0;
  z-index: 2;
  font-size: 18px;
  float: right;
  align-content: center;
  width: 50px;
  color: #42b983;
  /* background-color: rgb(238, 51, 51); */
  padding: 5px;
  background-color: unset;
}

.edit-button:hover {
  color: white;
  background-color: #42b983;
}

.cancel-button:hover{
  color:white;
  background-color: rgb(255, 147, 147);
}

.cancel-button{
  width:70px;
  color: rgb(255, 147, 147);
}
.author-icon {
  justify-self: center;
}
.delete-button:hover {
  color: white;
  background-color: rgb(255, 147, 147);
}
.date {
  color: rgb(154, 175, 172);
  font-size: 14px;
}
.p-dialog {
  min-width: 700px;
}
#title,
#content{
  width: 90%;
  border: none;
  font-size: 18px;
  padding: 1em;
  color: black;
  outline: none;
  resize: none;
}

#content{
  height: 10em;
}
</style>
