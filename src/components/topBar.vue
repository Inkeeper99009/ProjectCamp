<template>
  <div id="container" class="flex w-full p-4 items-center justify-between">
    <div
      id="title"
      class="hidden lg:flex mr-16 justify-center items-center text-3xl min-w-fit cursor-default"
    >
      <font-awesome-icon
        id="icon"
        class="mr-2"
        icon="fa-regular fa-compass"
      />ComPass
    </div>
    <div class="flex justify-center items-center">
      <div id="btnsContainer" class="flex gap-4">
        <topBarButton
          :iconName="'fa-solid fa-people-roof'"
          :text="'Urlaubsgäste'"
          @click="selectBtn(1)"
          :class="{
            ['opacity-100 border-x-text']: activeBtn === 1,
            ['opacity-40 hover:opacity-90 border-x-transparent']:
              activeBtn != 1,
          }"
        />
        <topBarButton
          :iconName="'fa-solid fa-calendar-days'"
          :text="'Urlaubsbuchungen'"
          @click="selectBtn(2)"
          :class="{
            ['opacity-100 border-x-text']: activeBtn === 2,
            ['opacity-40 hover:opacity-90 border-x-transparent']:
              activeBtn != 2,
          }"
        />
        <topBarButton
          :iconName="'fa-solid fa-caravan'"
          :text="'Stellplätze'"
          @click="selectBtn(3)"
          :class="{
            ['opacity-100 border-x-text']: activeBtn === 3,
            ['opacity-40 hover:opacity-90 border-x-transparent']:
              activeBtn != 3,
          }"
        />
        <topBarButton
          :iconName="'fa-solid fa-hand-holding-dollar'"
          :text="'Zusatzkosten'"
          @click="selectBtn(4)"
          :class="{
            ['opacity-100 border-x-text']: activeBtn === 4,
            ['opacity-40 hover:opacity-90 border-x-transparent']:
              activeBtn != 4,
          }"
        />
      </div>
    </div>
    <div
      @click="signOutFunc"
      id="btnContainer"
      class="px-2 ml-8 border-y-0 border-red-400 cursor-pointer border-x border-x-transparent hover:border-x hover:border-x-red-400 transition-all"
    >
      <div
        class="flex gap-2 justify-center text-red-400 items-center transition-all text-base"
      >
        <font-awesome-icon icon="fa-solid fa-door-open" />
        Logout
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import topBarButton from "./topBarButton.vue";
import { getAuth, signOut } from "firebase/auth";
import router from "../router";

const emits = defineEmits(["selectedTab"]);

const activeBtn = ref(1);
const selectBtn = (num) => {
  switch (num) {
    case 1:
      activeBtn.value = 1;
      emits("selectedTab", num);
      break;
    case 2:
      activeBtn.value = 2;
      emits("selectedTab", num);
      break;
    case 3:
      activeBtn.value = 3;
      emits("selectedTab", num);
      break;
    case 4:
      activeBtn.value = 4;
      emits("selectedTab", num);
      break;
  }
};

const auth = getAuth();
const signOutFunc = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      router.push("/");
    })
    .catch((error) => {
      // An error happened.
    });
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Carter+One&family=Kaushan+Script&display=swap");
#title {
  /* font-family: 'Carter One', cursive; */
  font-family: "Kaushan Script", cursive;
}
</style>
