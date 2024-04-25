<script>
let id = 0;

export default {
  data() {
    return {
      message: "Nama Kabupaten",
      newTodo: "",
      hideCompleted: false,
      todos: [{ id: id++, text: "Kuantan Singingi", done: false }],
    };
  },
  computed: {
    filteredTodos() {
      return this.hideCompleted
        ? this.todos.filter((t) => !t.done)
        : this.todos;
    },
  },
  methods: {
    addTodo() {
      this.todos.push({ id: id++, text: this.newTodo, done: false });
      this.newTodo = "";
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo);
    },
  },
};
</script>

<template>
  <div class="todo">
    <h3>{{ message }}</h3>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="Masukkan Nama Kabupaten" />
      <button>Tambah</button>
    </form>
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
        <button @click="removeTodo(todo)">X</button>
      </li>
    </ul>
    <button @click="hideCompleted = !hideCompleted" class="btn">
      {{ hideCompleted ? "Show all" : "Hide completed" }}
    </button>
  </div>
</template>
