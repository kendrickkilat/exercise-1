<template>
  <div v-if="post" class="post">
    <router-link class="router" :to="goToNewsFeed">
      <Button
      label=" Back to Newsfeed"
      icon="pi pi-arrow-left"
      class = "p-button-text p-mr-2 p-mb-2"/>
    </router-link>

    <Card>
      <template #title>
        <span v-if="!editMode">{{ post.title }}</span>
        <div class="p-grid p-fluid">
            <InputText v-if="editMode"
            v-model="title"
            placeholder="Title"
            ></InputText>
        </div>
      </template>

      <template #subtitle>
        by {{ post.author }} - {{ formatDate(post.date) }}
      </template>
      <template #content>
        <span v-if="!editMode">{{ post.content }}</span>
        <div class="p-grid p-fluid">
          <TextArea v-if="editMode"
            v-model="content"
            rows="4"
            placeholder="Whats on your mind"
           >
          </TextArea>
        </div>
      </template>

      <template #footer>
        <span v-if="editMode">
          <Button label="Save"
          icon="pi pi-save"
          class = "p-button-info p-button-text p-mr-2 p-mb-2"
          @click="triggerEditPost(post.id)" />

          <Button label="Cancel"
          icon="pi pi-exclamation-circle"
          class = "p-button-warning p-button-text p-mr-2 p-mb-2"
          @click="toggleEditMode(post.id)"/>
        </span>

        <span v-if="!editMode">
          <Button label="Edit"
          icon="pi pi-pencil"
          class = "p-button-text p-mr-2 p-mb-2"
          @click="toggleEditMode(post.id)" />
        </span>

        <Button label="Delete"
        icon="pi pi-trash"
        class = "p-button-danger p-button-text p-mr-2 p-mb-2"
        @click="triggerDeletePost(post.id)" />
      </template>

    </Card>
  </div>
  <div v-else>
    <Error404></Error404>
  </div>
</template>
<script lang="ts">
import {
  computed, defineComponent, ref,
} from 'vue';
import { IPost } from '@/Interfaces/post';
import rn from '@/enums/routenames';
import usePostSpace from '@/composables/use-post-space';
import formatDate from '@/composables/use-date-formatter';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import TextArea from 'primevue/textarea';
import router from '@/router';
import Error404 from '@/views/Error404.vue';
import useToastSpace from '@/composables/use-toast';

export default defineComponent({
  name: 'PostDetails',
  components: {
    Card,
    InputText,
    TextArea,
    Error404,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { instantiateToast } = useToastSpace();
    const editMode = ref(false);
    const goToNewsFeed = computed(() => ({ name: rn.Newsfeed }));
    const {
      findPost, editPost, populateEditFields, deletePost, title, content,
    } = usePostSpace();
    const post = ref<IPost>(findPost(props.id));

    // post.value = findPost(props.id);

    function toggleEditMode(id:number) {
      editMode.value = !editMode.value;
      const result = populateEditFields(id);
      console.log('populateFields successful', result);
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

    function triggerDeletePost(id:number) {
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
      post,
      goToNewsFeed,
      findPost,
      formatDate,
      editMode,
      toggleEditMode,
      editPost,
      deletePost,
      triggerEditPost,
      title,
      content,
      triggerDeletePost,
    };
  },
});
</script>
<style scoped>
.post {
  font-size: 18px;
  text-align: start;
  margin: 1em;
  padding: 1em;
}
.date {
  color: rgb(208, 214, 213);
  font-size: 14px;
}
</style>
