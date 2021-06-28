import { ref } from 'vue';
// import staticPosts from '@/localdata/staticdata';
import { IPost } from '@/Interfaces/post';
import useStore from '@/composables/use-store';

export default function usePostSpace() {
  const { posts } = useStore();
  // const posts = ref<IPost[]>(staticData);
  const title = ref('');
  const content = ref('');

  function findPost(id: number): IPost {
    return posts.value.find((item) => {
      console.log(item.id, Number(id));
      return item.id === Number(id);
    }) as IPost;
  }

  function findPostIndex(id:number):number|string {
    let results:number|string = 'not-found';

    posts.value.forEach((item, index) => {
      console.log(item, index);
      if (item.id === id) {
        results = index;
      }
    });
    return results;
  }

  function deletePost(value: number): boolean {
    console.log('emit2: ', value, posts.value);
    const index = findPostIndex(value);

    let result = false;
    if (typeof (index) === 'number') {
      posts.value.splice(index, 1);
      result = true;
    }
    return result;
  }

  function addPost(): boolean {
    const len = posts.value.length;
    let result = false;

    const item = {
      content: content.value,
      title: title.value,
      author: 'Kendrick Kilat',
      date: Date.now(),
      id: len === 0 ? len : len + 1,
    } as IPost;

    if (title.value !== '' && content.value !== '') {
      console.log('posts:length: ', posts.value.length);
      posts.value.unshift(item);
      result = true;
    }
    title.value = '';
    content.value = '';
    return result;
  }

  function populateEditFields(id:number):IPost {
    const result = findPost(id);
    title.value = result.title;
    content.value = result.content;
    return result;
  }

  function editPost(id: number): string {
    console.log('editPost entered', id, title.value);
    let result = 'error';
    if (title.value !== '' && content.value !== '') {
      posts.value.forEach((item, index) => {
        console.log(item, index);
        if (item.id === id) {
          const temp = item;
          if (temp.title === title.value && temp.content === content.value) {
            result = 'no-change';
          } else {
            temp.title = title.value;
            temp.content = content.value;

            posts.value.splice(index, 1, temp);
            result = 'success';
          }
        }
        console.log(posts.value);
      });
    }
    return result;
  }

  return {
    posts,
    addPost,
    deletePost,
    title,
    content,
    findPost,
    editPost,
    populateEditFields,
  };
}
