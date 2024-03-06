<script setup>
import { useRouter } from "vue-router";
import { supabase } from "../lib/supabaseClient";
import { onMounted, ref } from "vue";
const router = useRouter();
const localUser = ref({});
const userName = ref("");

const profile = async () => {
  router.push("/profile");
};

const getSession = async () => {
  localUser.value = await supabase.auth.getSession();

  userName.value = localUser.value.data.session.user.email;
};
onMounted(() => {
  getSession();
});
</script>

<template>
  <div id="nav" class="background">
    <router-link to="/" class="link"><div class="sdiv">Home</div></router-link>
    <router-link to="/adoil" class="link">Aggiungi Olio</router-link>
    <router-link to="/tablemanager" class="link">Table Manager</router-link>
    <router-link to="/relationmanager" class="link"
      >Relation Manager</router-link
    >

    <p class="link" @click="profile">{{ userName }}</p>
  </div>
  <div class="spacer"></div>
  <router-view></router-view>

</template>

<style scoped>
.spacer {
  padding-top: 1%;
  padding-bottom: 1%;
  margin-bottom: 4%;
  border: 1px solid white;
}
.background {
  width: 100vw;
  background-color: #43bd87;
  padding-top: 1%;
  padding-bottom: 1%;
  margin-bottom: 4%;
  position: fixed;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  text-align: center;
}
.link {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: white;
  text-decoration: none;
  cursor: pointer;
}

.link:hover {
  color: black;
}


</style>
