<script setup>
import { ref, onMounted, defineProps } from "vue";
const showPopup = ref(true);


const emits = defineEmits(["grayClick","greenClick","redClick","closed"]);
const props = defineProps({
    title: String,
    description: String,
    grayButtonText: String,
    redButtonText: String,
    greenButtonText: String
});

const emitRedButton = () => {
    emits("redClick");
    closePopup();
};
const emitGrayButton = () => {
    emits("grayClick");
    closePopup();
};
const emitGreenButton = () => {
    emits("greenClick");
    closePopup();
};
const emitClosed = () =>{
    emits("closed");
    closePopup();
}
const closePopup = () => {
    showPopup.value = false;
}
</script>
<template>
    <div class="popup-overlay" v-if="showPopup" @click="emitClosed"></div>
    <div class="popup" v-if="showPopup">
        <div class="popup-title-div">
            <h2 class="popup-title">{{ props.title }}</h2>
        </div>
        <div class="popup-content-div">
            <p class="popup-content-p">{{ props.description }} </p>
        </div>
        <div class="popup-buttons-div">
            <button @click="emitGreenButton" class="popup-green-button" v-if="props.greenButtonText">{{ props.greenButtonText
            }}</button>
            <button @click="emitGrayButton" class="popup-gray-button"
                v-if="props.grayButtonText">{{ props.grayButtonText }}</button>
            <button @click="emitRedButton" class="popup-red-button" v-if="props.redButtonText">{{ props.redButtonText }}</button>
        </div>

    </div>
</template>
<style scoped>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* Trasparenza per lo sfondo */
    z-index: 999;
    /* Assicura che il popup sia sopra gli altri elementi */
}

.popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #232323;
    width: 25%;
    border-radius: 8px;
    z-index: 1000;
    /* Assicura che il popup sia sopra l'overlay */
}

.popup-title-div {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 5%;
    margin-top: 0;
    background-color: #282828;
}

.popup-title {

    color: white;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;
    margin: 0;
    font-size: 18px;
    background-color: #282828;
}

.popup-content-p {
    color: #979797;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 16px;
}

.popup-content-div {
    padding-left: 5%;
    padding-right: 5%;
}

.popup-buttons-div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2%;
    border-top: 2px solid #282828;
    padding: 5%;
}

.popup-red-button {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: #D8555A;
    background-color: #291415;
    border: 1px solid #822025;
    padding-top: 3%;
    padding-bottom: 3%;
    width: 100%;
    border-radius: 4px;
}

.popup-red-button:hover {
    background-color: #E5484D;
    color: black;
}

.popup-gray-button {
    color: white;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    background-color: #2E2E2E;
    border: 1px solid #3E3E3E;
    padding-top: 3%;
    padding-bottom: 3%;
    width: 100%;
    border-radius: 4px;
}

.popup-gray-button:hover {
    background-color: #343434;

}

.popup-green-button {
    color: white;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    background-color: #37996B;
    border: 1px solid #3ECF8E;
    padding-top: 3%;
    padding-bottom: 3%;
    width: 100%;
    border-radius: 4px;
}

.popup-green-button:hover {
    background-color: #33815D;

}</style>