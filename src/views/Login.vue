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
        v-model="email"
        @keydown.enter="login"
      />
      <myInput
        :placeholder="'Password'"
        :type="'password'"
        v-model="password"
        @keydown.enter="login"
      />
      <myButton :text="'Login'" @click="login" />
    </div>
  </div>
</template>

<script setup>
import myButton from "../components/myButton.vue";
import myInput from "../components/myInput.vue";
import { useToast } from "vue-toastification";
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import router from "../router";

const toast = useToast();

const email = ref("");
const password = ref("");
const loginFunc = () => {
  toast.error("You have entered an invalid username or password");
};

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      toast.success("The account has been successfully created !", {});
      router.push("/home");
    })
    .catch((e) => {
      if (e.code === "auth/email-already-in-use")
        toast.error("This E-mail is already in use by another account !", {});
      if (e.code === "auth/invalid-email") {
        toast.error("This E-mail is invalid !", {});
      }
      if (e.code === "auth/weak-password")
        toast.error("The Password must be longer than 5 characters !", {});
    });
};
const login = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      router.push("/home");
    })
    .catch((e) => {
      if (e.code === "auth/invalid-email") {
        toast.error("Invalid E-mail !", {});
      }
      if (e.code === "auth/user-disabled") {
        toast.error("This account has been deactivated !", {});
      }
      if (e.code === "auth/user-not-found")
        toast.error("You have entered an incorrect E-mail or Password !", {});
      if (e.code === "auth/wrong-password")
        toast.error("You have entered an incorrect E-mail or Password !", {});
      if (e.code === "auth/invalid-login-credentials")
        toast.error("You have entered an incorrect E-mail or Password !", {});
      if (e.code === "auth/too-many-requests")
        toast.error(
          "You have tried to log in too many times. Try again in a little while !",
          {}
        );
    });
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
