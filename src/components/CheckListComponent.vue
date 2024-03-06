<script setup>

import { ref, onMounted, defineProps, defineEmits, watch } from "vue";
import { supabase } from "../lib/supabaseClient";

const selectedItems = ref([]);
const ris = ref([]);

const textSearch = ref("");


const props = defineProps({
  tableName: String,
  defaultItems: Array
});
const emits = defineEmits(["selectedItemChange"]);

const handleCheckboxChange = (sris) => {
  if (selectedItems.value.includes(sris)) {
    selectedItems.value = selectedItems.value.filter((item) => item !== sris);
  } else {
    selectedItems.value.push(sris);
    // console.log(sris);
  }
  emitSelection();
};

const search = () => {
  getTable(textSearch.value);
};
const emitSelection = () => {
  //console.log(selectedItems.value);
  emits("selectedItemChange", selectedItems);
};

onMounted(() => {
  if(props.defaultItems===null){
    props.defaultItems = {}
  } 
  getTable();
  
});

const getTable = async (searchText = "") => {
  const { data } = await supabase
    .from(props.tableName)
    .select("*")
    .ilike("name", "%" + searchText + "%");
  ris.value = data;
};
</script>

<template>
  <div class="main1">
    <h2>{{ props.tableName }}</h2>
   
    <form @submit.prevent>
      <input
        type="text"
        @input="search"
        v-model="textSearch"
        placeholder="Cerca"
        class="in"
      />
    </form>
    <div
      class="main"
    ><!-- :checked="props.defaultItems.some(item => item.id === sris.id)"-->
    <form @submit.prevent="emitSelection">
        <div v-for="sris in ris" :key="sris.id" class="checkboxLabel">
          <label class="checkboxContainer">
            <input 
           
              type="checkbox"
              class="checker"
              
              @change="() => handleCheckboxChange(sris)"
            />
            <span class="label">{{ sris.name }}</span>
          </label>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.checker {
  width: 20px;
  height: 20px;
}
.label {
  font-family: "Verdana", "Geneva", "Tahoma", sans-serif;
  margin: 0;
  color: white;
}
h2 {
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: white;
}

.main {
  border: 1px solid #2e2e2e;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: scroll;
  margin-top: 3%;
}
.main1 {
  margin-top: 4%;
  border: 1px solid #2e2e2e;
  border-radius: 8px;
  padding: 2%;
}

.checkboxLabel {
  display: flex;
  align-items: center;
}

.checkboxLabel input {
  margin-right: 10px;
}

.form-container {
  display: flex;
  justify-content: space-between;
}

.show-hide-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.show-hide-btn:hover {
  background-color: #45a049;
}

.checkbox-container {
  display: flex;
  flex-wrap: wrap;
}

.checkbox-container .checkboxLabel {
  flex-basis: calc(33.33% - 10px);
}
.in {
  background-color: #212121;
  padding: 2%;
  margin-top: 3%;
  border-radius: 8px;
  border: 1px solid #2e2e2e;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  color: white;
  font-weight: bold;
}
.in:not(:focus) {
  background-color: #212121; /* colore di sfondo desiderato quando il campo non ha lo stato di focus */
}
.in:focus {
  border-color: #007bff;
  outline: none;
}
.in::placeholder {
  color: #aaa;
  font-weight: initial;
}

.form-container input {
  flex-grow: 1;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

::-webkit-scrollbar {
    width: 0px;
}

::-webkit-scrollbar-thumb {
    background-color: transparent;
}

::-webkit-scrollbar-track {
    background-color: transparent;
}
.form-container button {
  background-color: #2196f3;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-container button:hover {
  background-color: #0d47a1;
}
</style>
