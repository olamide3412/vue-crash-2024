<script setup>
import Hero from '@/components/Hero.vue';
import HomeCrads from '@/components/HomeCards.vue';
import JobListings from '@/components/JobListings.vue';

</script>

<template>
  <Hero/>
  <HomeCrads/>
  <JobListings :limit="3" :showButton="true"/>
</template>