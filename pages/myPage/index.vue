<template>
  <div class="md:w-3/4 md:mx-auto md:flex">
  
  <div class="md:w-1/3 md:border md:pb-3">
    <LayoutTitleHeader :title="'ユーザー情報'" />

    <div class="bg-white divide-y divide-gray-200">
      <div class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
          <!-- ユーザー画像 -->
          <div class="flex-shrink-0 h-10 w-10 md:h-16 md:w-16">
            <img
              class="h-full w-full rounded-full"
              :src="userProfileImage"
              alt=""
            />
          </div>

          <div class="ml-4">
            <!-- ユーザー名 -->
            <div class="text-sm font-medium text-gray-900 md:text-xl">
              {{ userInfo.loginName }}
            </div>

            <!-- ユーザーアドレス -->
            <div class="text-sm text-yellow-500 md:text-xl">
              <button>
                <nuxt-link to="profile" class="underline"
                  >プロフィール詳細</nuxt-link
                >
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full flex items-center">
      <div class="w-1/2">
        <NuxtLink to="forms/registration">
          <button class="bg-yellow-500 text-white text-center mx-8 p-2 rounded-lg">
            チーム登録
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>

<div class="md:w-2/3 md:border">
      <LayoutTitleHeader :title="'マイチーム一覧'" />

    <div v-if="checkContents()">

    <div v-for="team in teams" :key="team.id">
        <div
          class="m-2 mx-auto overflow-hidden bg-white rounded-lg shadow-lg"
        >
          <NuxtLink :to="'/myPage/' + team.id">
                  <div class="flex items-center px-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h1 class="text-base font-bold text-gray-800 p-2 overflow-hidden">
          {{ team.name }}
        </h1>
      </div>
        <div class="flex">
          <div class="w-1/2">
            <img :src="team.image" :alt="team.image" class="h-full w-full" />
          </div>

          <div class="w-1/2 px-4 md:p-4">
            <div class="mt-1">
              <div class="text-sm font-bold">競技カテゴリー</div>
              <p class="text-xs">{{ team.category }}</p>
            </div>
            <div class="mt-1">
              <div class="text-sm font-bold">チームレベル</div>
              <p class="text-xs">{{ team.level }}</p>
            </div>
            <div class="my-1">
              <div class="text-sm font-bold">エリア</div>
              <p class="text-xs">{{ team.area1 }} {{ team.area2 }} {{ team.area3 }}</p>
            </div>
          </div>
        </div>
          </NuxtLink>
        </div>
       </div>
      </div>
        <div v-else>
          <div class="text-center p-5">
            <div>現在登録されたチームはありません</div>
            <div>チームを登録して活動を始めよう！</div>
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

  methods: {
    checkContents(){
        return this.teams.length != 0 ? true : false;
      }
  }
};
</script>
