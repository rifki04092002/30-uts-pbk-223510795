import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Post from "../views/Post.vue";
import Todo from "../views/Todo.vue";

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
