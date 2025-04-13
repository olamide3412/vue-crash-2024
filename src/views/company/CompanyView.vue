<script setup>
import BackButton from '@/components/BackButton.vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { useToast } from 'vue-toastification';
import apiClient from '@/services/api';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const companyId = route.params.id;

const state = reactive({
    company: {},
    isLoading: true

});

const deleteCompany = async () => {
  if (!authStore.user){
        router.push({name:'login'});
        return;
    }

    if(authStore.user.id != state.company.user_id){
      toast.warning('This company does not belongs to you.');
      return;
    }
    try {
        const confirm = window.confirm('Are tou sure you want to delete this company?');
        if(confirm){
            await apiClient.delete(`/companies/${companyId}`,{
                headers:{
                    'Authorization': 'Bearer 1|IxqCaRQfz6Ox4f4wdMr06Zmen8Oli0BWndEXI64730170a8f',
                }
            });
            toast.success('Company Deleted Successfully');
            router.push({name:'companies'});
        }
    } catch (error) {
        console.error('Error deleting job', error);
        toast.error('Company not deleted');
    }
}

onMounted(async() => {
    try {
        const res = await apiClient.get(`/companies/${companyId}`);
        state.company = res.data;
    } catch (error) {
        console.error('Error fetching company',error);
    } finally{
        state.isLoading = false;
    }
})

</script>

<template>
  <BackButton/>
    <section v-if="!state.isLoading" class="bg-green-50">
      <div class="container m-auto py-10 px-6">
        <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <main>
            <!-- Company Info -->
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-bold mb-6">Company Info</h3>

              <h2 class="text-2xl">{{ state.company.name }}</h2>

              <p class="my-2">
                {{ state.company.description }}
              </p>

              <hr class="my-4" />

              <h3 class="text-xl">Contact Email:</h3>

              <p class="my-2 bg-green-100 p-2 font-bold">
                {{ state.company.contactEmail }}
              </p>

              <h3 class="text-xl">Contact Phone:</h3>

              <p class="my-2 bg-green-100 p-2 font-bold">
                {{ state.company.contactPhone }}
              </p>
            </div>

            <!-- Manage -->
            <div class="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 class="text-xl font-bold mb-6">Manage Company</h3>
              <RouterLink
                :to="{name:'edit-company', params:{ id:state.company.id }}"
                class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >Edit Company</RouterLink
              >
              <button @click="deleteCompany"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >
                Delete Company
              </button>
            </div>
          </main>
        </div>
      </div>
    </section>
    <!-- Show loading spinner while loading is true -->
    <div v-else class="text-center text-gray-500 py-6">
      <PulseLoader/>
    </div>
</template>