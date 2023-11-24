<template>
  <div id="container" class="flex flex-col w-full h-full p-4 pt-0">
    <oneTableRow v-for="item,index in list" :key="item" :object="item" :itemId="index" />
  </div>
  <div
    id="createWindow"
    v-if="isCreateWindowOpen"
    class="flex z-20 justify-center items-center w-full h-full top-0 bg-background/70 animate-Smooth_Appear_Fast absolute"
  >
    <div
      id="createWindowContent"
      class="flex relative flex-col justify-center items-center p-4 w-[25rem] h-[30rem] bg-container shadow-standart rounded-lg"
    >
      <span
        id="containerTitleAndCloseBtn"
        class="flex justify-between items-center absolute top-7 text-xl left-8 w-[21rem] self-start"
        >Neuen Kunden Anlegen
        <font-awesome-icon
          @click="createWindowHandler"
          icon="fa-solid fa-xmark"
          class="hover:text-red-400 transition-all cursor-pointer text-xl"
      /></span>
      <div
        id="createInputs"
        class="flex flex-col gap-4 justify-between items-center w-full"
      >
        <myInput :type="'text'" :placeholder="'Nachname'" v-model="Nachname" />
        <myInput :type="'text'" :placeholder="'Vorname'" v-model="Vorname" />
        <myInput :type="'date'" :placeholder="'Geb. Datum'" v-model="BDay" />
        <myInput :type="'text'" :placeholder="'Tel.'" v-model="Tel" />
        <myInput :type="'text'" :placeholder="'E-mail'" v-model="Email" />
        <myInput :type="'text'" :placeholder="'Anschrift'" v-model="Adress" />
        <myButton
          :text="'Anlegen'"
          @click="writeGuestData(Nachname, Vorname, BDay, Tel, Email, Adress)"
        />
      </div>
    </div>
  </div>
  <div
    id="bottomMenu"
    class="flex self-center justify-center items-center px-16 w-full h-14 absolute bottom-0 z-10 opacity-0 animate-Smooth_Appear"
  >
    <div
      class="flex justify-center items-center rounded-t-[30px] w-full h-full bg-container"
    >
      <my-button
        @click="createWindowHandler"
        :text="'Neuen Kunden Anlegen'"
        class="w-max"
      />
    </div>
  </div>
</template>

<script setup>
import oneTableRow from "./oneTableRow.vue";
import myButton from "./myButton.vue";
import myInput from "./myInput.vue";
import { onMounted, ref } from "vue";
import { getDatabase, ref as dbRef, onValue, set } from "firebase/database";

const Nachname = ref("");
const Vorname = ref("");
const BDay = ref("");
const Tel = ref("");
const Email = ref("");
const Adress = ref("");

const list = ref({});

const writeGuestData = (Nachname, Vorname, BDay, Tel, Email, Adress) => {
  const db = getDatabase();
  let idCounter = 0;
  if (list.value != null) {
    idCounter = Object.keys(list.value).length;
    console.log(idCounter);
  }
  const guestId = ref(idCounter);
  const reference = dbRef(db, "guest/" + "guest" + (guestId.value + 1));
  set(reference, {
    LastName: Nachname,
    FirstName: Vorname,
    BDay: BDay,
    Tel: Tel,
    Email: Email,
    Adress: Adress,
  });
  createWindowHandler()
};

const isCreateWindowOpen = ref(false);
const createWindowHandler = () => {
  isCreateWindowOpen.value = !isCreateWindowOpen.value;
};
onMounted(() => {
  const db = getDatabase();
  let dbListLocation = dbRef(db, "guest/");
  onValue(dbListLocation, (snapshot) => {
    list.value = snapshot.val();
  });
});
</script>

<style scoped>
#bottomMenu {
  animation-delay: 0.7s;
}
</style>
