<template>
  <div
    id="btnContainer"
    class="px-2 w-full border-y-0 border-accent border-x border-x-transparent hover:border-x hover:border-x-accent transition-all"
  >
    <button
      class="flex outline-none justify-center w-full items-center p-1 px-4 rounded-md bg-accent text-text hover:opacity-95 hover:shadow-shadow transition-all"
    >
      {{ text }}
      <span>
        <font-awesome-icon v-if="icon != ''" :icon="icon" />
      </span>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  text: String,
  icon: String,
});
</script>
