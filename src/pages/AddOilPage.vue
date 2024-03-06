<script setup>
import { supabase } from "../lib/supabaseClient";
import { ref, onMounted } from "vue";
//import { useRouter } from "vue-router";
import NavbarComponent from "@/components/NavbarComponent.vue";

const title = ref("");
const description = ref("");
const image = ref("");
const fileData = ref(null);
const publicLink = ref(null);

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  const fileExtension = file.name.split(".").pop();
  const fileName = await getNewId();
  image.value = fileName + "." + fileExtension;
  fileData.value = file;
  console.log(file)
};

const submitHandle = async () => {
  try {
    const { data, error } = await supabase.storage.from("images").upload(image.value, fileData.value);

    if (error) {
      console.error("Error uploading file:", error.message);
    } else {
      console.log("File uploaded successfully:", data);
      // Handle success
    }
  } catch (error) {
    console.error("Error uploading file:", error.message);
  }

  try {
    const { data, error } = await supabase.storage
      .from("images")
      .getPublicUrl(image.value);

    if (error) {
      console.error("Error getting link:", error.message);
    } else {
      //console.log(data.publicUrl);
      publicLink.value = data.publicUrl;
    }
  } catch (error) {
    console.error("Error getting link", error.message);
  }

  const table = {
    title: title.value,
    description: description.value,
    image: publicLink.value,
  };

  try {
    const { error } = await supabase.from("posts").upsert(table);
    if (error) throw error;
    reload();
  } catch (error) {
    console.error(error.message);
  }
};

const getNewId = async () => {
  try {
    const { data, error } = await supabase.rpc("generate_uuid_v1", {});

    if (error) {
      console.error(error.message);
    }
    
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

onMounted(() => {
 
});

const reload = () => {
  window.location.reload();
};
</script>
<template>
  <NavbarComponent />
  <div class="fcontainer">
    <div class="f">
      <input
        type="text"
        v-model="title"
        placeholder="Nome"
        required
        class="in"
      />

      <textarea
        v-model="description"
        rows="4"
        cols="10"
        placeholder="Descrizione"
        class="in"
      ></textarea>

      <input type="file" class="button2" @change="handleFileUpload" />
    </div>
  </div>
  <div class="f2container">
    <form @submit.prevent="submitHandle">
      <input type="submit" class="button2" />
    </form>
  </div>
</template>

<style scoped>
.f2container {
  padding: 2%;
}

.fcontainer {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.f {
  width: 50%;
}

.in {
  background-color: #212121;
  padding: 2%;
  margin-top: 3%;
  border-radius: 8px;
  border: 1px solid #2e2e2e;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  color: white;
  font-weight: bold;
}

.button2 {
  background-color: #37996b;
  color: white;
  padding: 1%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 2%;
  transition: background-color 0.3s;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bold;
  font-size: 16px;
  width: 100%;
}

.in:not(:focus) {
  background-color: #212121;
  /* colore di sfondo desiderato quando il campo non ha lo stato di focus */
}

.in:focus {
  border-color: #007bff;
  outline: none;
}

.in::placeholder {
  color: #aaa;
  font-weight: initial;
}

.flex {
  display: grid;
  width: 100%;
  margin-top: 3%;
  grid-template-columns: repeat(4, 1fr);
  gap: 3%;
}

.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5%;
  margin-bottom: 14%;
}

.button {
  background-color: #37996b;
  color: white;
  padding: 2%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5%;
  transition: background-color 0.3s;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bold;
  font-size: 16px;
  width: 100%;
}

.button:hover,
.button2:hover {
  background-color: #0056b3;
}
</style>
