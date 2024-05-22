import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Post from "../components/Post.vue";
import Todo from "../components/Todo.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Post",
    name: "Post",
    component: Post,
  },
  {
    path: "/todo",
    name: "Todo",
    component: Todo,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
