<template>
  <div
    id="page"
    class="flex flex-col h-screen min-w-max text-text bg-background no-scrollbar"
  >
    <topBar class="animate-Smooth_Appear" />
    <div id="content" class="flex h-full animate-Smooth_Appear overflow-y-scroll no-scrollbar">
      <myTable />
    </div>
  </div>
</template>

<script setup>
import topBar from "../components/topBar.vue";
import myTable from "../components/myTable.vue";
</script>
