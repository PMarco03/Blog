import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "./lib/supabaseClient";
import {ref} from "vue";
import App from "./App.vue";
import HomePage from "./pages/HomePage.vue";
import TableManagerPage from "./pages/TableManagerPage.vue";
import AddOilPage from "./pages/AddOilPage.vue";
import EditOilPageVue from "./pages/EditOilPage.vue";
import RelationManagerPageVue from "./pages/RelationManagerPage.vue";
import LoginPage from "./pages/LoginPage.vue";

import ProfilePageVue from "./pages/ProfilePage.vue";

const localUser = ref("");
const routes = [
  { path: "/", component: HomePage, meta: { requiresAuth: true } },
  { path: "/tablemanager", component: TableManagerPage, meta: { requiresAuth: true } },
  { path: "/relationmanager", component: RelationManagerPageVue, meta: { requiresAuth: true } },
  { path: "/adoil", component: AddOilPage, meta: { requiresAuth: true } },
  { path: "/edit", component: EditOilPageVue, meta: { requiresAuth: true } },
  { path: "/profile", component: ProfilePageVue, meta: {requiresAuth: true}},

  { path: "/login", component: LoginPage, meta: { accessWithAuth: false } },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const getUser = async (next) =>{
  localUser.value = await supabase.auth.getSession();
  if(localUser.value.data.session == null){
    next("/login")
  }
  else{
    next();
  }
}
const getUser2 = async (next) =>{
  localUser.value = await supabase.auth.getSession();
  if(localUser.value.data.session !== null){
    next("/")
  }
  else{
    next();
  }
}
const checkUserTable = async () =>{
  localUser.value = await supabase.auth.getSession();
  if(localUser.value.data.session !== null){
    const {data, error} = await supabase.from("users").select("*"); 
   if(error) console.error(error);
  //  console.log(data);
    if(data.length==0){
      const userUpdate = {
        user_id: localUser.value.data.session.user.id,
        cod_user: localUser.value.data.session.user.id
      }
      try {
        const { error } = await supabase.from("users").insert(userUpdate);
        if (error) throw error;
      } catch (error) {
        
         console.error(error.value)
      }
    }
  }
}
router.beforeEach((to, from, next) => {
  checkUserTable();
  if(to.meta.requiresAuth){
   getUser(next);
  }
  else{
    if(!to.meta.accessWithAuth){
      getUser2(next);
     }
     else{
      next();
    }
    
  }


});


const app = createApp(App);
app.use(router);
app.mount("#app");
