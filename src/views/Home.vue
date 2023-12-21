<template>
  <div
    id="page"
    class="flex flex-col h-screen w-screen text-text bg-background no-scrollbar"
  >
    <topBar
      @selectedTab="selectTab"
      :isAdmin="isAdmin"
      :isGuest="isGuest"
      class="animate-Smooth_Appear"
    />
    <div
      v-if="!isAdmin"
      :class="{
        ['flex w-full h-full overflow-y-scroll no-scrollbar mb-[4.5rem]']:
          !isGuest,
      }"
    >
      <div
        v-if="!isGuest"
        id="content"
        class="flex w-full h-full animate-Smooth_Appear"
      >
        <guestsTable v-if="selectedTabNumber === 1" />
        <bookingsTable v-if="selectedTabNumber === 2" />
        <parkingTable v-if="selectedTabNumber === 3" />
        <extraCostTable v-if="selectedTabNumber === 4" />
      </div>
    </div>

    <div
      v-if="isAdmin"
      id="adminWindow"
      class="flex w-full h-full overflow-y-scroll no-scrollbar mb-[4.5rem]"
    >
      <windowAdmin />
    </div>
    <div
      v-if="isGuest"
      id="guestWindow"
      class="flex w-full h-full overflow-y-scroll no-scrollbar mb-[4.5rem]"
    >
      <windowGuest :userReference="userReference" />
    </div>
  </div>
</template>

<script setup>
import topBar from "../components/topBar.vue";
import guestsTable from "../components/Tables/guestsTable.vue";
import bookingsTable from "../components/Tables/bookingsTable.vue";
import parkingTable from "../components/Tables/parkingTable.vue";
import extraCostTable from "../components/Tables/extraCostTable.vue";
import windowAdmin from "../components/windowAdmin.vue";
import windowGuest from "../components/windowGuest.vue";
import { getDatabase, ref as dbRef, onValue, set } from "firebase/database";
import { onMounted, ref } from "vue";
import router from "../router";

const isAdmin = ref(false);
const isSb = ref(false);
const isGf = ref(false);
const isGuest = ref(false);
const userReference = ref("");

const resetRights = () => {
  isAdmin.value = false;
  isSb.value = false;
  isGf.value = false;
  isGuest.value = false;
};
const selectedTabNumber = ref(1);

const selectTab = (num) => {
  selectedTabNumber.value = num;
};

onMounted(() => {
  resetRights();
  const db = getDatabase();
  let id = localStorage.getItem("storedData");
  userReference.value = id;
  let dbResult = dbRef(db, "users/" + id);
  onValue(dbResult, (snapshot) => {
    let currentUser = snapshot.val();
    if (currentUser != null) {
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
        case "none":
          isGuest.value = true;
          break;
      }
    } else {
      router.push("/");
    }
  });
});
</script>

<style scoped>
#createUsersContent {
  animation-delay: 0.7s;
}
</style>
