<script setup>

import { ref } from "vue";
import AddAtrComponent from "@/components/AddAtrComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
const addPatRef = ref(null);
</script>

<template>
  <NavbarComponent/>
  <div class="grid-container">
    <div class="grid-item">
      <div class="grid-item">
        <AddAtrComponent ref="addPatRef" tableName="oils" />
      </div>
      <AddAtrComponent ref="addPatRef" tableName="affinities" />
    </div>

    <div class="grid-item">
      <AddAtrComponent ref="addPatRef" tableName="colors" />
    </div>
    <div class="grid-item">
      <AddAtrComponent ref="addPatRef" tableName="contraindications" />
    </div>
    <div class="grid-item">
      <AddAtrComponent ref="addPatRef" tableName="dosages" />
    </div>

    <div class="grid-item">
      <AddAtrComponent ref="addPatRef" tableName="natures" />
    </div>
    <div class="grid-item">
      <AddAtrComponent ref="addPatRef" tableName="notes" />
    </div>
    <div class="grid-item">
      <AddAtrComponent ref="addPatRef" tableName="parts" />
    </div>
    <div class="grid-item">
      <AddAtrComponent ref="addPatRef" tableName="diseases" />
    </div>
    <div class="grid-item">
      <AddAtrComponent ref="addPatRef" tableName="functions" />
    </div>
    <div class="grid-item">
      <AddAtrComponent ref="addPatRef" tableName="applications" />
    </div>
    <div class="grid-item">
      <AddAtrComponent ref="addPatRef" tableName="flavors" />
    </div>
    <div class="grid-item">
      <AddAtrComponent ref="addPatRef" tableName="actions" />
    </div>
    <div class="grid-item">
      <AddAtrComponent ref="addPatRef" tableName="others" />
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
