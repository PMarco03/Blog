<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const handleLogin = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    alert(error.message);
  } else {
    router.push("/");
  }
};
onMounted(() => {});
</script>
<template>
  <div class="main">
    <h1 class="h1">Login</h1>
    <form @submit.prevent="handleLogin" class="defaultForm">
      <div>
        <input
          type="email"
          v-model="email"
          required
          class="defaultInput"
          placeholder="Email"
        />
      </div>
      <div>
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
          class="defaultInput"
        />
      </div>
      <button class="defaultButtonSubmit" type="submit">Login</button>
     
    </form>
  </div>
</template>
<style scoped>
@import url("../assets/styles/formStyle.scss");
.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.h1 {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: white;
}
</style>
