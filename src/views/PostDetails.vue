<template>
  <div v-if="post" class="post">
    <router-link class="router" :to="toNewsFeed">
      <Button label="Back to Newsfeed" icon="pi pi-arrow-left"></Button>
    </router-link>
    <Card>
      <template #title><span v-if="!editMode">{{ post.title }}</span>
        <div class="p-grid p-fluid">
            <InputText v-if="editMode"
            v-model="title" placeholder="Title" v-on:click.prevent></InputText>
        </div>
      </template>
      <template #subtitle>by {{ post.author }} - {{ formatDate(post.date) }}</template>
      <template #content><span v-if="!editMode">{{ post.content }}</span>
        <div class="p-grid p-fluid">
          <TextArea v-if="editMode" v-model="content" rows="4" placeholder="Whats on your mind"
          v-on:click.prevent></TextArea>
        </div>
      </template>
      <template #footer>
        <span v-if="editMode">
          <Button label="Save" icon="pi pi-save" class = "p-button-info"
          v-on:click.prevent @click="edit(post?.id)"></Button>
          <Button label="Cancel" icon="pi pi-exclamation-circle"
          class = "p-button-warning"
          v-on:click.prevent
          @click="toggleEditMode(post?.id)"></Button>
        </span>
        <span v-if="!editMode">
          <Button label="Edit" icon="pi pi-pencil"
          v-on:click.prevent
          @click="toggleEditMode(post?.id)"></Button>
        </span>
        <Button label="Delete" icon="pi pi-trash" class = "p-button-danger"
        v-on:click.prevent
        @click="del(post?.id)"></Button>
      </template>
    </Card>
  </div>
</template>
<script lang="ts">
import {
  computed, defineComponent, PropType, ref,
} from 'vue';
// import PostService from '@/services/PostService';
import { IPost } from '@/Interfaces/post';
import rn from '@/enums/routenames';
import usePostSpace from '@/use/post-space';
import formatDate from '@/use/use-date-formatter';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import TextArea from 'primevue/textarea';
import router from '@/router';

export default defineComponent({
  name: 'PostDetails',
  components: {
    Card,
    InputText,
    TextArea,
  },
  props: {
    id: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  setup(props) {
    const editMode = ref(false);
    const post = ref<IPost>();
    const toNewsFeed = computed(() => ({ name: rn.Newsfeed }));
    const {
      findPost, editPost, setInputs, deletePost, title, content,
    } = usePostSpace();

    function toggleEditMode(id) {
      editMode.value = !editMode.value;
      setInputs(id);
    }

    function edit(id) {
      editPost(id);
      toggleEditMode(id);
    }

    function del(id) {
      deletePost(id);
      router.back();
    }

    post.value = findPost(props);
    return {
      post,
      toNewsFeed,
      findPost,
      formatDate,
      editMode,
      toggleEditMode,
      editPost,
      setInputs,
      deletePost,
      edit,
      title,
      content,
      del,
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
.p-card-body .p-card-title {
  font-size: 24px;
  color: #42b983 !important;
}
.date {
  color: rgb(208, 214, 213);
  font-size: 14px;
}
</style>
