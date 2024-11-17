<template>
  <div class="flex flex-col">
    <!-- top menu -->
    <TopMenu />
    <main class="flex flex-row">
      <!-- sideMenu -->
      <SideMenu />
      <!-- routerView -->
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import TopMenu from '@/modules/common/components/TopMenu.vue';
import SideMenu from '../components/SideMenu.vue';


</script>

<style scoped></style>
