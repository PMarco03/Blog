<script setup>
import { ref } from "vue";

const sidepanelRef = ref(0);
const outpanelRef = ref(0);

const openNav = () => {
  if (sidepanelRef.value) {
    sidepanelRef.value.style.width = "30%";
    outpanelRef.value.style.width = "100%";
  }

};

const closeNav = () => {
  if (sidepanelRef.value) {
    sidepanelRef.value.style.width = "0";
    outpanelRef.value.style.width = "0";
  }

};
</script>

<template>
  <div ref="sidepanelRef" id="mySidepanel" class="sidepanel">
    <a class="closebtn" @click="closeNav">&times;</a>
    <div class="content">
      <slot></slot>
    </div>
  </div>

  <div class="outpanel" ref="outpanelRef" @click="closeNav"></div>
  <button class="openbtn" @click="openNav">&#9776; Filtri Singoli</button>
</template>
<style scoped>
.sidepanel {
  height: 100svh; /* Specify a height */
  width: 0;
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0;
  left: 0;
  background-color: #111; /* Black*/
  overflow-y: auto;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 40px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidepanel */
}
.outpanel{
  height: 100svh;
  width: 0;
  position: fixed;
  z-index: 1; /* Stay on top */
  top: 0;
  left: 30%;
 
}

/* The sidepanel links */
.sidepanel a {
  padding-left: 2%;
  padding-right: 2%;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

/* When you mouse over the navigation links, change their color */
.sidepanel a:hover {
  color: #f1f1f1;
}
.content {
  padding-left: 10%;
  padding-right: 10%;
}
/* Position and style the close button (top right corner) */
.sidepanel .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}
.closebtn {
  cursor: pointer;
}

/* Style the button that is used to open the sidepanel */
.openbtn {
  font-size: 20px;
  cursor: pointer;
  background-color: #111;
  color: white;
  padding: 10px 15px;
  border: none;
}

.openbtn:hover {
  background-color: #444;
}
</style>
