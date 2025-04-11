<script setup>
import { ref } from 'vue';
import CompanyAdd from '@/components/company/CompanyAdd.vue';
import CompanyListings from '@/components/company/CompanyListings.vue';

// State to track the active tab
const activeTab = ref('listings'); // Default to "Company Listings"
const handleChaneActiveTab = (tabName = 'listings') => {
    activeTab.value = tabName;
}
</script>

<template>
  <div class="container-xl lg:container m-auto  bg-gray-100 rounded-lg shadow-md p-6">
    <!-- Tab Buttons -->
    <div class="flex space-x-2 mb-4">
      <button
        :class="[
          'w-full py-2 px-4 text-sm font-medium rounded-full transition-colors',
          activeTab === 'listings'
            ? 'bg-green-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        ]"
        @click="activeTab = 'listings'"
      >
        Company Listings
      </button>
      <button
        :class="[
          'w-full py-2 px-4 text-sm font-medium rounded-full transition-colors',
          activeTab === 'add'
            ? 'bg-green-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        ]"
        @click="activeTab = 'add'"
      >
        Add Company
      </button>
    </div>

    <!-- Tab Content -->
    <div class="p-4 bg-white rounded-lg shadow-inner">
      <CompanyListings v-if="activeTab === 'listings'" />
      <CompanyAdd v-if="activeTab === 'add'" 
        @change-active-tab="handleChaneActiveTab"/>
    </div>
  </div>
</template>