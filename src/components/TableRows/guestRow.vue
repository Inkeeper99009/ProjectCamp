<template>
  <div
    id="container"
    class="flex w-max items-center gap-8 border-y-sec border-y p-4 hover:bg-sec transition-all cursor-pointer"
  >
    <!-- {{ itemId }} -->
    <div class="flex gap-8 items-center w-full">
      <font-awesome-icon icon="fa-regular fa-user" class="text-xl" />
      <div class="flex flex-col">
        <span class="text-xs">Nachname</span>
        <span class="max-w-[10rem] min-w-[10rem] truncate">{{
          object.LastName
        }}</span>
      </div>
      <div class="flex flex-col">
        <span class="text-xs">Vorname</span>
        <span class="max-w-[10rem] min-w-[10rem] truncate">{{
          object.FirstName
        }}</span>
      </div>
      <div class="flex flex-col">
        <span class="text-xs">Geb. Datum</span>
        <span class="max-w-[10rem] min-w-[10rem] truncate">{{
          object.BDay
        }}</span>
      </div>
      <div class="flex flex-col">
        <span class="text-xs">Tel.</span>
        <span class="max-w-[10rem] min-w-[10rem] truncate">{{
          object.Tel
        }}</span>
      </div>
      <div class="flex flex-col">
        <span class="text-xs">E-mail</span>
        <span class="max-w-[10rem] min-w-[10rem] truncate">{{
          object.Email
        }}</span>
      </div>
      <div class="flex flex-col">
        <span class="text-xs">Anschrift</span>
        <span class="max-w-[15rem] min-w-[15rem] truncate">{{
          object.Adress
        }}</span>
      </div>
    </div>
    <font-awesome-icon
      icon="fa-solid fa-gear"
      class="text-xl ml-8 hover:text-accent transition-all"
      @click="modifyWindowHandler"
    />
    <font-awesome-icon
      icon="fa-regular fa-trash-can"
      class="text-xl hover:text-red-400 transition-all"
      @click="deleteWindowHandler"
    />
  </div>
  <div
    id="deleteWindow"
    v-if="isDeleteWindowOpen"
    class="flex z-20 justify-center items-center w-full h-full top-0 left-0 bg-background/70 animate-Smooth_Appear_Fast absolute"
  >
    <div
      id="deleteWindowContent"
      class="flex relative flex-col justify-center items-center p-4 w-[25rem] h-[30rem] bg-container shadow-standart rounded-lg"
    >
      <font-awesome-icon
        icon="fa-solid fa-triangle-exclamation"
        class="text-red-400 mb-4 text-2xl"
      />
      <span
        class="flex justify-center items-center text-3xl text-center w-full mb-4 text-red-400"
        >Möchten Sie diese Datei wirklich löschen?</span
      >
      <div
        id="btnContainer"
        class="flex w-full justify-center gap-16 mt-8 items-center"
      >
        <div
          @click="deleteSelectedData"
          id="leftBtnContainer"
          class="px-2 border-y-0 opacity-75 border-red-400 cursor-pointer border-x border-x-transparent text-text/30 hover:border-x hover:text-red-400 hover:border-x-red-400 transition-all"
        >
          <div class="flex gap-2 justify-center items-center text-2xl">Ja</div>
        </div>
        <div
          @click="deleteWindowHandler"
          id="rightBtnContainer"
          class="px-2 border-y-0 border-text cursor-pointer border-x border-x-transparent hover:border-x hover:border-text transition-all"
        >
          <div
            class="flex gap-2 justify-center text-text items-center transition-all text-2xl"
          >
            Nein
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    id="modifyWindow"
    v-if="isModifyWindowOpen"
    class="flex z-20 justify-center items-center w-full h-full top-0 left-0 bg-background/70 animate-Smooth_Appear_Fast absolute"
  >
    <div
      id="createWindowContent"
      class="flex relative flex-col justify-center items-center p-4 w-[25rem] h-[35rem] bg-container shadow-standart rounded-lg"
    >
      <span
        id="containerTitleAndCloseBtn"
        class="flex justify-between items-center absolute top-7 text-xl left-8 w-[21rem] self-start"
        >Kunden ändern
        <font-awesome-icon
          @click="modifyWindowHandler"
          icon="fa-solid fa-xmark"
          class="hover:text-red-400 transition-all cursor-pointer text-xl"
      /></span>
      <div
        id="modifyInputs"
        class="flex flex-col mt-10 gap-4 justify-between items-center w-full"
      >
        <!-- WorkAround dont know why it works like this -->
        <div
          id="inputContainer"
          class="px-2 border-y-0 w-full border-sec border-x-2 border-x-transparent hover:border-x-2 hover:border-x-sec transition-all"
        >
          <span class="text-xs">Nachname</span>
          <input
            type="text"
            class="flex placeholder:text-text/40 outline-none indent-2 px-2 p-1 w-full rounded-md bg-sec"
            v-model="Nachname"
          />
        </div>
        <div
          id="inputContainer"
          class="px-2 border-y-0 w-full border-sec border-x-2 border-x-transparent hover:border-x-2 hover:border-x-sec transition-all"
        >
          <span class="text-xs">Vorname</span>
          <input
            type="text"
            class="flex placeholder:text-text/40 outline-none indent-2 px-2 p-1 w-full rounded-md bg-sec"
            v-model="Vorname"
          />
        </div>
        <div
          id="inputContainer"
          class="px-2 border-y-0 w-full border-sec border-x-2 border-x-transparent hover:border-x-2 hover:border-x-sec transition-all"
        >
          <span class="text-xs">Geb. Datum</span>
          <input
            type="date"
            class="flex placeholder:text-text/40 outline-none indent-2 px-2 p-1 w-full rounded-md bg-sec"
            v-model="BDay"
          />
        </div>
        <div
          id="inputContainer"
          class="px-2 border-y-0 w-full border-sec border-x-2 border-x-transparent hover:border-x-2 hover:border-x-sec transition-all"
        >
          <span class="text-xs">Tel.</span>
          <input
            type="text"
            class="flex placeholder:text-text/40 outline-none indent-2 px-2 p-1 w-full rounded-md bg-sec"
            v-model="Tel"
          />
        </div>
        <div
          id="inputContainer"
          class="px-2 border-y-0 w-full border-sec border-x-2 border-x-transparent hover:border-x-2 hover:border-x-sec transition-all"
        >
          <span class="text-xs">E-mail</span>

          <input
            type="text"
            class="flex placeholder:text-text/40 outline-none indent-2 px-2 p-1 w-full rounded-md bg-sec"
            v-model="Email"
          />
        </div>
        <div
          id="inputContainer"
          class="px-2 border-y-0 w-full border-sec border-x-2 border-x-transparent hover:border-x-2 hover:border-x-sec transition-all"
        >
          <span class="text-xs">Anschrift</span>
          <input
            type="text"
            class="flex placeholder:text-text/40 outline-none indent-2 px-2 p-1 w-full rounded-md bg-sec"
            v-model="Adress"
          />
        </div>
        <myButton
          :text="'Speichern'"
          @click="saveGuestData(Nachname, Vorname, BDay, Tel, Email, Adress)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import myButton from "../myButton.vue";
import {
  getDatabase,
  ref as dbRef,
  onValue,
  set,
  remove,
} from "firebase/database";
import { ref } from "vue";

const props = defineProps({
  object: Object,
  itemId: String,
});

const Nachname = ref(props.object.LastName);
const Vorname = ref(props.object.FirstName);
const BDay = ref(props.object.BDay);
const Tel = ref(props.object.Tel);
const Email = ref(props.object.Email);
const Adress = ref(props.object.Adress);

const db = getDatabase();
const saveGuestData = (Nachname, Vorname, BDay, Tel, Email, Adress) => {
  const reference = dbRef(db, "guest/" + props.itemId);
  set(reference, {
    LastName: Nachname,
    FirstName: Vorname,
    BDay: BDay,
    Tel: Tel,
    Email: Email,
    Adress: Adress,
  });
  modifyWindowHandler();
};
const deleteSelectedData = () => {
  const reference = dbRef(db, "guest/" + props.itemId);
  remove(reference);
};
const isDeleteWindowOpen = ref(false);
const deleteWindowHandler = () => {
  isDeleteWindowOpen.value = !isDeleteWindowOpen.value;
};
const isModifyWindowOpen = ref(false);
const modifyWindowHandler = () => {
  isModifyWindowOpen.value = !isModifyWindowOpen.value;
};
</script>
