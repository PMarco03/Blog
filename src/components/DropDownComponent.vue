<script setup>
import { ref, onMounted, defineProps, watch } from "vue";
import { supabase } from "../lib/supabaseClient";

const props = defineProps({
  tableName: String,
  defaultItem: Object
});

const ris = ref([]);
const emits = defineEmits(["selectedItemChange"]);

// Usa ref invece di computed per selectedItem
const selectedItem = ref(props.defaultItem ? props.defaultItem.id : null);

// Osserva i cambiamenti di defaultItem e aggiorna selectedItem
watch(() => props.defaultItem, (newValue) => {
  selectedItem.value = newValue ? newValue.id : null;
}, { immediate: true });

const getTable = async () => {
  const { data } = await supabase.from(props.tableName).select();
  ris.value = data;
};

onMounted(getTable);

const emitSelection = () => {
  emits("selectedItemChange", selectedItem.value);
};
</script>

<template>
  <form>
    
    <h2>{{ props.tableName }}</h2>
    <select v-model="selectedItem" @change="emitSelection">
      <option :value="null">Seleziona...</option>
      <option v-for="item in ris" :key="item.id" :value="item.id">
        {{ item.name }}
      </option>
    </select>
  </form>
</template>


<style scoped>
form {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #212121;
  border: 1px solid #2e2e2e;
}

h2 {
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: white;
}

select {
  width: 100%;
  padding: 2%;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  color: #333;
}

option {
  font-size: 14px;
}
</style>
