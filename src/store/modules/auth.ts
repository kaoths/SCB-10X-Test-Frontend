import Vue from "vue";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import {
  AuthActions,
  AuthGetters,
  AuthMutations,
  AuthState,
  LoginCredentials
} from "@/types/auth";
import { User } from "@/types/user";
import router from "@/router";

const state: AuthState = {
  token: null,
  user: null
};

const getters: GetterTree<AuthState, any> = {
  [AuthGetters.IsLogin]: state => !!state.token,
  [AuthGetters.GetToken]: state => state.token
};

const mutations: MutationTree<AuthState> = {
  [AuthMutations.SetToken]: (state: AuthState, token: string | null) => {
    state.token = token;
  },
  [AuthMutations.SetUser]: (state: AuthState, user: User | null) => {
    state.user = user;
  }
};

const actions: ActionTree<AuthState, any> = {
  [AuthActions.Login]: async (
    { commit, dispatch },
    credentials: LoginCredentials
  ) => {
    try {
      const response = await Vue.axios.post<string>("/auth/login", credentials);
      await dispatch(AuthActions.SetToken, response.data);
      await dispatch(AuthActions.SetAxiosHeader);
      await dispatch(AuthActions.Redirect);
    } catch (e) {
      console.error(e);
    }
  },
  [AuthActions.Register]: async ({ commit, dispatch }, credentials) => {
    try {
      const response = await Vue.axios.post<string>(
        "/auth/register",
        credentials
      );
      await dispatch(AuthActions.SetToken, response.data);
      await dispatch(AuthActions.SetAxiosHeader);
      await dispatch(AuthActions.Redirect);
    } catch (e) {
      console.error(e);
    }
  },
  [AuthActions.Logout]: async ({ commit, dispatch }) => {
    commit(AuthMutations.SetToken, null);
    commit(AuthMutations.SetUser, null);
    await dispatch(AuthActions.ClearHeaderToken);
    router.push("/login");
  },
  [AuthActions.SetToken]: async ({ commit }, token: string | null) => {
    commit(AuthMutations.SetToken, token);
  },
  [AuthActions.SetAxiosHeader]: ({ state }) => {
    if (state.token) {
      Vue.axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${state.token}`;
    }
  },
  [AuthActions.ClearHeaderToken]: async () => {
    Vue.axios.defaults.headers.common["Authorization"] = null;
  },
  [AuthActions.Redirect]: async ({ commit, dispatch }) => {
    try {
      await dispatch(AuthActions.VerifyToken);
      router.push("/");
    } catch (e) {
      await dispatch(AuthActions.Logout);
    }
  },
  [AuthActions.VerifyToken]: async ({ state, commit, dispatch }) => {
    try {
      if (state.token) {
        const response = await Vue.axios.get<User>("user/self");
        commit(AuthMutations.SetUser, response.data);
      } else {
        await dispatch(AuthActions.Logout);
      }
    } catch (e) {
      await dispatch(AuthActions.Logout);
    }
  }
};

const auth: Module<AuthState, any> = {
  state,
  getters,
  mutations,
  actions
};

export default auth;
