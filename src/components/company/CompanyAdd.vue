<script setup>
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';
import apiClient from '@/services/api';

const authStore = useAuthStore();
const form = reactive({
    name: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
});

const toast = useToast();
const emit = defineEmits(['change-active-tab']);

const handleSubmit = async () =>{
   const newCompany = {
        name: form.name,
        description: form.description,
        contactEmail: form.contactEmail,
        contactPhone: form.contactPhone,
   };

   try {
        const response = await apiClient.post('/companies', newCompany,{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
        toast.success('Company Added Company successfully');
        emit('change-active-tab','listings')
        //router.push({name:'home'});
        //router.push(`/jobs/${response.data.id}`);
    } catch (error) {
        console.error('Error creating Company', error);
        toast.error('Company was not added');
    } 
   
};


</script>

<template>
    <section v-if="authStore.user">
      <div class="container m-auto max-w-2xl">
        <div
          class="px-6 py-8 m-4 md:m-0"
        >
          <form @submit.prevent="handleSubmit">
            <h2 class="text-3xl text-center font-semibold mb-6">Company Info</h2>

            <div class="mb-4">
              <label for="company" class="block text-gray-700 font-bold mb-2"
                >Company Name</label
              >
              <input
                type="text"
                v-model="form.name"
                id="company"
                name="company"
                class="border rounded w-full py-2 px-3"
                placeholder="Company Name"
              />
            </div>

            <div class="mb-4">
              <label
                for="company_description"
                class="block text-gray-700 font-bold mb-2"
                >Company Description</label
              >
              <textarea
                v-model="form.description"
                id="company_description"
                name="company_description"
                class="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="What does your company do?"
              ></textarea>
            </div>

            <div class="mb-4">
              <label
                for="contact_email"
                class="block text-gray-700 font-bold mb-2"
                >Contact Email</label
              >
              <input
                type="email"
                v-model="form.contactEmail"
                id="contact_email"
                name="contact_email"
                class="border rounded w-full py-2 px-3"
                placeholder="Email address for applicants"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="contact_phone"
                class="block text-gray-700 font-bold mb-2"
                >Contact Phone</label
              >
              <input
                type="tel"
                v-model="form.contactPhone"
                id="contact_phone"
                name="contact_phone"
                class="border rounded w-full py-2 px-3"
                placeholder="Optional phone for applicants"
              />
            </div>

            <div>
              <button
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Company
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    <div v-else class=" flex items-center justify-center">
      <RouterLink
      :to="{name:'login'}"
      class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-fit ">
        Login First
      </RouterLink>
    </div>
</template>