<template>
  <div
    id="container"
    class="flex gap-4 relative flex-col items-center rounded-lg p-4 w-[15rem] h-max shadow-standart bg-container transition-all"
    :class="{['hover:bg-sec']:!isLoading}"
  >
    <font-awesome-icon
      @click="deleteBooking"
      icon="fa-solid fa-xmark"
      class="text-red-400 hover:text-text w-4 h-4 p-1 rounded-full hover:bg-red-400 absolute top-2 right-2 transition-all cursor-pointer text-base"
    />
    {{ itemId }}
    <font-awesome-icon icon="fa-solid fa-tent" class="text-xl" />
    <div class="flex w-full flex-col">
      <span class="text-xs">Nachname</span>
      <span class="w-full truncate"> {{ guest.LastName }} </span>
    </div>
    <div class="flex w-full flex-col">
      <span class="text-xs">Vorname</span>
      <span class="w-full truncate"> {{ guest.FirstName }} </span>
    </div>
    <div class="flex w-full flex-col">
      <span class="text-xs">Geb. Datum</span>
      <span class="w-full truncate"> {{ guest.BDay }} </span>
    </div>
    <div class="flex w-full flex-col">
      <span class="text-xs">Stellplatz</span>
      <span class="w-full truncate"> {{ object.selectedParkig }} </span>
    </div>
    <div
      id="pricesSection"
      class="flex gap-4 relative flex-col items-center w-full justify-center"
    >
      <div
      v-if="isLoading"
        role="status"
        class="flex justify-center items-center absolute bg-container/90 w-full h-full"
      >
        <svg
          aria-hidden="true"
          class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-accent"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
      <div class="flex items-center justify-between w-full">
        <div id="left" class="flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-bolt" />
          <span>Strom</span>
        </div>
        <div id="right" class="flex items-center gap-2">
          <span>{{ electroCost }}</span
          ><span>€</span>
        </div>
      </div>
      <div class="flex items-center justify-between w-full">
        <div id="left" class="flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-droplet" />
          <span>Wasser</span>
        </div>
        <div id="right" class="flex items-center gap-2">
          <span>{{ waterCost }}</span
          ><span>€</span>
        </div>
      </div>
      <div class="flex items-center justify-between w-full">
        <div id="left" class="flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-toilet" />
          <span>Toilette</span>
        </div>
        <div id="right" class="flex items-center gap-2">
          <span>{{ toiletCost }}</span
          ><span>€</span>
        </div>
      </div>
      <div class="flex items-center justify-between gap-4 w-full">
        <div id="left" class="flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-user" />
          <span
            >Erwachsene - <span>{{ object.adultCount }}</span></span
          >
        </div>
        <div id="right" class="flex items-center gap-2">
          <span>{{ adultPrice }}</span
          ><span>€</span>
        </div>
      </div>
      <div class="flex items-center justify-between w-full">
        <div id="left" class="flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-children" />
          <span
            >Kinder - <span>{{ object.childCount }}</span></span
          >
        </div>
        <div id="right" class="flex items-center gap-2">
          <span>{{ childCost }}</span
          ><span>€</span>
        </div>
      </div>
      <div class="flex items-center justify-between w-full">
        <div id="left" class="flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-paw" />
          <span
            >Tiere - <span>{{ object.animalCount }}</span></span
          >
        </div>
        <div id="right" class="flex items-center gap-2">
          <span>{{ petsCost }}</span
          ><span>€</span>
        </div>
      </div>
      <div class="flex items-center justify-between w-full">
        <div id="left" class="flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-money-bill-wave" />
          <span>Gesamt</span>
        </div>
        <div id="right" class="flex items-center gap-2">
          <span>{{ endPrice }}</span
          ><span>€</span>
        </div>
      </div>
    </div>
    <div
      id="dateTime"
      class="flex flex-col mt-4 items-center justify-center w-full"
    >
      <span>Datum</span>
      <div class="flex w-full justify-between items-center">
        <div id="left" class="flex items-center gap-2">
          <span>{{ object.startDate }}</span>
        </div>
        <span> bis </span>
        <div id="right" class="flex items-center gap-2">
          <span>{{ object.endDate }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  getDatabase,
  ref as dbRef,
  onValue,
  set,
  remove,
} from "firebase/database";
import { onMounted, ref } from "vue";

const props = defineProps({
  object: Object,
  itemId: String,
});

const guest = ref({});
const parking = ref({});
const prices = ref({});
const isLoading = ref(false);

const electroCost = ref(0);
const waterCost = ref(0);
const toiletCost = ref(0);
const adultPrice = ref(0);
const childCost = ref(0);
const petsCost = ref(0);
const endPrice = ref(0);

const deleteBooking = () => {
  const db = getDatabase();
  const reference = dbRef(db, "bookings/" + props.itemId);
  remove(reference);
};
const isDeleteWindowOpen = ref(false);
const deleteWindowHandler = () => {
  isDeleteWindowOpen.value = !isDeleteWindowOpen.value;
};

const calculateCosts = () => {
  electroCost.value = prices.value.Electro.cost;
  waterCost.value = prices.value.Water.cost;
  toiletCost.value = prices.value.Toilet.cost;
  adultPrice.value = prices.value.Adult.cost * props.object.adultCount;
  childCost.value = prices.value.Child.cost * props.object.childCount;
  petsCost.value = prices.value.Pets.cost * props.object.animalCount;
  endPrice.value =
    electroCost.value +
    waterCost.value +
    toiletCost.value +
    adultPrice.value +
    childCost.value +
    petsCost.value;
};

onMounted(async () => {
  isLoading.value = true;
  const db = getDatabase();
  let dbGuestListLocation = await dbRef(
    db,
    "guest/" + props.object.selectedGuest
  );
  onValue(dbGuestListLocation, (snapshot) => {
    guest.value = snapshot.val();
  });
  let dbParkingListLocation = await dbRef(
    db,
    "parkings/" + props.object.selectedParkig
  );
  onValue(dbParkingListLocation, (snapshot) => {
    parking.value = snapshot.val();
  });
  let dbPrice = await dbRef(db, "costs/");
  onValue(dbPrice, (snapshot) => {
    prices.value = snapshot.val();
    console.log(prices.value);
  });
  setInterval(() => {
    calculateCosts();
    isLoading.value = false;
  }, 1000);
});
</script>
