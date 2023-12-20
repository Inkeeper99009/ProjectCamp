<!-- id
parking size - qm2
price pro Night
boolean electricity
boolean watter
boolean toilet
Textarea max.400 chars -->
<template>
  <span
    v-if="!list"
    class="flex justify-center items-center w-full h-screen text-xl animate-Smooth_Appear"
    >Hier gibt es keinen Stellplatz! Bitte erstellen Sie einen.</span
  >
  <div
    id="container"
    v-if="list"
    class="flex gap-4 flex-wrap w-full h-full p-4 pt-0 animate-Smooth_Appear"
  >
    <parkingRow
      v-for="(item, index) in list"
      :key="item"
      :object="item"
      :itemId="index"
      :showDelete="true"
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
        class="flex justify-between items-center absolute top-5 text-xl left-6 w-[21.8rem] self-start"
        >Neuen Stellplatz anlegen
        <font-awesome-icon
          @click="createWindowHandler"
          icon="fa-solid fa-xmark"
          class="hover:text-red-400 transition-all cursor-pointer text-xl"
      /></span>
      <div
        id="createInputs"
        class="flex flex-col mt-10 gap-4 justify-between items-center w-full"
      >
        <myInput
          :type="'number'"
          inputTitle="Parkplatzgröße (Quadratmeter - m2)"
          v-model="parkingSize"
        />
        <myInput
          :type="'number'"
          inputTitle="Preis pro Nacht ( € )"
          v-model="priceProNight"
        />
        <myInput
          :type="'checkbox'"
          checkBoxMsg="Strom vorhanden?"
          v-model="haveElectricity"
        />
        <myInput
          :type="'checkbox'"
          checkBoxMsg="Brauchen Sie Wasser?"
          v-model="haveWater"
        />
        <myInput
          :type="'checkbox'"
          checkBoxMsg="Brauchen Sie eine Toilette?"
          v-model="haveToilet"
        />
        <myInput
          :type="'textarea'"
          inputTitle="Zusätzlicher Kommentar"
          v-model="commentText"
        />
        <myButton
          :text="'Anlegen'"
          @click="
            writeParkingData(
              parkingSize,
              priceProNight,
              haveElectricity,
              haveWater,
              haveToilet,
              commentText
            )
          "
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
        :text="'Neuen Stellplatz anlegen'"
        class="w-max"
      />
    </div>
  </div>
</template>

<script setup>
import parkingRow from "../TableRows/parkingRow.vue";
import myButton from "../myButton.vue";
import myInput from "../myInput.vue";
import { useToast } from "vue-toastification";
import { onMounted, ref } from "vue";
import { getDatabase, ref as dbRef, onValue, set } from "firebase/database";

const parkingSize = ref(0);
const priceProNight = ref(0);
const haveElectricity = ref(false);
const haveWater = ref(false);
const haveToilet = ref(false);
const commentText = ref("");

const list = ref({});
const toast = useToast();

const writeParkingData = (
  parkingSize,
  priceProNight,
  haveElectricity,
  haveWater,
  haveToilet,
  commentText
) => {
  if (parkingSize === 0 || priceProNight === 0) {
    toast.info(
      "Stellplatzgröße und Preis pro Nacht dürfen nicht 0 oder leer sein!"
    );
    return;
  }
  const db = getDatabase();
  let idCounter = 0;
  if (list.value != null) {
    idCounter = Object.keys(list.value).length;
    console.log(idCounter);
  }
  const placeId = ref(idCounter);
  const reference = dbRef(db, "parkings/" + "platz" + (placeId.value + 1));
  set(reference, {
    parkingSize: parkingSize,
    priceProNight: priceProNight,
    haveElectricity: haveElectricity,
    haveWater: haveWater,
    haveToilet: haveToilet,
    commentText: commentText,
  });
  createWindowHandler();
};

const resetInputsValue = () => {
  parkingSize.value = 0;
  priceProNight.value = 0;
  haveElectricity.value = false;
  haveWater.value = false;
  haveToilet.value = false;
  commentText.value = "";
};
const isCreateWindowOpen = ref(false);
const createWindowHandler = () => {
  resetInputsValue();
  isCreateWindowOpen.value = !isCreateWindowOpen.value;
};
onMounted(() => {
  const db = getDatabase();
  let dbListLocation = dbRef(db, "parkings/");
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
