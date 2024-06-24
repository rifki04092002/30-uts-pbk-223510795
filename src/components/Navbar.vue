<template>
  <div id="nav" class="navbar">
    <h1>TUGAS VUE</h1>
    <ul>
      <li>
        <router-link to="/album" active-class="active-link">
          Album
        </router-link>
      </li>
      <li>
        <router-link to="/post" active-class="active-link">
          Post
        </router-link>
      </li>
      <li>
        <router-link to="/todo" active-class="active-link">
          Todo List
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
};
</script>

<style scoped>
#nav {
  padding: 20px;
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#nav h1 {
  margin: 0;
  font-size: 24px;
}

#nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

#nav li {
  margin-right: 20px;
}

#nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
  padding: 10px;
  transition: background-color 0.3s ease;
}

#nav a:hover {
  background-color: #555;
  border-radius: 5px;
}

.active-link {
  background-color: crimson;
  border-radius: 5px;
}

</style>
