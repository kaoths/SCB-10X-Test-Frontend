import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import auth from "@/store/modules/auth";
import user from "@/store/modules/user";
import party from "@/store/modules/party";
import { AuthState } from "@/types/auth";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence<AuthState>({
  storage: window.localStorage,
  modules: ["auth"]
});

export default new Vuex.Store<any>({
  modules: {
    auth,
    user,
    party
  },
  plugins: [vuexLocal.plugin]
});
