<template>
  <Card>
    <template #title>
      <div class="p-grid p-fluid">
        <span v-if="!editMode" class="p-col">{{ post.title }}</span>
        <InputText
          v-if="editMode"
          v-model="title"
          placeholder="Title"
          class="p-col"
        ></InputText>
        <Button
          id ="fixed-btn"
          label="Delete"
          icon="pi pi-trash"
          class="p-button-danger p-button-text p-mr-2 p-mb-2 p-col-fixed"
          @click="triggerDeletePost(post.id)"
        />
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
          @click="triggerEditPost(post.id)"
        />
        <Button
          label="Cancel"
          icon="pi pi-exclamation-circle"
          class="p-button-warning p-button-text p-mr-2 p-mb-2"
          @click="toggleEditMode(post.id)"
        />
      </span>
      <span v-if="!editMode">
        <Button
          label="Edit"
          icon="pi pi-pencil"
          class = "p-button-text p-mr-2 p-mb-2"
          @click="toggleEditMode(post.id)"
        />
      </span>
      <Button
          id="fixed-btn"
          icon="pi pi-eye"
          class="p-button-info p-button-text p-mr-2 p-mb-2"
          label="View"
          @click="goToPostDetails"
        />
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
import usePostSpace from '@/composables/use-post-space';
import formatDate from '@/composables/use-date-formatter';
import rn from '@/enums/routenames';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import TextArea from 'primevue/textarea';
import router from '@/router';
import useToastSpace from '@/composables/use-toast';

export default defineComponent({
  name: 'Post',
  components: {
    Card,
    InputText,
    TextArea,
  },
  setup(props) {
    const { instantiateToast } = useToastSpace();
    const toPostDetails = computed(() => ({ name: rn.PDetails, params: { id: props.post.id } }));
    const {
      deletePost, populateEditFields, title, content, editPost,
    } = usePostSpace();
    const editMode = ref(false);

    function toggleEditMode(id:number) {
      editMode.value = !editMode.value;
      populateEditFields(id); //  cause no mutating props
    }

    function triggerEditPost(id:number) {
      const result = editPost(id);
      let msg = {};
      switch (result) {
        case 'no-change':
          msg = {
            severity: 'info', summary: 'Updating Form was not processed', detail: 'No change has been detected', life: 3000,
          };
          break;
        case 'error':
          msg = {
            severity: 'error', summary: 'Error Updating Post', detail: 'Title and/or Content is empty', life: 3000,
          }; break;
        case 'success':
          msg = {
            severity: 'success', summary: 'Success!', detail: 'Post Successfully Updated', life: 3000,
          };
          break;
        default: break;
      }
      instantiateToast(msg);
      toggleEditMode(id);
    }

    function goToPostDetails() {
      router.push({ name: rn.PDetails, params: { id: props.post.id } });
    }

    function triggerDeletePost(id) {
      let msg = {};
      const result = deletePost(id);
      if (result) {
        msg = {
          severity: 'success', summary: 'Success!', detail: 'Post has successfully deleted', life: 3000,
        };
      } else {
        msg = {
          severity: 'error', summary: 'Error in Deleting Post', detail: 'Post not found', life: 3000,
        };
      }

      instantiateToast(msg);
      router.push({ name: rn.Newsfeed });
    }

    return {
      triggerEditPost,
      triggerDeletePost,
      toPostDetails,
      editPost,
      title,
      toggleEditMode,
      editMode,
      content,
      formatDate,
      goToPostDetails,
    };
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
