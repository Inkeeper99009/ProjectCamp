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
    <div
      @keypress.enter="login"
      id="inputContainer"
      class="flex flex-col gap-4"
    >
      <myInput
        :placeholder="'Benutzername'"
        :type="'text'"
        v-model="username"
      />
      <myInput
        :placeholder="'Password'"
        :type="'password'"
        v-model="password"
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
import { getDatabase, ref as dbRef, onValue, set } from "firebase/database";

import router from "../router";

const toast = useToast();

const username = ref("");
const password = ref("");
const user = ref();

const register = () => {};
const login = () => {
  const db = getDatabase();
  let dbResult = dbRef(db, "users/" + username.value);
  onValue(dbResult, (snapshot) => {
    user.value = snapshot.val();
    if (user.value === null) {
      toast.error("Die eingegebenen Daten sind falsch!");
      return;
    } else {
      if (username.value === "" || password.value === "") {
        toast.info("Alle Felder müssen ausgefüllt werden!");
        return;
      }
      if (password.value != user.value.password) {
        toast.error("Die eingegebenen Daten sind falsch!");
      }
      if (user.value.password === password.value) {
        localStorage.setItem("storedData", username.value);
        router.push('/home')
      }
    }
  });
};
</script>

<style scoped>
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
