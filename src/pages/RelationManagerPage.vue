<script setup>
/* eslint-disable */
import { ref } from "vue";
import AddAtrComponent from "@/components/AddAtrComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
const addPatRef = ref(null);
</script>

<template>
  <NavbarComponent/>
  <div class="grid-container">
    <div class="grid-item">
      <AddAtrComponent ref="addPatRef" tableName="oilsactions" />
    </div>
    <div class="grid-item">
      <AddAtrComponent ref="addPatRef" tableName="oilsaffinities" />
    </div>
    <div class="grid-item">
      <AddAtrComponent ref="addPatRef" tableName="oilsapplications" />
    </div>
    <div class="grid-item">
      <AddAtrComponent ref="addPatRef" tableName="oilscontraindications" />
    </div>
    <div class="grid-item">
      <AddAtrComponent ref="addPatRef" tableName="oilsdiseases" />
    </div>
    <div class="grid-item">
      <AddAtrComponent ref="addPatRef" tableName="oilsfunctions" />
    </div>
    <div class="grid-item">
      <AddAtrComponent ref="addPatRef" tableName="oilsothers" />
    </div>
    <div class="grid-item">
      <AddAtrComponent ref="addPatRef" tableName="oilsfunctions" />
    </div>
    <div class="grid-item">
      <AddAtrComponent ref="addPatRef" tableName="oilsflavors" />
    </div>
  </div>
</template>
<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  /* Spazio tra le celle */
}

.grid-item {
  border: 1px solid #333;

  text-align: center;
}
</style>
