<template>
  <div>{{currentUser}}</div>
  <div v-if="currentUser==='admin@compass.com'">adminOnly</div>
</template>

<script setup>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";

const auth = getAuth();
const currentUser=ref('')
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    currentUser.value = user.email;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
</script>

<style></style>
