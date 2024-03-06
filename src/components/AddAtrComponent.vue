<script setup>
import { ref, onMounted, defineProps } from "vue";
import { supabase } from "../lib/supabaseClient";

const props = defineProps({
  tableName: String,
});
const ris = ref([]);
const formValue = ref("");
const getTable = async () => {
  const { data } = await supabase.from(props.tableName).select().order('id');
  ris.value = data;
};

const remove = async (sris) => {
  try {
    const { error } = await supabase
      .from(props.tableName)
      .delete()
      .eq("id", sris.id);
    if (error) throw error;
  } catch (error) {
    console.error(error.message);
  }

  getTable();
};

const addTable = async () => {
  const updates = {
    name: formValue.value,
  };
  try {
    const { error } = await supabase.from(props.tableName).insert(updates);
    if (error) throw error;
  } catch (error) {
    console.error(error.value);
  }
  getTable();
  formValue.value = "";
};

onMounted(() => {
  getTable();
});
</script>
<template>
  <div class="c1">
    <h2>{{ tableName }}</h2>
    <form @submit.prevent="addTable">
      <input v-model="formValue" type="text" />
      <input type="submit" />
    </form>

    <table class="c2">
      <tr>
        <td>
          <b>Id</b>
        </td>
        <td>
          <b>Nome</b>
        </td>
      </tr>
      <tr v-for="sris in ris" :key="sris.id">
        <td>
          {{ sris.id }}
        </td>
        <td>
          {{ sris.name }}
        </td>
        <td><button @click="remove(sris)">X</button></td>
      </tr>
    </table>
  </div>
</template>
<style scoped>
.c1 {
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  width: 100%;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.c2 {
  color: white;
  border: none;
  margin: 2%;
}
</style>
