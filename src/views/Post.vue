<template>
  <div class="Post">
    <div>
      <label for="userSelect">Pilih Pengguna:</label>
      <select v-model="selectedUserId" @change="fetchPosts">
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
    </div>
    <div v-if="posts.length">
      <h3>Postingan oleh {{ getUserName(selectedUserId) }}</h3>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <h4>{{ post.title }}</h4>
          <p>{{ post.body }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      posts: [],
      selectedUserId: null,
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => {
          this.users = data;
        });
    },
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
    getUserName(userId) {
      const user = this.users.find((user) => user.id === userId);
      return user ? user.name : "Unknown";
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
