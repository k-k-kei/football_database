<template>
  <div class="p-1 md:w-2/5 md:mx-auto">
    <!-- 
      
      プロフィール表示画面
    
     -->
    <template v-if="isEdited">
      <div class="bg-white divide-y divide-gray-200">
        <div class="px-6 py-4 whitespace-nowrap">
          <div class="flex items-center">
            <!-- ユーザー画像 -->
            <div class=" flex-shrink-0 h-10 w-10">
              <img class="h-10 w-10 rounded-full" :src="profileImage" alt="" />
            </div>

            <div class="ml-4">
              <!-- ユーザー名 -->
              <div class="text-sm font-medium text-gray-900">
                {{ userInfo.loginName }}
              </div>

              <!-- ユーザーアドレス -->
              <div class="text-sm text-gray-500">
                <button>{{ userInfo.email }}</button>
              </div>
            </div>
          </div>
        </div>
        <button
          @click="edit"
          class="w-11/12 bg-yellow-400 text-white m-3 p-3 rounded-md"
        >
          プロフィールを編集
        </button>
        <button class="w-11/12 bg-gray-400 text-white m-3 p-3 rounded-md">
          <NuxtLink to="myPage">マイページへ戻る</NuxtLink>
        </button>
        <a href="/"
          ><button
            @click="logout"
            class="w-11/12 bg-red-400 text-white m-3 p-3 rounded-md"
            tabindex="-1"
            id="menu-item-1"
          >
            ログアウト
          </button></a
        >
      </div>
    </template>

    <!-- 
      
      プロフィール編集画面
      
       -->
    <template v-else>
      <div
        v-for="user in users"
        :key="user.id"
        class="bg-white divide-y divide-gray-200"
      >
        <ValidationObserver v-slot="{ invalid }">
          <div class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <!-- ユーザー画像 -->
              <div class="h-20 w-20 mx-auto">
                <img :src="profileImage" class="h-20 w-20 rounded-full" />
              </div>
            </div>
            <div class="flex w-full my-3">
              <input type="file" @change="selectImage" class="w-full mx-5" />
            </div>

            <div class="w-full">
              <!-- ユーザー名 -->
              <ValidationProvider
                name="ユーザー名"
                rules="required"
                v-slot="{ errors }"
              >
                <div>
                  <input
                    type="text"
                    v-model="userInfo.loginName"
                    class="w-full bg-gray-200 text-center mt-3 p-2 rounded-lg"
                  />
                </div>
                <span>{{ errors[0] }}</span>
              </ValidationProvider>

              <ValidationProvider
                name="メールアドレス"
                rules="required"
                v-slot="{ errors }"
              >
                <div>
                  <input
                    type="text"
                    v-model="userInfo.email"
                    class="w-full bg-gray-200 text-center mt-3 p-2 rounded-lg"
                  />
                </div>
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <button
            @click="update(user.id)"
            :disabled="invalid"
            class="w-11/12 bg-yellow-400 text-white m-3 p-3 rounded-md"
          >
            更新
          </button>
          <button
            @click="cancel"
            class="w-11/12 bg-yellow-400 text-white m-3 p-3 rounded-md"
          >
            キャンセル
          </button>
        </ValidationObserver>
      </div>
    </template>
  </div>
</template>

<script>
import { auth } from "~/plugins/firebase";
import firebase from "~/plugins/firebase";

import { ValidationObserver } from "vee-validate";
import { ValidationProvider } from "vee-validate";

//バリデーションルールをここで定義
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "必須入力項目です",
});

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      userInfo: {
        user_id: "",
        loginName: "",
        email: "",
        image: "",
      },

      profileImage: "",
      showImage: "",
      isEdited: true,
    };
  },
  created: function() {
    this.$store.dispatch("user/userInit");

    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.userInfo.loginName = null;
      } else {
        this.userInfo.user_id = user.uid;
        this.userInfo.loginName = user.displayName;
        this.userInfo.email = user.email;
        this.profileImage = `userProfileImages/${user.photoURL}`;
      }
      console.log(user);

      const storageRef = firebase.storage().ref();
      storageRef
        .child(this.profileImage)
        .getDownloadURL()
        .then((url) => {
          this.profileImage = url;
          console.log(user);
          console.log(this.profileImage);
        });
    });
  },
  computed: {
    users() {
      return this.$store.state.user.users.filter(
        (el) => el.uid === this.userInfo.user_id
      );
    },
  },
  methods: {
    logout() {
      auth.signOut().then(() => {
        console.log("logoutしました");
      });
    },
    edit() {
      return (this.isEdited = false);
    },
    cancel() {
      return (this.isEdited = true);
    },
    update(id) {
      //firebase authのユーザー情報を変更する
      this.$store.dispatch("updateUser", this.userInfo);

      //firestoreのusersコレクションの情報を変更する
      this.$store.dispatch("user/updateUserImage", {
        docId: id,
        profileImage: this.userInfo.image,
      });

      //表示画面に戻す
      this.isEdited = true;
    },
    selectImage(e) {
      console.log(e.target.files[0]);
      const file = e.target.files[0];
      this.userInfo.image = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.profileImage = e.target.result;
      };
    },
  },
};
</script>
