import { IPost } from '@/Interfaces/post';
import { ref } from 'vue';

const staticData:IPost[] = [
  {
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga officiis, quibusdam adipisci voluptas repudiandae doloribus quos! Alias aut, ratione officia eius expedita ex sint aliquam ducimus quam neque ab incidunt distinctio hic. Praesentium, nulla. Suscipit nostrum incidunt neque sequi! Sint minus eum, non impedit eveniet possimus natus quibusdam. Delectus, necessitatibus! Obcaecati, dignissimos exercitationem quod aliquid earum modi perspiciatis, voluptate excepturi a autem, ad voluptatem possimus asperiores veniam ex porro dolorum velit. Impedit, sequi quaerat. Cumque possimus optio voluptatibus et eligendi harum corrupti laboriosam amet necessitatibus dicta, inventore laudantium consequuntur alias. Eveniet, aut magnam deleniti quo incidunt ex ducimus distinctio consectetur?',
    title: 'Lorem Ipsum Title from Store',
    author: 'Kendrick Kilat',
    date: 1623584041048,
    id: 1,
  },
];

export default function useStore() {
  const posts = ref<IPost[]>(staticData);
  return {
    posts,
  };
}
