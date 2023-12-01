<template>
  <div
    id="page"
    class="flex flex-col h-screen w-screen text-text bg-background no-scrollbar"
  >
    <topBar @selectedTab="selectTab" :isAdmin="isAdmin" class="animate-Smooth_Appear" />
    <div v-if="!isAdmin"
      id="content"
      class="flex h-full animate-Smooth_Appear overflow-y-scroll no-scrollbar"
    >
      <guestsTable v-if="selectedTabNumber === 1" />
      <bookingsTable v-if="selectedTabNumber === 2" />
      <parkingTable v-if="selectedTabNumber === 3" />
      <extraCostTable v-if="selectedTabNumber === 4" />
    </div>
    <div v-if="isAdmin" id="adminWindow" class="flex h-full w-full">
    </div>
  </div>
</template>

<script setup>
import topBar from "../components/topBar.vue";
import guestsTable from "../components/Tables/guestsTable.vue";
import bookingsTable from "../components/Tables/bookingsTable.vue";
import parkingTable from "../components/Tables/parkingTable.vue";
import extraCostTable from "../components/Tables/extraCostTable.vue";
import { getDatabase, ref as dbRef, onValue, set } from "firebase/database";
import { onMounted, ref } from "vue";
import router from "../router";

const isAdmin = ref(false);
const isSb = ref(false);
const isGf = ref(false);
const resetRights = () => {
  isAdmin.value = false;
  isSb.value = false;
  isGf.value = false;
};
const selectedTabNumber = ref(1);

const selectTab = (num) => {
  selectedTabNumber.value = num;
};
onMounted(() => {
  const db = getDatabase();
  let id = localStorage.getItem("storedData");
  let dbResult = dbRef(db, "users/" + id);
  onValue(dbResult, (snapshot) => {
    let currentUser = snapshot.val();
    resetRights();
    if(currentUser!=null){
    switch (currentUser.rights) {
      case "admin":
        isAdmin.value = true;
        break;
      case "sachbearbeiter":
        isSb.value = true;
        break;
      case "geschaefts":
        isGf.value = true;
        break;
       }
    }else{
      router.push('/')
    }
  });
});
</script>

<style scoped>
#createUsersContent {
  animation-delay: 0.7s;
}</style>
