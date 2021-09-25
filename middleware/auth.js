import { auth } from "~/plugins/firebase";

export default({ redirect }) => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        console.log("ログインしていません");
        return redirect('/login');
      }
    });
  };