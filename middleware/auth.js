import { auth } from "~/plugins/firebase";

export default({ redirect, route, store }) => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        store.dispatch("auth/auth", user.uid);
        if(route.path === "/" || route.path === "/search" || route.path === "/auth/login" || route.path === "/auth/signUp" || route.path.includes("teams") || route.path.includes("userPage")){
          console.log("ユーザー認証なしだが除外エリア内")
        }else{
          redirect('/auth/login');
        }
      } else {
        console.log("ログインしています");
        store.dispatch("auth/auth", user.uid);
      }
    });
  };