<template>
  <div
    id="inputContainer"
    class="px-2 border-y-0 border-sec border-x-2 border-x-transparent hover:border-x-2 hover:border-x-sec transition-all"
  >
    <input
      :type="type"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      class="flex placeholder:text-text/40 outline-none indent-2 px-2 p-1 rounded-md bg-sec"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  placeholder: String,
  type: String,
});
defineEmits(["update:modelValue"]);
</script>
