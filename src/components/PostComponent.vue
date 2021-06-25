<template>
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
  <!-- <router-link :to="toPostDetails" class="router"> -->
  <!-- <div @click = "showModal()"> -->
  <Card>
    <template #title>
      <div class="p-grid p-fluid">
        <span v-if="!editMode" class="p-col">{{ post.title }}</span>
        <InputText
          v-if="editMode"
          v-model="title"
          placeholder="Title"
          v-on:click.prevent
          class="p-col"
        ></InputText>
        <Button
          id ="fixed-btn"
          label="Delete"
          icon="pi pi-trash"
          class="p-button-danger p-button-text p-mr-2 p-mb-2 p-col-fixed"
          v-on:click.prevent
          @click="deletePost(post.id)"
        ></Button>
      </div>
    </template>
    <template #subtitle>by {{ post.author }} - {{ formatDate(post.date) }}</template>
    <template #content>
      <div class="p-grid p-fluid">
        <TextArea
          v-if="editMode"
          v-model="content"
          rows="4"
          placeholder="Whats on your mind"
          v-on:click.prevent
        ></TextArea>
      </div>
      <span v-if="!editMode">{{ post.content }}</span>
    </template>
    <template #footer>
      <span v-if="editMode">
        <Button
          label="Save"
          icon="pi pi-save"
          class="p-button-info p-button-text p-mr-2 p-mb-2"
          v-on:click.prevent
          @click="edit(post.id)"
        ></Button>
        <Button
          label="Cancel"
          icon="pi pi-exclamation-circle"
          class="p-button-warning p-button-text p-mr-2 p-mb-2"
          v-on:click.prevent
          @click="toggleEditMode(post.id)"
        ></Button>
      </span>
      <span v-if="!editMode">
        <Button
          label="Edit"
          icon="pi pi-pencil"
          class = "p-button-text p-mr-2 p-mb-2"
          v-on:click.prevent
          @click="toggleEditMode(post.id)"
        ></Button>
      </span>
      <Button
          id="fixed-btn"
          icon="pi pi-eye"
          class="p-button-info p-button-text p-mr-2 p-mb-2"
          v-on:click.prevent
          label="View"
          @click="navToPDetails"
        ></Button>
    </template>
  </Card>
  <!-- </div> -->
  <!-- </router-link> -->
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
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import TextArea from 'primevue/textarea';
import router from '@/router';

export default defineComponent({
  name: 'Post',
  components: {
    Card,
    InputText,
    TextArea,
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
    function navToPDetails() {
      router.push({ name: rn.PDetails, params: { id: props.post.id } });
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
      navToPDetails,
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

.p-card-content {
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

.cancel-button:hover {
  color: white;
  background-color: rgb(255, 147, 147);
}

.cancel-button {
  width: 70px;
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
#content {
  width: 90%;
  border: none;
  font-size: 18px;
  padding: 1em;
  color: black;
  outline: none;
  resize: none;
  background-color: rgba(54, 55, 54, 0.11);
}

#content {
  height: 10em;
}

#fixed-btn {
  width: 100px;
}
</style>
