<template>
  <div
    id="container"
    class="flex relative flex-col items-center rounded-lg p-4 w-[15rem] h-[20rem] min-w-[15rem] min-h-[20rem] shadow-standart bg-container hover:bg-sec transition-all"
  >
  <font-awesome-icon
          @click="deleteParkingPlace"
          icon="fa-solid fa-xmark"
          class="text-red-400 hover:text-text w-4 h-4 p-1 rounded-full hover:bg-red-400 absolute top-2 right-2 transition-all cursor-pointer text-base"
      />
  {{ itemId }}
    <font-awesome-icon
      icon="fa-solid fa-map-location-dot"
      class="text-4xl"
    />
    <div id="line" class="flex w-full border-b border-text/10 mt-8"></div>
    <div id="infoContainer" class="flex flex-col w-full mt-4">
      <div class="flex w-full justify-between">
        <span class="flex justify-center items-center gap-2"
          ><font-awesome-icon icon="fa-solid fa-maximize" />{{
            object.parkingSize
          }}
          ㎡</span
        >
        <span class="flex justify-center items-center gap-2"
          ><font-awesome-icon icon="fa-solid fa-money-bill-wave" />{{
            object.priceProNight
          }}
          €</span
        >
      </div>
      <div id="iconRow" class="flex w-full justify-between mt-4">
        <span
          :class="{
            ['text-red-400']: !object.haveElectricity,
            [' text-emerald-400']: object.haveElectricity,
          }"
          ><font-awesome-icon icon="fa-solid fa-bolt"
        /></span>
        <span
          :class="{
            ['text-red-400']: !object.haveWater,
            [' text-emerald-400']: object.haveWater,
          }"
          ><font-awesome-icon icon="fa-solid fa-droplet"
        /></span>
        <span
          :class="{
            ['text-red-400']: !object.haveToilet,
            [' text-emerald-400']: object.haveToilet,
          }"
          ><font-awesome-icon icon="fa-solid fa-toilet"
        /></span>
      </div>
      <div class="flex flex-col w-full mt-4 gap-1">
        <span class="text-xs">Zusätzlicher Kommentar</span>
        <textarea
          readonly
          v-model="object.commentText"
          class="outline-none bg-text/10 cursor-default rounded-md w-full h-[5rem] resize-none p-3 py-1"
        ></textarea>
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
import { ref } from "vue";

const props = defineProps({
  object: Object,
  itemId: String,
});

const parkingSize = ref(0);
const priceProNight = ref(0);
const haveElectricity = ref(false);
const haveWater = ref(false);
const haveToilet = ref(false);
const commentText = ref("");

const db = getDatabase();
const savePlaceData = (
  parkingSize,
  priceProNight,
  haveElectricity,
  haveWater,
  haveToilet,
  commentText
) => {
  const reference = dbRef(db, "parkings/" + props.itemId);
  set(reference, {
    parkingSize: parkingSize,
    priceProNight: priceProNight,
    haveElectricity: haveElectricity,
    haveWater: haveWater,
    haveToilet: haveToilet,
    commentText: commentText,
  });
  modifyWindowHandler();
};
const deleteSelectedData = () => {
  const reference = dbRef(db, "parkings/" + props.itemId);
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

const deleteParkingPlace =()=>{
  const reference = dbRef(db, "parkings/" + props.itemId);
  remove(reference);
}
</script>
