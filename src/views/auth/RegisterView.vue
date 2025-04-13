<script setup>
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const { errors } = storeToRefs(useAuthStore());
const { authenticate } = useAuthStore();

const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});

const isLoading = ref(false);

const handleSubmit = async () => {
     authenticate('register', form, isLoading);
};
</script>

<template>
<section>
      <div class="container m-auto max-w-2xl">
        <div
          class=" px-6 py-24 m-4 md:m-0"
        >
          <form @submit.prevent="handleSubmit">
            <h2 class="text-3xl text-center font-semibold mb-6">REGISTER</h2>
            
            <div class="mb-4">
              <label
                for="name"
                class="block text-gray-700 font-bold mb-2"
                >Name</label
              >
              <input
                type="text"
                v-model="form.name"
                id="name"
                name="name"
                class="border rounded w-full py-2 px-3"
                placeholder="Name"
                required
              />
              <p v-if="errors.name" class=" text-red-500">{{ errors.name[0] }}</p>
            </div>

            <div class="mb-4">
              <label
                for="email"
                class="block text-gray-700 font-bold mb-2"
                >Email</label
              >
              <input
                type="email"
                v-model="form.email"
                id="email"
                name="email"
                class="border rounded w-full py-2 px-3"
                placeholder="Email Address"
                required
              />
              <p v-if="errors.email" class=" text-red-500">{{ errors.email[0] }}</p>
            </div>
            <div class="mb-4">
              <label
                for="password"
                class="block text-gray-700 font-bold mb-2"
                >Password</label
              >
              <input
                type="password"
                v-model="form.password"
                id="password"
                name="password"
                class="border rounded w-full py-2 px-3"
                placeholder="Password"
              />
              <p v-if="errors.password" class=" text-red-500">{{ errors.password[0] }}</p>
            </div>
            <div class="mb-4">
              <label
                for="password"
                class="block text-gray-700 font-bold mb-2"
                >Confirm Password</label
              >
              <input
                type="password"
                v-model="form.password_confirmation"
                id="password_confirmation"
                name="password_confirmation"
                class="border rounded w-full py-2 px-3"
                placeholder="Password Confirmation"
              />
              <p v-if="errors.password_confirmation" class=" text-red-500">{{ errors.password_confirmation[0] }}</p>
            </div>
            <div v-if="isLoading" class=" flex justify-center">
                <PulseLoader/>
            </div>
            
            <div>
              <button
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
</template>