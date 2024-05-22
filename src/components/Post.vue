<template>
  <div class="Post">
    <div>
      <label for="userSelect">Pilih Pengguna:</label>
      <select v-model="selectedUserId" @change="fetchPosts">
        <option v-for="user in users" :key="user.id" :value="user.id">
          <slot name="user-name" :user="user">
            {{ user.name }}
          </slot>
        </option>
      </select>
    </div>
    <div v-if="posts.length">
      <h3>
        Postingan oleh
        <slot name="user-header" :user="getUser(selectedUserId)">{{
          getUser(selectedUserId).name
        }}</slot>
      </h3>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <slot name="post" :post="post">
            <h4>{{ post.title }}</h4>
            <p>{{ post.body }}</p>
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
    initialPosts: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      posts: this.initialPosts,
      selectedUserId: null,
    };
  },
  methods: {
    fetchPosts() {
      if (this.selectedUserId) {
        fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUserId}`
        )
          .then((response) => response.json())
          .then((data) => {
            this.posts = data;
          });
      }
    },
    getUser(userId) {
      return (
        this.users.find((user) => user.id === userId) || { name: "Unknown" }
      );
    },
  },
};
</script>

<style scoped>
.Post {
  text-align: left;
  margin: 30px;
  color: rgb(252, 251, 251);
}

.about h2 {
  text-align: center;
  color: rgb(252, 251, 251);
}
</style>
