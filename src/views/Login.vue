<template>
  <div
    id="page"
    class="flex flex-col gap-4 w-full h-screen justify-center items-center bg-background text-text"
  >
    <div id="titleContainer" class="flex justify-center items-center gap-4">
      <font-awesome-icon
        id="icon"
        class="text-9xl"
        icon="fa-regular fa-compass"
      />
      <div id="title" class="text-[8rem]">ComPass</div>
    </div>
    <div id="inputContainer" class="flex flex-col gap-4">
      <myInput
        :placeholder="'E-mail'"
        :type="'text'"
        v-model="login"
        @keydown.enter="loginFunc"
      />
      <myInput
        :placeholder="'Password'"
        :type="'password'"
        v-model="password"
        @keydown.enter="loginFunc"
      />
      <myButton :text="'Login'" @click="loginFunc" />
    </div>
  </div>
</template>

<script setup>
import myButton from "../components/myButton.vue";
import myInput from "../components/myInput.vue";
import { useToast } from "vue-toastification";
import { ref } from "vue";

const toast = useToast();

const login = ref("");
const password = ref("");
const loginFunc = () => {
  toast.error("You have entered an invalid username or password");
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Carter+One&family=Kaushan+Script&display=swap");
#title {
  /* font-family: 'Carter One', cursive; */
  font-family: "Kaushan Script", cursive;
}

#icon {
  animation: 1.5s forwards iconAnim;
}

@keyframes iconAnim {
  0% {
    transform: translateX(0rem) rotate(0grad);
  }
  50% {
    transform: translateX(35rem) rotate(560grad);
  }
  100% {
    transform: translateX(0rem) rotate(0grad);
  }
}
#title,
#inputContainer {
  animation: 1s forwards appearAnim;
  animation-delay: 1.2s;
  opacity: 0;
}
@keyframes appearAnim {
  to {
    opacity: 100%;
  }
}
</style>
