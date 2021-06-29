import { ref } from 'vue';
import { IPost } from '@/Interfaces/post';
import useStore from '@/composables/use-store';

export default function usePost() {
  const { posts } = useStore();
  const title = ref('');
  const content = ref('');

  function findItem(id: number): IPost {
    return posts.value.find((item) => item.id === Number(id)) as IPost;
  }

  function findIndex(id:number):number {
    let results = -1;

    posts.value.forEach((item, index) => {
      if (item.id === id) {
        results = index;
      }
    });
    return results;
  }

  function remove(value: number): boolean {
    const index = findIndex(value);

    let result = false;
    if (index >= 0) {
      posts.value.splice(index, 1);
      result = true;
    }
    return result;
  }

  function add(): boolean {
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
      posts.value.unshift(item);
      result = true;
    }
    title.value = '';
    content.value = '';
    return result;
  }

  function edit(id: number):IPost {
    const temp = findItem(id);
    const index = findIndex(id);
    if (title.value !== '' && content.value !== '') {
      temp.title = title.value;
      temp.content = content.value;
      posts.value.splice(index, 1, temp);
    }
    return temp;
  }

  return {
    posts,
    add,
    remove,
    title,
    content,
    findItem,
    edit,
  };
}
