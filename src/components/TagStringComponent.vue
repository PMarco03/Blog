<script setup>
import { defineProps, onMounted, ref, defineEmits } from "vue";

const array = ref({});
const isOpened = ref(false);

const toggleOpen = () => {
  isOpened.value = !isOpened.value;
};
const props = defineProps({
  tag: Array,
});

onMounted(() => {
  if (props.tag && props.tag.length > 0) {
    array.value = props.tag;
   // console.log(array.value)
  }
});
</script>

<template>
  <div v-if="array.length == 0" class="tagnot">Nullo</div>
  <div v-else>
    <div v-if="isOpened == true" @click="toggleOpen">
      <div v-for="row in array" :key="row">
        <div v-if="props.string === null">
          <div class="tagnot tag">
            {{ row.name }}
          </div>
        </div>
        <div v-else>
          <div class="tag">
            {{ row.name }}
          </div>
        </div>
      </div>
    </div>
    <div v-else @click="toggleOpen">
      <p class="len">{{ array.length }}</p>
    </div>
  </div>
</template>

<style scoped>
.tagnot {
  background-color: #291415;
  border: 1px solid #822025;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  align-content: center;
  padding: 10%;
  margin-top: 4%;
  margin-bottom: 4%;
  margin-left: 4%;
  margin-right: 4%;
  max-width: 90%;
  border-radius: 8px;
}
.len {
  cursor: pointer;
}
.tag {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  align-content: center;
  padding: 10%;
  margin-top: 4%;
  margin-bottom: 4%;
  margin-left: 4%;
  margin-right: 4%;
  max-width: 90%;
  border: 1px solid #282828;
  border-radius: 8px;
  background-color: #232323;
}
</style>
