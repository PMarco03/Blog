import { supabase } from "@/lib/supabaseClient";
import { ref, onMounted } from "vue";

export const OilGetter = async () =>{

  const getTable = async () => {

    const oil = ref(Object);
  
    try {
      const { data } = await supabase.from("oils").select();
      oil.nature = await getSingleTable("natures", data[0].cod_nature);
      oil.note = await getSingleTable("notes", data[0].cod_note);
      oil.part = await getSingleTable("parts", data[0].cod_part);
      oil.color = await getSingleTable("colors", data[0].cod_color);
      oil.diseases = await getMultiTable("diseases", data[0].id);
      oil.affinities = await getMultiTable("affinities", data[0].id);
      oil.applications = await getMultiTable("applications", data[0].id);
      oil.flavors = await getMultiTable("flavors", data[0].id);
      oil.dosages = await getMultiTable("dosages", data[0].id);
      oil.actions = await getMultiTable("actions", data[0].id);
      oil.contraindications = await getMultiTable("contraindications", data[0].id);
      oil.functions = await getMultiTable("functions", data[0].id);
      oil.others = await getMultiTable("others", data[0].id);
  
      oil.id = data[0].id;
      oil.name = data[0].name;
      oil.latinName = data[0].latinName;
      oil.description = data[0].description;
     
     console.log("oil getter: "+oil);
  
    } catch (error) {
      console.error("Errore durante il recupero dei dati degli oli:", error.message);
    }
    return oil;
  };
  
  const getSingleTable = async (tablename, id) => {
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
  
  const getMultiTable = async (tablename, id) => {
    try {
      const { data, error } = await supabase
        .from('oils' + tablename)
        .select(tablename + "(id, name)")
        .eq('cod_oil', id);
  
 //     console.log(data)
      return data;
    } catch (error) {
      console.error('Errore generico:', error.message);
      return null
    }
  }
  
 return {oil};
}

