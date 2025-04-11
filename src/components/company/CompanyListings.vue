<script setup>
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { useToast } from 'vue-toastification';
import Pagination from '../Pagination.vue';
import { nextTick } from 'vue';
import { RouterLink } from 'vue-router';

const toast = useToast();
const state = reactive({
    company:[],
    isLoading: true,
    currentPage: 1,
    lastPage: 1,
});

const showErrorMsg = (msg) => toast.error(msg);

const fetchCompanies = async (page = 1) => {
    state.isLoading = true;
    try {
        const response = await axios.get(`/api/companies?page=${page}&paginate=${true}`);
        state.company = response.data.data;
        state.currentPage = response.data.current_page;
        state.lastPage = response.data.last_page;
        state.isLoading = false;
    } catch (error) {
        showErrorMsg('Error retriving company')
        console.error(error);
        state.isLoading = false;
    }
}

const handlePageChange = async (page) => {
  console.log('Page clicked:', page);
  await fetchCompanies(page);
  // Wait for DOM to update, then scroll
  await nextTick();

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};



onMounted(() => fetchCompanies());

</script>

<template>
 <section class="px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Browse Companies
            </h2>
            <!-- Show loading spinner while loading is true -->
             <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                <PulseLoader/>
             </div>
             <!-- show job listing when done loading -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div v-for="company in state.company" :key="company.id" class="bg">
                    <RouterLink
                    :to="{name:'company', params:{id:company.id}}">
                    <div class="bg-white rounded-lg shadow-md p-4 hover:bg-gray-100">
                        <h3 class="text-lg font-bold text-gray-700 mb-2 capitalize">{{ company.name }}</h3>
                        <div class="border border-gray-100 mb-2"></div>
                        <p>{{ company.description }}</p>
                    </div>
                </RouterLink>
                </div>
            </div>
             <!-- Pagination -->
             <Pagination
                 v-if="state.lastPage > 1"
                 :current-page="state.currentPage"
                 :last-page="state.lastPage"
                 @change-page="handlePageChange"
                />

        </div>

       
    </section>
</template>