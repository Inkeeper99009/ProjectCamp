<template>
  <div
    id="container"
    class="flex min-w-max items-center gap-8 border-y-sec border-y p-4 hover:bg-sec transition-all"
    @click="$emit('selectedUser', itemId)"
  >
    <!-- {{ itemId }} -->
    <div class="flex gap-8 items-center w-full">
      <font-awesome-icon icon="fa-regular fa-user" class="text-xl" />
      <div class="flex flex-col">
        <span class="text-xs">Login</span>
        <span class="max-w-[15rem] min-w-[15rem] truncate">{{ itemId }}</span>
      </div>
      <div class="flex flex-col">
        <span class="text-xs">Role</span>
        <span class="max-w-[15rem] min-w-[15rem] truncate">
          <span v-if="object.rights === 'admin'">Admin</span>
          <span v-if="object.rights === 'geschaefts'">Geschaeftsfuehrer</span>
          <span v-if="object.rights === 'sachbearbeiter'">Sachbearbeiter</span>
          <span v-if="object.rights === 'none'"
            >Keine Rechte / Gastbenutzer</span
          >
        </span>
      </div>
    </div>
    <font-awesome-icon
      icon="fa-solid fa-gear"
      class="text-xl ml-8 hover:text-accent transition-all"
      @click="modifyWindowHandler"
    />
    <font-awesome-icon
      v-if="!object.protected"
      icon="fa-regular fa-trash-can"
      class="text-xl hover:text-red-400 transition-all"
      @click="deleteWindowHandler"
    />
  </div>
  <div
    id="modifyWindow"
    v-if="isModifyWindowOpen"
    class="flex z-20 justify-center items-center w-full h-full top-0 left-0 bg-background/70 animate-Smooth_Appear_Fast absolute"
  >
    <div
      id="createWindowContent"
      class="flex relative flex-col justify-center items-center p-4 md:w-[25rem] md:h-[40rem] h-full w-full bg-container shadow-standart md:rounded-lg"
    >
      <span
        id="containerTitleAndCloseBtn"
        class="flex justify-between items-center text-xl w-full self-start"
        >Benutzer ändern
        <font-awesome-icon
          @click="modifyWindowHandler"
          icon="fa-solid fa-xmark"
          class="hover:text-red-400 transition-all cursor-pointer text-xl"
      /></span>
      <div
        id="modifyInputs"
        class="flex flex-col md:mt-10 mt-4 gap-4 justify-between items-center w-full h-full"
      >
        <!-- WorkAround dont know why it works like this -->
        <div class="flex flex-col w-full h-full gap-4 mt-10">
          <div
            id="inputContainer"
            class="px-2 border-y-0 w-full border-sec border-x-2 border-x-transparent hover:border-x-2 hover:border-x-sec transition-all"
          >
            <span class="text-xs">Passwort</span>
            <input
              type="password"
              class="flex placeholder:text-text/40 outline-none indent-2 px-2 p-1 w-full rounded-md bg-sec"
              v-model="Password"
            />
          </div>
          <div
            id="inputContainer"
            class="px-2 border-y-0 w-full border-sec border-x-2 border-x-transparent hover:border-x-2 hover:border-x-sec transition-all"
          >
            <span class="text-xs">Passwort wiederholen</span>
            <input
              type="password"
              class="flex placeholder:text-text/40 outline-none indent-2 px-2 p-1 w-full rounded-md bg-sec"
              v-model="PasswordRepeat"
            />
          </div>
          <div
            id="btnContainer"
            @click="keepPass"
            class="px-2 w-full border-y-0 border-accent border-x border-x-transparent hover:border-x hover:border-x-accent transition-all"
          >
            <button
              class="flex outline-none justify-center w-full items-center p-1 px-4 rounded-md text-text hover:opacity-95 hover:shadow-shadow transition-all"
              :class="{
                ['bg-accent']: keepPassActive,
                ['bg-sec']: !keepPassActive,
              }"
            >
              Passwort nicht ändern!
            </button>
          </div>
          <span class="w-full flex justify-center md:mr-0 mt-10  items-center">Rechte:</span>

          <div
            id="btnContainer"
            @click="selectRight('admin')"
            class="px-2 w-full border-y-0 border-accent border-x border-x-transparent hover:border-x hover:border-x-accent transition-all"
          >
            <button
              class="flex outline-none justify-center w-full items-center p-1 px-4 rounded-md text-text hover:opacity-95 hover:shadow-shadow transition-all"
              :class="{
                ['bg-accent']: Role === 'admin',
                ['bg-sec']: Role != 'admin',
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
                ['bg-accent']: Role === 'geschaefts',
                ['bg-sec']: Role != 'geschaefts',
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
                ['bg-accent']: Role === 'sachbearbeiter',
                ['bg-sec']: Role != 'sachbearbeiter',
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
                ['bg-accent']: Role === 'none',
                ['bg-sec']: Role != 'none',
              }"
            >
              Keine Rechte
            </button>
          </div>
        </div>
      </div>
      <myButton
        :text="'Speichern'"
        @click="saveUserData(Password, PasswordRepeat, Role)"
      />
    </div>
  </div>
  <div
    id="deleteWindow"
    v-if="isDeleteWindowOpen"
    class="flex z-20 justify-center items-center w-full h-full top-0 left-0 bg-background/70 animate-Smooth_Appear_Fast absolute"
  >
    <div
      id="deleteWindowContent"
      class="flex relative flex-col justify-center items-center p-4 md:w-[25rem] md:h-[30rem] w-full h-full bg-container shadow-standart md:rounded-lg"
    >
      <font-awesome-icon
        icon="fa-solid fa-triangle-exclamation"
        class="text-red-400 mb-4 text-2xl"
      />
      <span
        class="flex justify-center items-center text-3xl text-center w-full mb-4 text-red-400"
        >Möchten Sie diesen Benutzer wirklich löschen?</span
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
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

const props = defineProps({
  object: Object,
  itemId: String,
});

const Password = ref(props.object.password);
const PasswordRepeat = ref("");
const Role = ref(props.object.rights);
const keepPassActive = ref(false);

const keepPass = () => {
  keepPassActive.value = !keepPassActive.value;
  if (keepPassActive.value) {
    Password.value = props.object.password;
    PasswordRepeat.value = Password.value;
  } else {
    Password.value = "";
    PasswordRepeat.value = "";
  }
};

const toast = useToast();

const resetInputsValue = () => {
  Password.value = "";
  PasswordRepeat.value = "";
  Role.value = "";
  keepPassActive.value = false;
};

const selectRight = (string) => {
  Role.value = string;
};

const db = getDatabase();
const saveUserData = async (Password, PasswordRepeat, Role) => {
  if (Password === "" || PasswordRepeat === "" || Role === "") {
    toast.info("Alle Eingaben sollten ausgefüllt sein!");
    return;
  }
  if (Password != PasswordRepeat) {
    toast.error("Passwörter sind nicht gleich!");
    return;
  }
  const reference = await dbRef(db, "users/" + props.itemId);
  await set(reference, {
    password: Password,
    rights: Role,
  });
  modifyWindowHandler();
};
const isModifyWindowOpen = ref(false);
const modifyWindowHandler = () => {
  resetInputsValue();
  Role.value = props.object.rights;
  isModifyWindowOpen.value = !isModifyWindowOpen.value;
};

const deleteSelectedData = () => {
  const reference = dbRef(db, "users/" + props.itemId);
  remove(reference);
};

const isDeleteWindowOpen = ref(false);
const deleteWindowHandler = () => {
  isDeleteWindowOpen.value = !isDeleteWindowOpen.value;
};

onMounted(() => {
  Password.value = props.object.password;
  Role.value = props.object.rights;
});
</script>
