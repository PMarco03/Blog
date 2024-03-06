<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "vue-router";
import NavbarComponent from "@/components/NavbarComponent.vue";

const posts = ref([]);

const getPosts = async () =>{
  try  {
  const {data, error} = await supabase.from("posts").select();
  posts.value = data;
  console.log(posts.value)
  if(error) throw error;
  }
  catch(error){
    console.error(error.message)
  }
}
onMounted(() => {
  getPosts();
});
</script>
<template>
  <NavbarComponent />
  <div class="main" v-for="post in posts">
    <div class=post>
      <h1>{{ post.title }} - {{ post.datetime }}</h1>
      <p> {{ post.description }}</p>
      <img :src="post.image"/>
    </div>
  </div>
</template>
<style scoped>

.main{
  color: white;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-items: center;
  align-items: center;
}
.post{
  margin: 1%;
  border: 1px solid black;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-items: center;
  align-items: center;
  
}
img{
  width: 50%;
}

</style>
