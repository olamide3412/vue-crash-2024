<script setup>
import BackButton from '@/components/BackButton.vue';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';


const authStore = useAuthStore();

const form = reactive({
    name: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
});

const state = reactive({
    company:{},
    isLoading:true
});

const toast = useToast();
const route = useRoute();

const companyId = route.params.id

const handleSubmit = async () =>{
  if (!authStore.user){
        router.push({name:'login'});
        return;
    }

    if(authStore.user.id != state.company.user_id){
      toast.warning('This company does not belongs to you.');
      return;
    }
   const updateCompany = {
        name: form.name,
        description: form.description,
        contactEmail: form.contactEmail,
        contactPhone: form.contactPhone,
   };

   try {
        const response = await axios.put(`/api/companies/${companyId}`, updateCompany,{
            headers:{
                'Authorization': 'Bearer 1|IxqCaRQfz6Ox4f4wdMr06Zmen8Oli0BWndEXI64730170a8f',
            }
        });
        toast.success('Company Updated Company successfully');
        router.push({name:'company', params:{id:companyId}});
    } catch (error) {
        console.error('Error creating Company', error);
        toast.error('Company was not added');
    } 
   
};

onMounted(async () =>{
    try {
        const res = await axios.get(`/api/companies/${companyId}`);
        state.company = res.data;
        form.name = state.company.name;
        form.description = state.company.description;
        form.contactEmail = state.company.contactEmail;
        form.contactPhone = state.company.contactPhone;
    } catch (error) {
        console.log('Error occured', error);
    } finally{
        state.isLoading = false;
    }
})

</script>

<template>
  <BackButton/>
     <section class="bg-green-50">
      <div class="container m-auto max-w-2xl py-10">
        <div
          class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          <form @submit.prevent="handleSubmit">
            <h2 class="text-3xl text-center font-semibold mb-6">Edit Company</h2>

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
                Update Company
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
</template>