<template>
  <div
    id="inputContainer"
    class="px-2 border-y-0 w-full border-sec border-x-2 border-x-transparent hover:border-x-2 hover:border-x-sec transition-all"
  >
    <div
      class="flex flex-col gap-1"
      v-if="type != 'checkbox' && type != 'textarea'"
    >
      <span class="text-xs">{{ inputTitle }}</span>
      <input
        :type="type"
        min="0"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
        class="flex placeholder:text-text/40 outline-none indent-2 px-2 p-1 w-full rounded-md bg-sec"
        :name="name"
        :autocomplete="'off'"
      />
    </div>
  </div>
  <div
    class="flex gap-4 w-full justify-between px-3 items-center"
    v-if="type === 'checkbox'"
  >
    <label for="default-checkbox" class="text-text">{{ checkBoxMsg }}</label>
    <input
      id="default-checkbox"
      type="checkbox"
      @click="isChecked=!isChecked"
      @input="$emit('update:modelValue', isChecked)"
      class="w-5 h-5 outline-none text-accent bg-gray-100 border-gray-300 ring-0 cursor-pointer"
    />
  </div>
  <div class="flex flex-col gap-2 w-full px-3" v-if="type === 'textarea'">
    <span class="text-xs">{{ inputTitle }}</span>
    <textarea
      @input="$emit('update:modelValue', $event.target.value)"
      class="outline-none bg-sec rounded-md w-full h-[10rem] resize-none p-3 py-1"
    ></textarea>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isChecked = ref(false)
const props = defineProps({
  placeholder: String,
  type: String,
  name: String,
  inputTitle: String,
  checkBoxMsg: String,
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
