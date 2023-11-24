<template>
  <div
    id="page"
    class="flex flex-col h-screen w-screen text-text bg-background no-scrollbar"
  >
    <topBar @selectedTab="selectTab" class="animate-Smooth_Appear" />
    <div
      id="content"
      class="flex h-full animate-Smooth_Appear overflow-y-scroll no-scrollbar"
    >
      <guestsTable v-if="selectedTabNumber === 1" />
      <bookingsTable v-if="selectedTabNumber === 2" />
      <parkingTable v-if="selectedTabNumber === 3" />
      <extraCostTable v-if="selectedTabNumber === 4" />
    </div>
  </div>
</template>

<script setup>
import topBar from "../components/topBar.vue";
import guestsTable from "../components/Tables/guestsTable.vue";
import bookingsTable from "../components/Tables/bookingsTable.vue";
import parkingTable from "../components/Tables/parkingTable.vue";
import extraCostTable from "../components/Tables/extraCostTable.vue";
import { ref } from "vue";

const selectedTabNumber = ref(1);

const selectTab = (num) => {
  selectedTabNumber.value = num;
};
</script>
