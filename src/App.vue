<script setup>
import NavBar from '@/components/NavBar.vue';
import { RouterView } from 'vue-router';
import ScrollTopButton from './components/ScrollTopButton.vue';


</script>

<template>
  <NavBar/>
  <RouterView/>
  <ScrollTopButton/>
</template>