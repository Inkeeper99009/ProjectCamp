<template>
  <span
    v-if="!list"
    class="flex justify-center items-center w-full h-full text-xl animate-Smooth_Appear"
    >Es gibt keine Buchungen! Bitte erstellen Sie eines.</span
  >
  <div
    id="container"
    v-if="list"
    class="flex flex-wrap gap-4 w-full h-full p-4 pt-0 animate-Smooth_Appear"
  >
    <div v-for="(item, index) in list" :key="item">
      <bookingRow
        v-if="item.userReference === userReference"
        :key="item"
        :object="item"
        :itemId="index"
      />
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
      class="flex flex-col justify-center items-center p-4 w-[43rem] h-[35rem] bg-container shadow-standart rounded-lg"
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
        class="flex w-full h-full overflow-y-scroll no-scrollbar justify-center"
      >
        <div
          v-if="page === 1"
          id="page1Guest"
          class="flex flex-col w-full h-full"
        >
          <div
            id="createInputs"
            class="flex flex-col mt-4 gap-4 justify-between items-center w-full"
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
            >Hier gibt es keinen Stellplatz! Ein Mitarbeiter muss eines
            erstellen.</span
          >
          <div v-if="parkingList" class="flex gap-6">
            <parkingRow
              class="bg-sec hover:bg-white/5 cursor-pointer"
              v-for="(item, index) in parkingList"
              :key="item"
              :object="item"
              :itemId="index"
              @click="selectParking(index)"
            />
          </div>
        </div>
        <div
          v-if="page === 3"
          id="page3Another"
          class="flex flex-col w-full h-full mt-4 gap-4"
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
              selectedParking,
              adultCount,
              childCount,
              animalCount,
              startDate,
              endDate,
              Nachname,
              Vorname,
              BDay,
              Tel,
              Email,
              Adress
            )
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import bookingRow from "../components/tablerows/bookingrow.vue";
import myButton from "../components/myButton.vue";
import myInput from "./myInput.vue";
import parkingRow from "../components/tablerows/parkingrow.vue";
import { useToast } from "vue-toastification";
import { getDatabase, ref as dbRef, onValue, set } from "firebase/database";
import { onMounted, ref } from "vue";

const props = defineProps({
  userReference: String,
});

const toast = useToast();
const list = ref({});

const Nachname = ref("");
const Vorname = ref("");
const BDay = ref("");
const Tel = ref("");
const Email = ref("");
const Adress = ref("");

const guestList = ref();
const parkingList = ref();
const adultCount = ref(1);
const childCount = ref(0);
const animalCount = ref(0);
const startDate = ref("");
const endDate = ref("");
const selectedGuest = ref("");
const selectedParking = ref("");

const refreshInputs = () => {
  page.value = 1;
  adultCount.value = 1;
  childCount.value = 0;
  animalCount.value = 0;
  startDate.value = "";
  endDate.value = "";
  selectedGuest.value = "";
  selectedParking.value = "";
  Nachname.value = "";
  Vorname.value = "";
  BDay.value = "";
  Tel.value = "";
  Email.value = "";
  Adress.value = "";
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

const selectParking = (v) => {
  selectedParking.value = v;
  page.value += 1;
  toast.success("Der Campingplatz wurde erfolgreich ausgewählt!");
};
const createBooking = (
  selectedParkig,
  adultCount,
  childCount,
  animalCount,
  startDate,
  endDate,
  Nachname,
  Vorname,
  BDay,
  Tel,
  Email,
  Adress
) => {
  if (
    selectedParkig === "" ||
    adultCount === 0 ||
    startDate === "" ||
    endDate === "" ||
    Nachname === "" ||
    Vorname === "" ||
    BDay === "" ||
    Tel === "" ||
    Email === "" ||
    Adress === ""
  ) {
    toast.info(
      "Diese Reservierung konnte nicht erstellt werden! Stellen Sie sicher, dass alle Eingaben vollständig sind und Sie einen Parkplatz ausgewählt haben."
    );
    return;
  }
  const db = getDatabase();
  let idCounter = 0;
  let guestCounter = 0;
  if (guestList.value != null) {
    guestCounter = Object.keys(guestList.value).length;
  }
  if (list.value != null) {
    idCounter = Object.keys(list.value).length;
  }
  const bookingId = ref(idCounter);
  const guestId = ref(guestCounter);
  const guestReference = dbRef(db, "guest/" + "guest" + (guestId.value + 1));
  set(guestReference, {
    LastName: Nachname,
    FirstName: Vorname,
    BDay: BDay,
    Tel: Tel,
    Email: Email,
    Adress: Adress,
  });
  const bookingReference = dbRef(
    db,
    "bookings/" + "booking" + (bookingId.value + 1)
  );
  set(bookingReference, {
    selectedGuest: "guest" + (guestId.value + 1),
    selectedParkig: selectedParkig,
    adultCount: adultCount,
    childCount: childCount,
    animalCount: animalCount,
    startDate: startDate,
    endDate: endDate,
    userReference: props.userReference,
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
