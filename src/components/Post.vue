<template>
  <div class="post-container">
    <div class="user-select-container">
      <label for="userSelect">Pilih Pengguna:</label>
      <select id="userSelect" v-model="selectedUserId" @change="fetchPosts" class="user-select">
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
    </div>
    <div v-if="posts.length" class="posts-container">
      <h3 class="posts-title">Postingan oleh {{ getUser(selectedUserId).name }}</h3>
      <ul class="posts-list">
        <li v-for="post in posts" :key="post.id" class="post-item">
          <h4 class="post-title">{{ post.title }}</h4>
          <p class="post-body">{{ post.body }}</p>
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
  methods: {
    fetchUsers() {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => {
          this.users = data;
          if (this.users.length > 0) {
            this.selectedUserId = this.users[0].id;
            this.fetchPosts();
          }
        });
    },
    fetchPosts() {
      if (this.selectedUserId !== null) {
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
  watch: {
    selectedUserId() {
      this.fetchPosts();
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.post-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.user-select-container {
  margin-bottom: 20px;
}

label {
  margin-right: 10px;
  font-weight: bold;
}

.user-select {
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.posts-container {
  margin-top: 20px;
}

.posts-title {
  font-size: 1.5em;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.posts-list {
  list-style: none;
  padding: 0;
}

.post-item {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.post-item:hover {
  transform: scale(1.02);
}

.post-title {
  margin: 0;
  font-size: 1.2em;
  color: #555;
}

.post-body {
  margin: 10px 0 0;
  font-size: 1em;
  color: #666;
}
</style>
