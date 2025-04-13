<script setup>
import { reactive, defineProps, onMounted, nextTick } from 'vue';
import JobListing from './JobListing.vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import Pagination from '../Pagination.vue';
import apiClient from '@/services/api';

const props = defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false
    }
});

const state = reactive({
    jobs: [],
    isLoading: true,
    currentPage: 1,
    lastPage: 1,
});

const filters = reactive({
  title: '',
  location: '',
  type: ''
});

const route = useRoute();
const router = useRouter();

const fetchJobs = async(page = 1) => {
    try {
        const query = new URLSearchParams({
            page: page,
            title: filters.title,
            location: filters.location,
            type: filters.type,
        }).toString();
            
        
        const response = await apiClient.get(`/jobs?${query}`);
        state.jobs = response.data.data;
        state.currentPage = response.data.current_page;
        state.lastPage = response.data.last_page;
    } catch (error) {
        console.error('Error fetching jobs', error);
    } finally{
        state.isLoading = false;
    }
}

const applyFilters = async () => {
    const newQuery = {
    ...route.query,
    ...filters,
    page: 1 // reset to first page
  };
  router.replace({ query: newQuery });
   fetchJobs(1); // reset to first page
  //updateRouteOnAddressBar(1);
};

const handlePageChange = async (page) => {
  await fetchJobs(page);
 
  updateRouteOnAddressBar(page);
  // Wait for DOM to update, then scroll
  await nextTick();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

const updateRouteOnAddressBar = (page) => {
     //Update URL without reloading
    router.replace({ query: { ...route.query, page } });
    
}

onMounted(async () => {
    const initialPage = parseInt(route.query.page) || 1;
    await fetchJobs(initialPage);
    !props.showButton && updateRouteOnAddressBar(initialPage); // so it won't show on home page
});



</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
       
        
           
       

        <div class="container-xl lg:container m-auto" >
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Browse Jobs
            </h2>
            <div v-if="!showButton" class="py-3">
                <div class="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        v-model="filters.title"
                        type="text"
                        placeholder="Search by Title"
                        class="p-2 border rounded"
                    />

                    <input
                        v-model="filters.location"
                        type="text"
                        placeholder="Filter by Location"
                        class="p-2 border rounded"
                    />

                    <select v-model="filters.type" class="p-2 border rounded">
                        <option value="">All Types</option>
                        <option value="Full-Time">Full Time</option>
                        <option value="Part-Time">Part Time</option>
                        <option value="Remote">Remote</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>
                <div class=" flex justify-end">
                    <button
                        @click="applyFilters"
                        class="bg-green-600 text-white py-2 px-4 rounded col-span-1 md:col-span-1 hover:bg-green-700">
                        Apply Filters
                    </button>
                </div>
            </div>
            <!-- Show loading spinner while loading is true -->
             <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                <PulseLoader/>
             </div>
             <!-- show job listing when done loading -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <JobListing v-for="job in state.jobs.slice(0, limit || state.jobs.length)" :key="job.id" :job="job"/>
            </div>
            <div v-if="!showButton">
                 <!-- Pagination -->
                <Pagination
                    v-if="state.lastPage > 1"
                    :current-page="state.currentPage"
                    :last-page="state.lastPage"
                    @change-page="handlePageChange"
                />
            </div>
        </div>
    </section>
    <section v-if="showButton" class="m-auto max-w-lg my-5 px-6">
      <RouterLink
        :to="{name:'jobs'}"
        class="block bg-black text-white text-center py-3 px-6 rounded-xl hover:bg-gray-700"
        >View All Jobs</RouterLink>
    </section>
    <section class="m-auto max-w-lg my-5 px-6">
        <RouterLink
            :to="{name:'add-job'}"
            class="block bg-green-500 hover:bg-green-900 text-white text-center py-3 px-6 rounded-md"
            >Add Job</RouterLink>
    </section>
</template>