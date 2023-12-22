<template>
  <span
    v-if="!list"
    class="flex justify-center text-center items-center w-full h-full text-xl animate-Smooth_Appear"
    >Es gibt keine Buchungen! Bitte erstellen Sie eine.</span
  >
  <div
    id="container"
    v-if="list"
    class="flex flex-wrap justify-center md:justify-normal gap-4 w-full h-full p-4 pt-0 animate-Smooth_Appear"
  >
    <bookingRow
      v-for="(item, index) in list"
      :key="item"
      :object="item"
      :itemId="index"
    />
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
        :text="'Neue Buchung anlegen'"
        class="w-max"
      />
    </div>
  </div>
  <div
    id="createWindow"
    v-if="isCreateWindowOpen"
    class="flex z-20 justify-center items-center w-full h-full top-0 bg-background/70 animate-Smooth_Appear_Fast absolute"
  >
    <div
      id="createWindowContent"
      class="flex flex-col justify-center items-center p-4 md:w-[43rem] md:h-[35rem] h-full w-full bg-container shadow-standart rounded-lg"
    >
      <span
        id="containerTitleAndCloseBtn"
        class="flex justify-between items-center text-xl w-full self-start"
        >Neue Buchung anlegen
        <font-awesome-icon
          @click="createWindowHandler"
          icon="fa-solid fa-xmark"
          class="hover:text-red-400 transition-all cursor-pointer text-xl"
      /></span>
      <div
        id="modalContent"
        class="flex my-4 w-full h-full overflow-y-scroll no-scrollbar justify-center"
      >
        <div v-if="page === 1" id="page1Guest" class="flex w-full">
          <span
            v-if="!guestList"
            class="flex justify-center items-center w-full h-full text-xl animate-Smooth_Appear"
            >Hier gibt es keine Feriengäste! Bitte erstellen Sie einen.</span
          >
          <div v-if="guestList">
            <guestRowMini
              v-for="(item, index) in guestList"
              :key="item"
              :object="item"
              :itemId="index"
              @selectedUser="selectGuest"
            />
          </div>
        </div>
        <div
          v-if="page === 2"
          id="page2Place"
          class="flex gap-6 p-2 items-center overflow-x-scroll w-full h-full"
        >
          <span
            v-if="!parkingList"
            class="flex justify-center items-center w-full h-full text-xl animate-Smooth_Appear"
            >Hier gibt es keinen Stellplatz! Bitte erstellen Sie einen.</span
          >
          <div v-if="parkingList" class="flex gap-6">
            <parkingRow
              class="bg-sec hover:bg-white/5 cursor-pointer"
              v-for="(item, index) in parkingList"
              :key="item"
              :object="item"
              :itemId="index"
              :showDelete="false"
              @click="selectParking(index)"
            />
          </div>
        </div>
        <div
          v-if="page === 3"
          id="page3Another"
          class="flex flex-col gap-4 w-full h-full"
        >
          <div
            id="inputContainer"
            class="px-2 border-y-0 w-full border-sec border-x-2 border-x-transparent hover:border-x-2 hover:border-x-sec transition-all"
          >
            <span class="text-xs">Anzahl der Erwachsenen</span>
            <input
              min="1"
              type="number"
              class="flex placeholder:text-text/40 outline-none indent-2 px-2 p-1 w-full rounded-md bg-sec"
              v-model="adultCount"
            />
          </div>
          <div
            id="inputContainer"
            class="px-2 border-y-0 w-full border-sec border-x-2 border-x-transparent hover:border-x-2 hover:border-x-sec transition-all"
          >
            <span class="text-xs">Anzahl der Kinder</span>
            <input
              min="0"
              type="number"
              class="flex placeholder:text-text/40 outline-none indent-2 px-2 p-1 w-full rounded-md bg-sec"
              v-model="childCount"
            />
          </div>
          <div
            id="inputContainer"
            class="px-2 border-y-0 w-full border-sec border-x-2 border-x-transparent hover:border-x-2 hover:border-x-sec transition-all"
          >
            <span class="text-xs">Anzahl der Tiere</span>
            <input
              min="0"
              type="number"
              class="flex placeholder:text-text/40 outline-none indent-2 px-2 p-1 w-full rounded-md bg-sec"
              v-model="animalCount"
            />
          </div>
          <div
            id="inputContainer"
            class="px-2 border-y-0 w-full border-sec border-x-2 border-x-transparent hover:border-x-2 hover:border-x-sec transition-all"
          >
            <span class="text-xs">Start Date</span>
            <input
              type="date"
              class="flex placeholder:text-text/40 outline-none indent-2 px-2 p-1 w-full rounded-md bg-sec"
              v-model="startDate"
            />
          </div>
          <div
            id="inputContainer"
            class="px-2 border-y-0 w-full border-sec border-x-2 border-x-transparent hover:border-x-2 hover:border-x-sec transition-all"
          >
            <span class="text-xs">End Date</span>
            <input
              type="date"
              class="flex placeholder:text-text/40 outline-none indent-2 px-2 p-1 w-full rounded-md bg-sec"
              v-model="endDate"
            />
          </div>
          <div
            id="inputContainer"
            class="border-y-0 w-full border-sec border-x-2 border-x-transparent hover:border-x-2 hover:border-x-sec transition-all"
          >
          <myInput
            :type="'textarea'"
            inputTitle="Bitte notieren Sie die Namen aller Personen und deren Alter. (Optional)"
            :placeholder="'Beispiel - Name Vorname : 18'"
            v-model="commentText"
          />
          </div>
        </div>
      </div>
      <div
        id="pageSelector"
        class="flex w-full justify-between text-lg items-center"
      >
        <font-awesome-icon
          icon="fa-solid fa-chevron-left"
          class="rounded-full hover:bg-sec w-4 h-4 p-4 cursor-pointer transition-all animate-Smooth_Appear"
          @click="changePage('back')"
        />
        <div id="dotsPlace" class="flex gap-4 text-sec/50 text-xs">
          <font-awesome-icon
            icon="fa-solid fa-circle"
            :class="{ ['text-text/40']: page === 1 }"
            class="transition-all"
          />
          <font-awesome-icon
            icon="fa-solid fa-circle"
            :class="{ ['text-text/40']: page === 2 }"
            class="transition-all"
          />
          <font-awesome-icon
            icon="fa-solid fa-circle"
            :class="{ ['text-text/40']: page === 3 }"
            class="transition-all"
          />
        </div>
        <font-awesome-icon
          v-if="page != 3"
          icon="fa-solid fa-chevron-right"
          class="rounded-full hover:bg-sec w-4 h-4 p-4 cursor-pointer transition-all animate-Smooth_Appear"
          @click="changePage('next')"
        />
        <font-awesome-icon
          v-if="page === 3"
          icon="fa-solid fa-check"
          class="rounded-full hover:bg-emerald-400/30 w-4 h-4 p-4 cursor-pointer transition-all animate-Smooth_Appear"
          @click="
            createBooking(
              selectedGuest,
              selectedParking,
              adultCount,
              childCount,
              animalCount,
              startDate,
              endDate,
              commentText
            )
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import bookingRow from "../TableRows/bookingRow.vue";
import myButton from "../myButton.vue";
import myInput from "../myInput.vue";
import guestRowMini from "../TableRows/guestRowMINI.vue";
import parkingRow from "../TableRows/parkingRow.vue";
import { useToast } from "vue-toastification";
import { getDatabase, ref as dbRef, onValue, set } from "firebase/database";
import { onMounted, ref } from "vue";

const toast = useToast();
const list = ref({});

const guestList = ref();
const parkingList = ref();
const adultCount = ref(1);
const childCount = ref(0);
const animalCount = ref(0);
const startDate = ref("");
const endDate = ref("");
const selectedGuest = ref("");
const selectedParking = ref("");
const commentText = ref("")

const refreshInputs = () => {
  page.value = 1;
  adultCount.value = 1;
  childCount.value = 0;
  animalCount.value = 0;
  startDate.value = "";
  endDate.value = "";
  selectedGuest.value = "";
  selectedParking.value = "";
  commentText.value = "";
};
const page = ref(1);
const changePage = (value) => {
  if (value === "next" && page.value != 3) {
    page.value += 1;
  }
  if (value === "back" && page.value != 1) {
    page.value -= 1;
  }
};
const isCreateWindowOpen = ref(false);
const createWindowHandler = () => {
  refreshInputs();
  isCreateWindowOpen.value = !isCreateWindowOpen.value;
};

const selectGuest = (v) => {
  selectedGuest.value = v;
  page.value += 1;
  toast.success("Der Kunde wurde erfolgreich ausgewählt!");
};
const selectParking = (v) => {
  selectedParking.value = v;
  page.value += 1;
  toast.success("Der Campingplatz wurde erfolgreich ausgewählt!");
};
const createBooking = (
  selectedGuest,
  selectedParkig,
  adultCount,
  childCount,
  animalCount,
  startDate,
  endDate,
  commentText
) => {
  if (
    selectedGuest === "" ||
    selectedParkig === "" ||
    adultCount === 0 ||
    startDate === "" ||
    endDate === ""
  ) {
    toast.info(
      "Diese Reservierung konnte nicht erstellt werden! Stellen Sie sicher, dass alle Eingaben vollständig sind und Sie einen Gast und einen Campingplatz ausgewählt haben."
    );
    return;
  }
  if (startDate > endDate) {
    toast.error("Das Enddatum darf nicht vor dem aktuellen Startdatum liegen!");
    return;
  }
  const db = getDatabase();
  let idCounter = 0;
  if (list.value != null) {
    idCounter = Object.keys(list.value).length;
    console.log(idCounter);
  }
  const bookingId = ref(idCounter);
  const reference = dbRef(db, "bookings/" + "booking" + (bookingId.value + 1));
  set(reference, {
    selectedGuest: selectedGuest,
    selectedParkig: selectedParkig,
    adultCount: adultCount,
    childCount: childCount,
    animalCount: animalCount,
    startDate: startDate,
    endDate: endDate,
    userComment:commentText
  });
  createWindowHandler();
};

onMounted(async () => {
  const db = getDatabase();
  let dbListLocation = await dbRef(db, "bookings/");
  onValue(dbListLocation, (snapshot) => {
    list.value = snapshot.val();
  });
  let dbGuestListLocation = await dbRef(db, "guest/");
  onValue(dbGuestListLocation, (snapshot) => {
    guestList.value = snapshot.val();
  });
  let dbParkingListLocation = await dbRef(db, "parkings/");
  onValue(dbParkingListLocation, (snapshot) => {
    parkingList.value = snapshot.val();
  });
});
</script>
<style scoped>
#bottomMenu {
  animation-delay: 0.7s;
}
</style>
