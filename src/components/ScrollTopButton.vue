<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);

// Scroll to top function
const scrollUpBtnClick = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
// Show/hide the button on scroll
const handleScroll = () => {
  isVisible.value = window.scrollY > 100;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>


<template>
    <button
        v-show="isVisible"
        @click="scrollUpBtnClick"
        class="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full shadow-lg transition-opacity duration-500"
    >
    ↑
  </button>
</template>