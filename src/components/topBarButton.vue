<template>
  <div
    id="btnContainer"
    class="px-2 border-y-0 border-text  cursor-pointer border-x hover:border-x hover:border-x-text transition-all"
  >
    <div
      id="container"
      class="flex justify-center items-center transition-all text-base"
    >
      {{ text }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  text: String,
});
</script>
