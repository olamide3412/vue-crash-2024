<script setup>
import {  useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  backButtonText :{
    type: String,
    default: 'Go Back'
  }
})
const goBack = () =>{
  router.back();
}
</script>

<template>
     <section>
      <div class="container m-auto py-6 px-6">
        <button
          @click="goBack"
          class="text-green-500 hover:text-green-600 flex items-center"
        >
          <i class="pi pi-arrow-circle-left mr-3"></i> {{ props.backButtonText }}
        </button>
      </div>
    </section>
</template>