<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: Number,
  lastPage: Number,
});

const emit = defineEmits(['change-page']);

// Generate pagination links with truncation (like Laravel)
const paginationLinks = computed(() => {
  const pages = [];
  const total = props.lastPage;
  const current = props.currentPage;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    if (current <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', total);
    } else if (current >= total - 3) {
      pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
    } else {
      pages.push(1, '...', current - 1, current, current + 1, '...', total);
    }
  }

  return pages;
});

const handleClick = (page) => {
  if (page !== '...') emit('change-page', page);
};
</script>

<template>
  <!-- Desktop View -->
  <div class="hidden sm:flex justify-center items-center space-x-2 mt-6">
    <button
      :disabled="currentPage === 1"
      @click="$emit('change-page', currentPage - 1)"
      class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
    >
      Previous
    </button>

    <button
      v-for="(page, index) in paginationLinks"
      :key="index"
      @click="handleClick(page)"
      :class="[
        'px-3 py-1 rounded',
        page === currentPage ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300',
        page === '...' ? 'cursor-default' : ''
      ]"
      :disabled="page === '...'"
    >
      {{ page }}
    </button>

    <button
      :disabled="currentPage === lastPage"
      @click="$emit('change-page', currentPage + 1)"
      class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
    >
      Next
    </button>
  </div>

  <!-- Mobile View -->
  <div class="flex sm:hidden justify-center items-center space-x-2 mt-6">
    <button
      :disabled="currentPage === 1"
      @click="$emit('change-page', currentPage - 1)"
      class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
    >
      Previous
    </button>

    <button
      :disabled="currentPage === lastPage"
      @click="$emit('change-page', currentPage + 1)"
      class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>
