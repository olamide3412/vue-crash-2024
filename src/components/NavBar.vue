<script setup>
import logo from '@/assets/img/logo.png'
import skywaylogo from '@/assets/img/skyway_logo.png'
import { useAuthStore } from '@/stores/auth';
import { RouterLink, useRoute } from 'vue-router';

const authStore = useAuthStore();

const isActiveLink = (routePath) => {
  const route = useRoute();
  //return route.path === routePath || route.name === routePath;
  return route.name === routePath;
}


</script>

<template>
     <nav class="bg-green-700 border-b border-green-500">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="flex h-20 items-center justify-between">
          <div
            class="flex flex-1 items-center md:items-stretch md:justify-start"
          >
            <!-- Logo -->
            <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
              <img class="h-10 w-auto" :src="skywaylogo" alt="Vue Jobs" />
              <span class="hidden md:block text-white text-2xl font-bold ml-2">
                Skyway Tech Jobs</span>
            </RouterLink>
            <div class="md:ml-auto">
              <div class="flex space-x-2">
                <RouterLink
                  :to="{name:'home'}"
                  :class="[ 
                    isActiveLink('home') 
                    ? 'bg-green-900' 
                    : 'hover:bg-gray-900 hover:text-white', 
                      'text-white', 'px-3',' py-2', 'rounded-md']"
                  >Home
                </RouterLink>
                <RouterLink
                 :to="{name:'jobs'}"
                  :class="[ 
                    isActiveLink('jobs') 
                    ? 'bg-green-900' 
                    : 'hover:bg-gray-900 hover:text-white', 
                      'text-white', 'px-3',' py-2', 'rounded-md']"
                  >Jobs</RouterLink>
                <RouterLink
                  :to="{name:'companies'}"
                  :class="[ 
                    isActiveLink('companies') 
                    ? 'bg-green-900' 
                    : 'hover:bg-gray-900 hover:text-white', 
                    'text-white', 'px-3',' py-2', 'rounded-md']"
                  >Companies</RouterLink>
                  <RouterLink
                    v-if="!authStore.user"
                    :to="{name:'login'}"
                    :class="[ 
                      isActiveLink('login') 
                      ? 'bg-green-900' 
                      : 'hover:bg-gray-900 hover:text-white', 
                      'text-white', 'px-3',' py-2', 'rounded-md']"
                    >Login
              </RouterLink>
              <form 
                  v-if="authStore.user"
                  @submit.prevent="authStore.logout">
                  <button 
                    class="text-white px-3 py-2 rounded-md bg-red-500 hover:bg-red-700 hover:text-white" >
                    Logout
                  </button>
              </form>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </nav>
</template>