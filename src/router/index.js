import { createRouter, createWebHistory } from 'vue-router';
import AlbumPhotos from '../components/AlbumPhotos.vue';
import Post from '../components/Post.vue';
import Todo from '../components/Todo.vue';
import Album from '../components/album.vue';


const routes = [
  {
    path: '/album',
    name: 'Album',
    component: Album
  },
  {
    path: '/album/:id/photos',
    name: 'AlbumPhotos',
    component: AlbumPhotos
  },
  {
    path: '/post',
    name: 'Post',
    component: Post
  },
  {
    path: '/todo',
    name: 'Todo',
    component: Todo
  },
  {
    path: '/',
    redirect: '/album'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
