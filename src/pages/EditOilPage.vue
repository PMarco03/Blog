<script setup>
import DropDownComponent from "@/components/DropDownComponent.vue";
import CheckListComponent from "@/components/CheckListComponent.vue";
import { useRoute } from "vue-router";
import { supabase } from "../lib/supabaseClient";
import { ref, onMounted, reactive, watch } from "vue";
//import { useRouter } from "vue-router";
import NavbarComponent from "@/components/NavbarComponent.vue";
const oil = reactive({
  nature: {},
  note: {},
  part: {},
  color: {},
  diseases: [],
  affinities: [],
  applications: [],
  flavors: [],
  dosages: [],
  actions: [],
  contraindications: [],
  functions: [],
  others: [],
  id: null,
  name: '',
  latinName: '',
  description: '',
});
const route = useRoute();
const idToEdit = route.query.id;

const name = ref("");
const latinName = ref("");
const description = ref("");
const lastId = ref(0);
const selectedItemFromDropDown = ref(null);

//const router = useRouter();
const affinities = ref([]);
const contraindications = ref([]);
const functions = ref([]);
const diseases = ref([]);
const flavors = ref([]);
const others = ref([]);
const applications = ref([]);
const actions = ref([]);
const dosages = ref([]);

const getOil = async () => {

  try {
    const { data } = await supabase.from("oils").select().eq("id", idToEdit);

    await compileTable(data[0])
    //console.log(oil.note)

  } catch (error) {
    console.error("Errore durante il recupero dei dati degli oli:", error.message);
  }
};

const compileTable = async (sdata) => {
  const results = await Promise.all([
    getSingleTable("natures", sdata.cod_nature),
    getSingleTable("notes", sdata.cod_note),
    getSingleTable("parts", sdata.cod_part),
    getSingleTable("colors", sdata.cod_color),
    getMultiTable("diseases", sdata.id),
    getMultiTable("affinities", sdata.id),
    getMultiTable("applications", sdata.id),
    getMultiTable("flavors", sdata.id),
    getMultiTable("dosages", sdata.id),
    getMultiTable("actions", sdata.id),
    getMultiTable("contraindications", sdata.id),
    getMultiTable("functions", sdata.id),
    getMultiTable("others", sdata.id),
  ]);

  // Ora assegna i risultati alle proprietà corrispondenti di oil
  [oil.nature, oil.note, oil.part, oil.color, oil.diseases, oil.affinities, oil.applications, oil.flavors, oil.dosages, oil.actions, oil.contraindications, oil.functions, oil.others] = results;

  // Assegna i valori diretti
  oil.id = sdata.id;
  oil.name = sdata.name;
  oil.latinName = sdata.latinName;
  oil.description = sdata.description;
};

const getSingleTable = async (tablename, id) => {

  if (id !== null) {
    try {
      const { data } = await supabase
        .from(tablename)
        .select()
        .eq("id", id);
      //  console.log(data);
      return data[0];
    } catch (error) {
      console.error(error.message);
      return null;
    }

  }
  return {
    id: null,
    name: null
  }
}

const getMultiTable = async (tablename, id) => {
  if (id !== null) {
    try {
      const { data, error } = await supabase
        .from('oils' + tablename)
        .select(`${tablename}(id, name)`)
        .eq('cod_oil', id);

      //  console.log(data); // Per controllare la struttura di data

      if (data && data.length > 0) {
        // Mappa i dati per ottenere un array di oggetti con id e name
        const resultArray = data.map(item => {
          return {
            id: item[tablename]?.id,
            name: item[tablename]?.name
          };
        });
        return resultArray;
      }

      return []; // Ritorna un array vuoto se non ci sono dati

    } catch (error) {
      console.error('Errore generico:', error.message);
      return null;
    }
  }
  return [{ id: null, name: null }]; // Se l'ID è null, ritorna un array con un elemento che ha id e name null
}

const dosagesAssign = (items) => {
  dosages.value = items.value;

};
const affinitiesAssign = (items) => {
  affinities.value = items.value;
};
const contraindicationsAssign = (items) => {
  contraindications.value = items.value;
};
const diseasesAssign = (items) => {
  diseases.value = items.value;
};
const functionsAssign = (items) => {
  functions.value = items.value;
};
const flavorsAssign = (items) => {
  flavors.value = items.value;
};
const othersAssign = (items) => {
  others.value = items.value;
};
const applicationsAssign = (items) => {
  applications.value = items.value;
};
const actionsAssign = (items) => {
  actions.value = items.value;
};


const noteHandle = (selectedItem) => {
  selectedItemFromDropDown.value = selectedItem;
  oil.cod_note = selectedItemFromDropDown.value;
};
const partHandle = (selectedItem) => {
  selectedItemFromDropDown.value = selectedItem;
  oil.cod_part = selectedItemFromDropDown.value;
};
const colorHandle = (selectedItem) => {
  selectedItemFromDropDown.value = selectedItem;
  oil.cod_color = selectedItemFromDropDown.value;
};
const natureHandle = (selectedItem) => {
  selectedItemFromDropDown.value = selectedItem;
  oil.cod_nature = selectedItemFromDropDown.value;
};

const submitHandle = async () => {
/*  oil.name = name.value;
  oil.latinName = latinName.value;
  oil.description = description.value;*/
  await editOilsTable();
 // await getLastId();
//  await create();
};

const editOilsTable = async () => {
  const newOil = {
    id: oil.id,
    name: oil.name,
    latinName: oil.latinName,
    description: oil.description,
    cod_nature: oil.cod_nature,
    cod_color: oil.cod_color,
    cod_note: oil.cod_note,
    cod_part: oil.cod_part
  }
  try {
    const { error } = await supabase.from("oils").upsert(newOil);
    if (error) throw error;

  } catch (error) {
    console.error(error.message);
  }

};
onMounted(() => {
  getOil();
});

const create = async () => {

  const preparePromise = [
    await prepareTable(affinities.value, "oilsaffinities"),
    await prepareTable(contraindications.value, "oilsothers"),
    await prepareTable(functions.value, "oilsapplications"),
    await prepareTable(diseases.value, "oilscontraindications"),
    await prepareTable(flavors.value, "oilsfunctions"),
    await prepareTable(others.value, "oilsdiseases"),
    await prepareTable(applications.value, "oilsflavors"),
    await prepareTable(actions.value, "oilsactions"),
    await prepareTable(dosages.value, "oilsdosages")
  ];
  const reloadPage = [reload()];

  try {
    await Promise.all(preparePromise);
    await Promise.all(reloadPage);
    // getTable();
  } catch (error) {
    console.error(error);
  }


};
const reload = () => {
  window.location.reload();
};

const prepareTable = async (arrayRef, tableName) => {
  const finalArray = [];


  // Controlla se arrayRef.value è definito e se è un array
  if (arrayRef && Array.isArray(arrayRef)) {
    arrayRef.forEach((arr) => {

      const update = {
        cod_oil: lastId.value,
        cod_attribute: arr.id,
      };
      finalArray.push(update);
    });
  } else {
    console.error('arrayRef.value non è definito o non è un array');
  }
  //console.log(finalArray)
  try {
    const { error } = await supabase.from(tableName).upsert(finalArray);
    if (error) throw error;
  } catch (error) {
    console.error(error.message);
  }

  return 0;
};

</script>
<template>
  <NavbarComponent />
  <div class=fcontainer>
    <div class="f">
      <input type="text" v-model="oil.name" placeholder="Nome" required class="in" />
      <input type="text" v-model="oil.latinName" placeholder="Nome latino" class="in" />
      <textarea v-model="oil.description" rows="4" cols="10" placeholder="Descrizione" class="in"></textarea>
      <div class="flex">
        <DropDownComponent @selectedItemChange="noteHandle" tableName="notes" :defaultItem="oil.note" />
        <DropDownComponent @selectedItemChange="partHandle" tableName="parts" :defaultItem="oil.part" />
        <DropDownComponent @selectedItemChange="colorHandle" tableName="colors" :defaultItem="oil.color" />
        <DropDownComponent @selectedItemChange="natureHandle" tableName="natures" :defaultItem="oil.nature" />
      </div>
    </div>
  </div>
  <div class="f2container">

    <div class="container">
      <CheckListComponent @selectedItemChange="affinitiesAssign" tableName="affinities" :defaultItems="oil.affinities" />
      <CheckListComponent @selectedItemChange="applicationsAssign" tableName="applications"
        :defaultItems="oil.applications" />
      <CheckListComponent @selectedItemChange="contraindicationsAssign" tableName="contraindications"
        :defaultItems="oil.contraindications" />
      <CheckListComponent @selectedItemChange="functionsAssign" tableName="functions" :defaultItems="oil.functions" />
      <CheckListComponent @selectedItemChange="diseasesAssign" tableName="diseases" :defaultItems="oil.diseases" />
      <CheckListComponent @selectedItemChange="flavorsAssign" tableName="flavors" :defaultItems="oil.flavors" />
      <CheckListComponent @selectedItemChange="actionsAssign" tableName="actions" :defaultItems="oil.actions" />
      <CheckListComponent @selectedItemChange="dosagesAssign" tableName="dosages" :defaultItems="oil.dosages" />
      <CheckListComponent @selectedItemChange="othersAssign" tableName="others" :defaultItems="oil.others" />
    </div>
    <form @submit.prevent="submitHandle">
      <input type="submit" class="button2" value="Salva Cambiamenti" />
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
  background-color: #37996B;
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
  background-color: #37996B;
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
