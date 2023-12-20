<!-- name of extra thing
price -->
<template>
  <div
    id="page"
    class="flex flex-wrap p-4 gap-4 w-full h-full animate-Smooth_Appear"

  >
    <div
      @click="showElectro = true"
      id="container"
      :class="{ ['hover:bg-sec']: !showElectro }"
      class="flex cursor-pointer flex-col items-center rounded-lg p-4 w-[20rem] h-[20rem] justify-center text-3xl gap-4 shadow-standart bg-container transition-all"
    >
      <span class="text-xl"> Strom </span>
      <font-awesome-icon icon="fa-solid fa-bolt" />
      <div class="flex items-center justify-center w-[10rem]">
        <myInput
          :type="'number'"
          v-model="electroCost"
          :placeholder="electroCost"
          v-if="showElectro"
        />
        <div :class="{ ['hidden']: showElectro }">{{ electroCost }}</div>
        €
      </div>
    </div>
    <div
      @click="showWater = true"
      id="container"
      :class="{ ['hover:bg-sec']: !showWater }"
      class="flex cursor-pointer flex-col items-center rounded-lg p-4 w-[20rem] h-[20rem] justify-center text-3xl gap-4 shadow-standart bg-container transition-all"
    >
      <span class="text-xl"> Wasser </span>
      <font-awesome-icon icon="fa-solid fa-droplet" />
      <div class="flex items-center justify-center w-[10rem]">
        <myInput
          :type="'number'"
          v-model="waterCost"
          :placeholder="waterCost"
          v-if="showWater"
        />
        <div :class="{ ['hidden']: showWater }">{{ waterCost }}</div>
        €
      </div>
    </div>

    <div
      @click="showToilet = true"
      id="container"
      :class="{ ['hover:bg-sec']: !showToilet }"
      class="flex cursor-pointer flex-col items-center rounded-lg p-4 w-[20rem] h-[20rem] justify-center text-3xl gap-4 shadow-standart bg-container transition-all"
    >
      <span class="text-xl"> Toilette </span>
      <font-awesome-icon icon="fa-solid fa-toilet" />
      <div class="flex items-center justify-center w-[10rem]">
        <myInput
          :type="'number'"
          v-model="toiletCost"
          :placeholder="toiletCost"
          v-if="showToilet"
        />
        <div :class="{ ['hidden']: showToilet }">{{ toiletCost }}</div>
        €
      </div>
    </div>
    <div
      @click="showAnimal = true"
      id="container"
      :class="{ ['hover:bg-sec']: !showAnimal }"
      class="flex cursor-pointer flex-col items-center rounded-lg p-4 w-[20rem] h-[20rem] justify-center text-3xl gap-4 shadow-standart bg-container transition-all"
    >
      <span class="text-xl"> Tiere </span>
      <font-awesome-icon icon="fa-solid fa-paw" />
      <div class="flex items-center justify-center w-[10rem]">
        <myInput
          :type="'number'"
          v-model="animalCost"
          :placeholder="animalCost"
          v-if="showAnimal"
        />
        <div :class="{ ['hidden']: showAnimal }">{{ animalCost }}</div>
        €
      </div>
    </div>
    <div
      @click="showAdult = true"
      id="container"
      :class="{ ['hover:bg-sec']: !showAdult }"
      class="flex cursor-pointer flex-col items-center rounded-lg p-4 w-[20rem] h-[20rem] justify-center text-3xl gap-4 shadow-standart bg-container transition-all"
    >
      <span class="text-xl"> Erwachsene </span>
      <font-awesome-icon icon="fa-solid fa-user" />
      <div class="flex items-center justify-center w-[10rem]">
        <myInput
          :type="'number'"
          v-model="adultCost"
          :placeholder="adultCost"
          v-if="showAdult"
        />
        <div :class="{ ['hidden']: showAdult }">{{ adultCost }}</div>
        €
      </div>
    </div>
    <div
      @click="showChild = true"
      :class="{ ['hover:bg-sec']: !showChild }"
      id="container"
      class="flex cursor-pointer flex-col items-center rounded-lg p-4 w-[20rem] h-[20rem] justify-center text-3xl gap-4 shadow-standart bg-container transition-all"
    >
      <span class="text-xl"> Kinder </span>
      <font-awesome-icon icon="fa-solid fa-children" />
      <div class="flex items-center justify-center w-[10rem]">
        <myInput
          :type="'number'"
          v-model="childCost"
          :placeholder="childCost"
          v-if="showChild"
        />
        <div :class="{ ['hidden']: showChild }">{{ childCost }}</div>
        €
      </div>
    </div>
  </div>
  <myButton
    @click="saveChanges"
    v-if="
      showElectro ||
      showWater ||
      showAnimal ||
      showToilet ||
      showAdult ||
      showChild
    "
    :text="'Speichern'"
    class="absolute animate-Smooth_Appear bottom-8 max-w-[10rem] right-8"
  />
</template>

<script setup>
import { onMounted, ref } from "vue";
import myInput from "../myInput.vue";
import myButton from "../myButton.vue";
import {
  getDatabase,
  ref as dbRef,
  onValue,
  set,
  remove,
} from "firebase/database";


const showElectro = ref(false);
const showWater = ref(false);
const showAnimal = ref(false);
const showToilet = ref(false);
const showAdult = ref(false);
const showChild = ref(false);

const electroCost = ref(3); //3
const waterCost = ref(0); //0
const animalCost = ref(2); //2
const toiletCost = ref(0); //0
const adultCost = ref(10); //10
const childCost = ref(5); //5

const closeAll = () => {
  showElectro.value = false;
  showWater.value = false;
  showAnimal.value = false;
  showToilet.value = false;
  showAdult.value = false;
  showChild.value = false;
};

const saveChanges = () => {
  saveElectroData(electroCost.value);
  saveWaterData(waterCost.value);
  saveAnimalData(animalCost.value);
  saveToiletData(toiletCost.value);
  saveAdultData(adultCost.value);
  saveChildData(childCost.value);
  closeAll();
};
const db = getDatabase();
const saveElectroData = (cost) => {
  const reference = dbRef(db, "costs/" + "Electro");
  set(reference, {
    cost: cost,
  });
};
const saveWaterData = (cost) => {
  const reference = dbRef(db, "costs/" + "Water");
  set(reference, {
    cost: cost,
  });
};
const saveAnimalData = (cost) => {
  const reference = dbRef(db, "costs/" + "Pets");
  set(reference, {
    cost: cost,
  });
};
const saveToiletData = (cost) => {
  const reference = dbRef(db, "costs/" + "Toilet");
  set(reference, {
    cost: cost,
  });
};
const saveAdultData = (cost) => {
  const reference = dbRef(db, "costs/" + "Adult");
  set(reference, {
    cost: cost,
  });
};
const saveChildData = (cost) => {
  const reference = dbRef(db, "costs/" + "Child");
  set(reference, {
    cost: cost,
  });
};
onMounted(() => {
  const db = getDatabase();
  let dbElectro = dbRef(db, "costs/" + "Electro");
  onValue(dbElectro, (snapshot) => {
    electroCost.value = snapshot.val().cost;
  });
  let dbWater = dbRef(db, "costs/" + "Water");
  onValue(dbWater, (snapshot) => {
    waterCost.value = snapshot.val().cost;
  });
  let dbPets = dbRef(db, "costs/" + "Pets");
  onValue(dbPets, (snapshot) => {
    animalCost.value = snapshot.val().cost;
  });
  let dbToilet = dbRef(db, "costs/" + "Toilet");
  onValue(dbToilet, (snapshot) => {
    toiletCost.value = snapshot.val().cost;
  });
  let dbAdult = dbRef(db, "costs/" + "Adult");
  onValue(dbAdult, (snapshot) => {
    adultCost.value = snapshot.val().cost;
  });
  let dbChild = dbRef(db, "costs/" + "Child");
  onValue(dbChild, (snapshot) => {
    childCost.value = snapshot.val().cost;
  });
});
</script>
