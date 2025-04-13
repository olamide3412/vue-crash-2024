<script setup>
import axios from 'axios';
import router  from '@/router';
import { reactive, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { useRoute } from 'vue-router';
import BackButton from '@/components/BackButton.vue';
import { useAuthStore } from '@/stores/auth';
import apiClient from '@/services/api';

const route = useRoute();
const jobId = route.params.id;
const authStore = useAuthStore();

const form = reactive({
    type: 'Full-Time',
    title: '',
    description: '',
    salary: '',
    location: '',
    company_id: ''
});

const companyList = reactive([]);
const state = reactive({
    job:{},
    isLoading: true
});

const toast = useToast();


const handleSubmit = async () =>{
    if (!authStore.user){
        router.push({name:'login'});
        return;
    }

    if(authStore.user.id != state.job.user_id){
      toast.warning('This job does not belongs to you.');
      return;
    }

   const updatedJob = {
        type: form.type,
        title: form.title,
        description: form.description,
        salary: form.salary,
        location: form.location,
        company_id: form.company_id
   };

   try {
        const response = await apiClient.put(`/jobs/${jobId}`, updatedJob,{
            headers:{
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        toast.success('Job Updated Successfully');
        router.push({name:'job', params:{id:response.data.id}});
    } catch (error) {
        console.error('Error updating job', error);
        toast.error('Job was not updated');
    } 
   
};

const fetchCompany = async () => {
    try {
      const response = await apiClient.get('/companies',{
        params:{
          'paginate':0
        },
      });
      companyList.splice(0, companyList.length, ...response.data);
    } catch (error) {
      console.error('Error fetching companies', error);
      toast.error('Company was not fetch');
    }
}

const fetchJob = async () => {
  try {
        const response = await apiClient.get(`/jobs/${jobId}`);
        state.job = response.data;
        //Populate input
        form.type = state.job.type
        form.title = state.job.title
        form.description = state.job.description
        form.salary = state.job.salary
        form.location = state.job.location
        form.company_id = state.job.company.id
    } catch (error) {
        console.error('error fetching job', error);
    } finally{
        state.isLoading = false;
    }
}

onMounted(() => {
    fetchCompany();
    fetchJob();
});

</script>

<template>
<BackButton :backButtonText="'Back to Job View'"/>
<section class="bg-green-50">
      <div class="container m-auto max-w-2xl py-24">
        <div
          class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          <form @submit.prevent="handleSubmit">
            <h2 class="text-3xl text-center font-semibold mb-6">Edit Job</h2>

            <div class="mb-4">
              <label for="type" class="block text-gray-700 font-bold mb-2"
                >Job Type</label
              >
              <select
                v-model="form.type"
                id="type"
                name="type"
                class="border rounded w-full py-2 px-3"
                required
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2"
                >Job Listing Name</label
              >
              <input
                type="text"
                v-model="form.title"
                id="name"
                name="name"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Beautiful Apartment In Miami"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="description"
                class="block text-gray-700 font-bold mb-2"
                >Description</label
              >
              <textarea
                v-model="form.description"
                id="description"
                name="description"
                class="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add any job duties, expectations, requirements, etc"
              ></textarea>
            </div>

            <div class="mb-4">
              <label for="type" class="block text-gray-700 font-bold mb-2"
                >Salary</label
              >
              <select
                v-model="form.salary"
                id="salary"
                name="salary"
                class="border rounded w-full py-2 px-3"
                required
              >
                <option value="Under $50K">under $50K</option>
                <option value="$50K - $60K">$50 - $60K</option>
                <option value="$60K - $70K">$60 - $70K</option>
                <option value="$70K - $80K">$70 - $80K</option>
                <option value="$80K - $90K">$80 - $90K</option>
                <option value="$90K - $100K">$90 - $100K</option>
                <option value="$100K - $125K">$100 - $125K</option>
                <option value="$125K - $150K">$125 - $150K</option>
                <option value="$150K - $175K">$150 - $175K</option>
                <option value="$175K - $200K">$175 - $200K</option>
                <option value="Over $200K">Over $200K</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2">
                Location
              </label>
              <input
                type="text"
                v-model="form.location"
                id="location"
                name="location"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="Company Location"
                required
              />
            </div>

            <h3 class="text-2xl mb-5">Company</h3>

            <div class="mb-4">
              <label for="company_id" class="block text-gray-700 font-bold mb-2"
                >Company</label
              >
              <select
                v-model="form.company_id"
                id="company_id"
                name="company_id"
                class="border rounded w-full py-2 px-3"
                required
              >
              <option v-for="company in companyList" :key="company.id" :value="company.id">{{ company.name }}</option>
              </select>
            </div>
            
            <div>
              <button
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
</template>