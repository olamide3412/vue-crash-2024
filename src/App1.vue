<script>
export default {
  data() {
    return {
      name: 'Ola Tech',
      status: false,
      tasks: ['Task One', 'Task Two', 'Task Three'],
      link: 'https://www.google.com',
    };
  },
  methods: {
    toggleStatus() {
      this.status = !this.status;
    }
  }
}
</script>

<template>
  <h1>{{ name }}</h1>
  <p v-if="status">User is active</p>
  <p v-else="status">User is inactive</p>

  <h3>Tasks:</h3>
  <ul>
    <li v-for="task in tasks" :key="task">{{ task }}</li>
  </ul>

  <a v-bind:href="link">Google</a>

  <button @click="toggleStatus">Change Status</button>

</template>

<style>
  h1{
    color: yellowgreen;
  }
</style>