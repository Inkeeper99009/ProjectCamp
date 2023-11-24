<template>
  <div
    id="btnContainer"
    class="flex gap-2 justify-center items-center px-2 border-y-0 border-text  cursor-pointer border-x hover:border-x hover:border-x-text transition-all"
  >
  <font-awesome-icon :icon="iconName" />
    <div
      id="container"
      class="md:flex hidden justify-center items-center transition-all text-base"
    >
      {{ text }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  text: String,
  iconName:String
});
</script>
