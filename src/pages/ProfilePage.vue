<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";
import NavbarComponent from "@/components/NavbarComponent.vue";
import { useRouter } from "vue-router";
//import "../assets/styles/formStyle.css";
const localUser = ref({});
const email = ref("");
const password = ref("");
const passwordconfirm = ref("");
const name = ref("");
const signed = ref(false);
const isPassCorrect = ref(false);
const router = useRouter();
const usersTableId = ref(0);
const handleLogin = async () => {
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        first_name: name.value,
      },
    },
  });
  if (error) {
    alert(error.message);
  } else {
    signed.value = true;
    //router.push("/");
  }
};
const getSession = async () => {
  localUser.value = await supabase.auth.getSession();
  email.value = localUser.value.data.session.user.email;
  name.value = localUser.value.data.session.user.user_metadata.first_name;
 //console.log(localUser.value.data.session.user.email);
};
const logout = async () =>{
  await supabase.auth.signOut();
  router.push('/login');
}
const del = async () => {
  try {
    const { data, error } = await supabase.from("users").select();
    if (error) throw error;
    usersTableId.value = data[0].id;
    //console.log(data[0].id);
  } catch (error) {
    console.error("err su delete: " + error.message);
  }
  try {
    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", usersTableId.value);
    if (error) throw error;
    //     router.push("/login")
  } catch (error) {
    console.error("err su delete: " + error.message);
  }
};
onMounted(() => {
  getSession();
});

const checkpass = () => {
  if (password.value == passwordconfirm.value) {
    isPassCorrect.value = true;
  } else {
    isPassCorrect.value = false;
  }
};
</script>

<template>
  <NavbarComponent />
  <div class="main" v-if="!signed">
    <h1 class="h1">Profilo</h1>
    <div class="defaultForm">
      <button @click="logout" class="defaultButtonSubmit">Logout</button>
   
    </div>
    <form @submit.prevent="handleLogin" class="defaultForm" v-if="false">
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
          type="text"
          v-model="name"
          required
          class="defaultInput"
          placeholder="Nome"
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
      <div>
        <input
          type="password"
          v-model="passwordconfirm"
          @change="checkpass"
          placeholder="Conferma password"
          required
          class="defaultInput"
        />
      </div>
      <div>
        <input
          type="password"
          v-model="passwordconfirm"
          @change="checkpass"
          placeholder="Conferma password"
          required
          class="defaultInput"
        />
      </div>
       </form>
  </div>

</template>
<style scoped>
.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.done {
  width: 60%;
  text-align: center;
}
.h1 {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: white;
}
</style>
