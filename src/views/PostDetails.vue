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
          @click="toggleEditMode()"/>
        </span>

        <span v-if="!editMode">
          <Button label="Edit"
          icon="pi pi-pencil"
          class = "p-button-text p-mr-2 p-mb-2"
          @click="toggleEditMode()" />
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
// import { IPost } from '@/Interfaces/post';
import rn from '@/enums/routenames';
import usePost from '@/composables/use-post';
import formatDate from '@/composables/use-date-formatter';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import TextArea from 'primevue/textarea';
import router from '@/router';
import Error404 from '@/views/Error404.vue';
import useToastSpace from '@/composables/use-toast';
import { IToast } from '@/Interfaces/toast';

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
      findItem, edit, remove, title, content,
    } = usePost();

    const post = findItem(props.id);

    function toggleEditMode() {
      editMode.value = !editMode.value;
      title.value = post.title;
      content.value = post.content;
    }

    function triggerEditPost(id:number) {
      const result = edit(id);
      let msg = {} as IToast;
      if (result) {
        msg = {
          severity: 'success', summary: 'Success!', detail: 'Post Successfully Updated', life: 3000,
        };
      }
      instantiateToast(msg);
      toggleEditMode();
    }

    function triggerDeletePost(id:number) {
      let msg = {} as IToast;
      const result = remove(id);
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
      findItem,
      formatDate,
      editMode,
      toggleEditMode,
      edit,
      remove,
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
