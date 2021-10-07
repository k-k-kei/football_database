<template>
  <div class="md:w-3/4 md:mx-auto md:flex">
  <div class="my-2 md:w-1/3">

    <div class="bg-white divide-y divide-gray-200">
      <div class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
          <!-- ユーザー画像 -->
          <div class="flex-shrink-0 h-10 w-10">
            <img
              class="h-10 w-10 rounded-full"
              :src="userProfileImage"
              alt=""
            />
          </div>

          <div class="ml-4">
            <!-- ユーザー名 -->
            <div class="text-sm font-medium text-gray-900">
              {{ userInfo.loginName }}
            </div>

            <!-- ユーザーアドレス -->
            <div class="text-sm text-yellow-500">
              <button>
                <nuxt-link to="profile" class="underline"
                  >プロフィール</nuxt-link
                >
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full flex items-center">
      <button class="w-1/2 bg-yellow-500 text-white m-3 p-3 rounded-lg">
        <NuxtLink to="forms/registration">チーム登録</NuxtLink>
      </button>
      <button class="w-1/2 bg-yellow-500 text-white m-3 p-3 rounded-lg">
        <NuxtLink to="chat/chatList">チャット</NuxtLink>
      </button>
    </div>
  </div>

<div class="md:w-2/3">
      <h1 class="text-xl text-white bg-black my-2 px-3 py-4">
          チーム一覧
      </h1>
    <div v-for="team in teams" :key="team.id">
        <div
          class="w-11/12 m-2 mx-auto overflow-hidden bg-white rounded-lg shadow-lg"
        >
          <NuxtLink :to="'/myPage/' + team.id">
            <h1 class="text-base font-bold text-gray-800 p-2">
              {{ team.name }}
            </h1>
            <div class="flex">
              <div class="w-1/2">
                <img :src="team.image" :alt="team.image" />
              </div>

              <div class="w-1/2 px-4 md:p-4">
                <div class="mt-2">
                  <div class="font-bold">チームレベル</div>
                  <p class="text-xs">{{ team.level }}</p>
                </div>
                <div class="my-4">
                  <div class="font-bold">エリア</div>
                  <p class="text-xs">{{ team.area }}</p>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
       </div>
      </div>
    </div>
    </template>
  </div>
</template>

<script>
import { auth } from "~/plugins/firebase";
import firebase from "~/plugins/firebase";


export default {
  data() {
    return {
      userInfo: {
        user_id: "",
        loginName: "",
      },

      userProfileImage: "",
    };
  },
  created: function () {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.userInfo.loginName = null;
      } else {
        this.userInfo.loginName = user.displayName;
        this.userInfo.user_id = user.uid;
        this.userProfileImage = `userProfileImages/${user.photoURL}`;

        const storageRef = firebase.storage().ref();
        storageRef
          .child(this.userProfileImage)
          .getDownloadURL()
          .then((url) => {
            this.userProfileImage = url;
            console.log(user);
            console.log(this.userProfileImage);
          });
      }
    });

    this.$store.dispatch("init");
  },
  computed: {
    teams() {
      return this.$store.state.teams.filter(
        (el) => el.user_id === this.userInfo.user_id
      );
    },
  },
};
</script>
