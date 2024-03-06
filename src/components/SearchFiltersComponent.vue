<script setup>
import DropDownComponent from './DropDownComponent.vue';
import { ref, defineEmits } from 'vue';

const emits = defineEmits(["oilEmitted"]);
const selectedItemFromDropDown = ref(null);

const olio = {
  cod_nota: "",
  cod_parte: "",
  cod_colore: "",
  cod_natura: "",
};

const noteHandle = (selectedItem) => {
  selectedItemFromDropDown.value = selectedItem;
  olio.cod_nota = selectedItemFromDropDown.value;
  emitObject();
};
const partiHandle = (selectedItem) => {
  selectedItemFromDropDown.value = selectedItem;
  olio.cod_parte = selectedItemFromDropDown.value;
  emitObject();
};
const coloriHandle = (selectedItem) => {
  selectedItemFromDropDown.value = selectedItem;
  olio.cod_colore = selectedItemFromDropDown.value;
  emitObject();
};
const naturaHandle = (selectedItem) => {
  selectedItemFromDropDown.value = selectedItem;
  olio.cod_natura = selectedItemFromDropDown.value;
  emitObject();
};

const emitObject = () => {
  emits("oilEmitted", olio);
};
</script>

<template>
  <div class="checks">
    <DropDownComponent @selectedItemChange="noteHandle" tableName="note" />
    <DropDownComponent @selectedItemChange="partiHandle" tableName="parti" />
    <DropDownComponent @selectedItemChange="coloriHandle" tableName="colori"/>
    <DropDownComponent @selectedItemChange="naturaHandle" tableName="natura"/>
  </div>
</template>

<style scoped>

</style>
