<script setup>
import { ref, onMounted } from 'vue';

    const name = ref('Ola tech');
    const status = ref('active');
    const tasks = ref( ['Task One', 'Task Two', 'Task Three']);
    const newTask = ref('');

    const addTask = () => {
      if(newTask.value.trim() !== ''){
        tasks.value.push(newTask.value);
        newTask.value = '';
      }
    };

    const  toggleStatus = () => {
      status.value = !status.value;
    };

    const deleteTask = (index) => {
      tasks.value.splice(index, 1);
    };

    onMounted(async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        tasks.value = data.map((task) => task.title);
      } catch (error) {
        console.log('Error fetching task');
      }
    });

</script>

<template>
  <h1>{{ name }}</h1>
  <p v-if="status">User is active</p>
  <p v-else="status">User is inactive</p>

  <form @submit.prevent="addTask">
    <label for="newTask">Add Task</label>
    <input type="text" id="newTask" name="newTask" v-model="newTask">
    <button type="submit">Add Task</button>
  </form>

  <h3>Tasks:</h3>
  <ul>
    <li v-for="(task, index) in tasks" :key="task">
      <span>
        {{ task }}
      </span>
      <button @click="deleteTask(index)">X</button>
    </li>
  </ul>


  <button @click="toggleStatus">Change Status</button>


</template>

<style>
  h1{
    color: yellowgreen;
  }
</style>