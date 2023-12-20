<template>
  <span
    v-if="!list"
    class="flex justify-center items-center w-full h-full text-xl animate-Smooth_Appear"
    >Liste ist leer!</span
  >
  <div
    v-if="list"
    id="container"
    class="flex flex-col w-full h-full p-4 pt-0 animate-Smooth_Appear"
  >
  <adminRow
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
      class="flex relative flex-col justify-center items-center p-4 w-[25rem] h-[40rem] bg-container shadow-standart rounded-lg"
    >
      <span
        id="containerTitleAndCloseBtn"
        class="flex justify-between items-center absolute top-7 text-xl left-7 w-[21.5rem] self-start"
        >Neuen Benutzer anlegen
        <font-awesome-icon
          @click="createWindowHandler"
          icon="fa-solid fa-xmark"
          class="hover:text-red-400 transition-all cursor-pointer text-xl"
      /></span>
      <div
        id="createInputs"
        class="flex flex-col mt-10 gap-4 justify-between items-center h-full w-full"
      >
        <div class="flex flex-col w-full h-full mt-4 gap-4">
          <myInput
            :type="'text'"
            :placeholder="'Login'"
            inputTitle="Login"
            v-model="Login"
          />
          <myInput
            :type="'password'"
            :placeholder="'Passwort'"
            inputTitle="Passwort"
            v-model="Password"
          />
          <myInput
            :type="'password'"
            :placeholder="'Passwort wiederholen'"
            inputTitle="Passwort wiederholen"
            v-model="PasswordRepeat"
          />
          <span class="w-full flex justify-center items-center">Rechte:</span>
          <div
            id="btnContainer"
            @click="selectRight('admin')"
            class="px-2 w-full border-y-0 border-accent border-x border-x-transparent hover:border-x hover:border-x-accent transition-all"
          >
            <button
              class="flex outline-none justify-center w-full items-center p-1 px-4 rounded-md text-text hover:opacity-95 hover:shadow-shadow transition-all"
              :class="{
                ['bg-accent']: Right === 'admin',
                ['bg-sec']: Right != 'admin',
              }"
            >
              Admin
            </button>
          </div>
          <div
            id="btnContainer"
            @click="selectRight('geschaefts')"
            class="px-2 w-full border-y-0 border-accent border-x border-x-transparent hover:border-x hover:border-x-accent transition-all"
          >
            <button
              class="flex outline-none justify-center w-full items-center p-1 px-4 rounded-md text-text hover:opacity-95 hover:shadow-shadow transition-all"
              :class="{
                ['bg-accent']: Right === 'geschaefts',
                ['bg-sec']: Right != 'geschaefts',
              }"
            >
              Geschaeftsfuehrer
            </button>
          </div>
          <div
            id="btnContainer"
            @click="selectRight('sachbearbeiter')"
            class="px-2 w-full border-y-0 border-accent border-x border-x-transparent hover:border-x hover:border-x-accent transition-all"
          >
            <button
              class="flex outline-none justify-center w-full items-center p-1 px-4 rounded-md text-text hover:opacity-95 hover:shadow-shadow transition-all"
              :class="{
                ['bg-accent']: Right === 'sachbearbeiter',
                ['bg-sec']: Right != 'sachbearbeiter',
              }"
            >
              Sachbearbeiter
            </button>
          </div>
          <div
            id="btnContainer"
            @click="selectRight('none')"
            class="px-2 w-full border-y-0 border-accent border-x border-x-transparent hover:border-x hover:border-x-accent transition-all"
          >
            <button
              class="flex outline-none justify-center w-full items-center p-1 px-4 rounded-md text-text hover:opacity-95 hover:shadow-shadow transition-all"
              :class="{
                ['bg-accent']: Right === 'none',
                ['bg-sec']: Right != 'none',
              }"
            >
              Keine Rechte
            </button>
          </div>
        </div>
        <myButton
          :text="'Anlegen'"
          @click="writeGuestData(Login, Password, PasswordRepeat, Right)"
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
        :text="'Neuen Benutzer anlegen'"
        class="w-max"
      />
    </div>
  </div>
</template>

<script setup>
import myButton from "../components/myButton.vue";
import myInput from "../components/myInput.vue";
import adminRow from "./TableRows/adminRow.vue"
import { useToast } from "vue-toastification";
import { onMounted, ref } from "vue";
import { getDatabase, ref as dbRef, onValue, set } from "firebase/database";

const Login = ref("");
const Password = ref("");
const PasswordRepeat = ref("");
const Right = ref("");

const selectRight = (string) => {
  Right.value = string;
};

const list = ref({});
const toast = useToast();

const writeGuestData = (Login, Password, PasswordRepeat, Right) => {
  if (
    Login === "" ||
    Password === "" ||
    PasswordRepeat === "" ||
    Right === ""
  ) {
    toast.info("Alle Eingaben sollten ausgefüllt sein!");
    return;
  }
  if (Password != PasswordRepeat) {
    toast.error("Passwörter sind nicht gleich!");
    return;
  }
  const db = getDatabase();
  const reference = dbRef(db, "users/" + Login);
  set(reference, {
    password: Password,
    rights: Right,
  });
  createWindowHandler();
};

const resetInputsValue = () => {
  Login.value = "";
  Password.value = "";
  PasswordRepeat.value = "";
  Right.value = "";
};
const isCreateWindowOpen = ref(false);
const createWindowHandler = () => {
  resetInputsValue();
  isCreateWindowOpen.value = !isCreateWindowOpen.value;
};
onMounted(() => {
  const db = getDatabase();
  let dbListLocation = dbRef(db, "users/");
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
