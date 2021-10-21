export const state = () => ({
  auth: "",
});

export const mutations = {
    auth: ((state, uid) => {
        state.auth = uid;
        console.log(state.auth)
        console.log(uid)
    }),
}

export const actions = {
  auth: ((context, uid) => {
    context.commit("auth", uid);
    console.log("store")
  }),
}