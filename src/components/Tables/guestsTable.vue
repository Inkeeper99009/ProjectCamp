<template>
  <span
    v-if="!list"
    class="flex justify-center text-center items-center w-full h-full text-xl animate-Smooth_Appear"
    >Hier gibt es keine Feriengäste! Bitte erstellen Sie einen.</span
  >
  <div
    v-if="list"
    id="container"
    class="flex flex-col w-full h-full p-4 pt-0 animate-Smooth_Appear"
  >
    <guestRow
      v-for="(item, index) in list"
      :key="item"
      :object="item"
      :itemId="index"
    />
  </div>
  <div
    id="createWindow"
    v-if="isCreateWindowOpen"
    class="flex z-20 justify-center items-center w-full h-full top-0 bg-background/70 animate-Smooth_Appear_Fast absolute"
  >
    <div
      id="createWindowContent"
      class="flex relative flex-col justify-between items-center p-4 w-[25rem] md:h-[35rem] h-full bg-container shadow-standart md:rounded-lg"
    >
    <span
        id="containerTitleAndCloseBtn"
        class="flex justify-between items-center text-xl w-full self-start"
        >Neuen Kunden anlegen
        <font-awesome-icon
          @click="createWindowHandler"
          icon="fa-solid fa-xmark"
          class="hover:text-red-400 transition-all cursor-pointer text-xl"
      /></span>
      <div
        id="createInputs"
        class="flex flex-col mt-10 gap-4 justify-between items-center h-full w-full"
      >
        <myInput
          :type="'text'"
          :placeholder="'Nachname'"
          inputTitle="Nachname"
          v-model="Nachname"
        />
        <myInput
          :type="'text'"
          :placeholder="'Vorname'"
          inputTitle="Vorname"
          v-model="Vorname"
        />
        <myInput
          :type="'date'"
          :placeholder="'Geb. Datum'"
          inputTitle="Geb. Datum"
          v-model="BDay"
        />
        <myInput
          :type="'text'"
          :placeholder="'Tel.'"
          inputTitle="Tel."
          v-model="Tel"
        />
        <myInput
          :type="'text'"
          :placeholder="'E-mail'"
          inputTitle="E-mail"
          v-model="Email"
        />
        <myInput
          :type="'text'"
          :placeholder="'Anschrift'"
          inputTitle="Anschrift"
          v-model="Adress"
        />
        <myButton
          :text="'Anlegen'"
          @click="writeGuestData(Nachname, Vorname, BDay, Tel, Email, Adress)"
        />
      </div>
    </div>
  </div>
  <div
    id="bottomMenu"
    class="flex self-center justify-center items-center md:px-16 w-full h-14 absolute bottom-0 z-10 opacity-0 animate-Smooth_Appear"
  >
    <div
      class="flex justify-center items-center md:rounded-t-[30px] w-full h-full bg-container"
    >
      <my-button
        @click="createWindowHandler"
        :text="'Neuen Kunden anlegen'"
        class="w-max"
      />
    </div>
  </div>
</template>

<script setup>
import guestRow from "../TableRows/guestRow.vue";
import myButton from "../myButton.vue";
import myInput from "../myInput.vue";
import { useToast } from "vue-toastification";
import { onMounted, ref } from "vue";
import { getDatabase, ref as dbRef, onValue, set } from "firebase/database";


const Nachname = ref("");
const Vorname = ref("");
const BDay = ref("");
const Tel = ref("");
const Email = ref("");
const Adress = ref("");

const list = ref({});
const toast = useToast();

const writeGuestData = (Nachname, Vorname, BDay, Tel, Email, Adress) => {
  if (
    Nachname === "" ||
    Vorname === "" ||
    BDay === "" ||
    Tel === "" ||
    Email === "" ||
    Adress === ""
  ) {
    toast.info("Alle Eingaben sollten ausgefüllt sein!");
    return;
  }
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
  createWindowHandler();
};

const resetInputsValue = () => {
  Nachname.value = "";
  Vorname.value = "";
  BDay.value = "";
  Tel.value = "";
  Email.value = "";
  Adress.value = "";
};
const isCreateWindowOpen = ref(false);
const createWindowHandler = () => {
  resetInputsValue();
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
