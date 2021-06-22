import { ref } from 'vue';
import staticPosts from '@/localdata/staticdata';
import { IPost } from '@/Interfaces/post';
import useToastSpace from '@/use/toast-space';

export default function usePostSpace() {
  const posts = ref<IPost[]>(staticPosts);
  const title = ref('');
  const content = ref('');
  const { instantiateToast } = useToastSpace();

  function deletePost(value): void {
    console.log('emit2: ', value, posts.value);
    posts.value.forEach((item, index) => {
      console.log(item, index);
      if (item.id === value) {
        console.log('id', item.id, 'item index', index, 'value: ', value);
        posts.value.splice(index, 1);
        const msg = {
          severity: 'error', summary: 'Post Succesfully Deleted!', detail: `${item.title} Successfully Deleted`, life: 3000,
        };
        instantiateToast(msg);
      }
      console.log(posts.value);
    });
  }

  function addPost(): void {
    let msg = {};
    if (title.value === '' || content.value === '') {
      msg = {
        severity: 'error', summary: 'Error while Submitting Form', detail: 'Title and/or Content is empty', life: 3000,
      };
    } else {
      console.log('posts:length: ', posts.value.length);
      const len = posts.value.length;
      const item = {
        content: content.value,
        title: title.value,
        author: 'Kendrick Kilat',
        date: Date.now(),
        id: len === 0 ? len : len + 1,
      };
      posts.value.unshift(item);
      msg = {
        severity: 'success', summary: 'Post Succesfully Added!', detail: `${title.value} Successfully Added`, life: 3000,
      };
    }
    title.value = '';
    content.value = '';
    instantiateToast(msg);
  }

  function findPost(props): IPost {
    return staticPosts.find((item) => {
      console.log(item.id, Number(props.id));
      return item.id === Number(props.id);
    }) as IPost;
  }

  function setInputs(value) {
    posts.value.forEach((item, index) => {
      console.log(item, index);
      if (item.id === value) {
        console.log('id', item.id, 'item index', index, 'value: ', value);
        title.value = item.title;
        content.value = item.content;
        // posts.value.splice(index, 0, item);
        console.log('title: ', title.value);
      }
      console.log(posts.value);
    });
  }

  function editPost(id) {
    console.log('editPost entered', id, title.value);
    let msg = {};
    if (title.value === '' || content.value === '') {
      msg = {
        severity: 'error', summary: 'Error while Updating Form', detail: 'Title and/or Content is empty', life: 3000,
      };
    } else {
      posts.value.forEach((item, index) => {
        console.log(item, index);
        if (item.id === id) {
          const temp = item;
          if (temp.title === title.value && temp.content === content.value) {
            msg = {
              severity: 'info', summary: 'Updating Form was not processed', detail: 'No change has been detected', life: 3000,
            };
          } else {
            temp.title = title.value;
            temp.content = content.value;

            posts.value.splice(index, 1, temp);
            msg = {
              severity: 'success', summary: 'Post Succesfully Updated!', detail: `${title.value} Successfully Updated`, life: 3000,
            };
          }
        }
        console.log(posts.value);
      });
    }
    instantiateToast(msg);
  }

  return {
    posts,
    addPost,
    instantiateToast,
    deletePost,
    title,
    content,
    findPost,
    editPost,
    setInputs,
  };
}
