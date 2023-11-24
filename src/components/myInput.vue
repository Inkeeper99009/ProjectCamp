<template>
  <div
    id="inputContainer"
    class="px-2 border-y-0 w-full border-sec border-x-2 border-x-transparent hover:border-x-2 hover:border-x-sec transition-all"
  >
  <span class=" text-xs">{{inputTitle}}</span>
    <input
      :type="type"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      class="flex placeholder:text-text/40 outline-none indent-2 px-2 p-1 w-full rounded-md bg-sec"
      :name="name"
      :autocomplete="'off'"
      :v-model="test"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  placeholder: String,
  type: String,
  name: String,
  test:String,
  inputTitle:String
});
defineEmits(["update:modelValue"]);
</script>
<style>
input[type="date"] {
  text-indent: 3px;
}
input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  color: #ecf0f1 !important;
  filter: invert();
}
</style>
