<template>
  <div class="md:w-3/4 md:mx-auto md:flex">
    <div class="md:w-1/3 md:border md:pb-3">
      <div class="bg-white divide-y divide-gray-200">
        <div class="px-6 py-4 whitespace-nowrap">
          <div class="flex items-center">
            <!-- ユーザー画像 -->
            <div class="flex-shrink-0 h-10 w-10 md:h-16 md:w-16">
              <img
                class="h-full w-full rounded-full"
                :src="userProfileImage"
                alt="user-profile-image"
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
                  <nuxt-link to="myPage/profile" class="underline"
                    >プロフィール詳細</nuxt-link
                  >
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 
      
  マイチーム一覧を表示
      
  -->
    <div class="bg-gray-200 mb-20 md:w-2/3 md:border">
      <BaseTitleHeader :title="'マイチーム'" />

      <!-- チーム登録数が0の場合は「登録されたチームはありません」を表示。 -->
      <!-- 登録がある場合はTeamShowCardコンポーネントで表示 -->
      <div v-if="checkContents()">
        <TeamShowCard :teams="teams" :userInfo="userInfo" :link="'/myPage/'" />
      </div>
      <div v-else>
        <div class="text-center p-5">
          <p>現在登録されたチームはありません</p>
          <p>チームを登録して活動を始めよう！</p>

          <!-- チーム登録ボタン -->
          <NuxtLink to="forms/registration">
            <button
              class="bg-yellow-500 text-white text-center mt-5 p-2 rounded-lg"
            >
              チーム登録
            </button>
          </NuxtLink>
        </div>
      </div>

      <!-- 作成、調整、完了済みのマッチ情報を管理 -->
      <div>
        <BaseTitleHeader :title="'マッチ管理'" />
        <div class="my-2">
          <BaseBannerButton :title="'一覧を見る'" :link="'myPage/ownMatch'" />
          <!-- <BaseBannerButton :title="'申込をしたマッチ'" :link="'myPage/othersMatch'" /> -->
        </div>
      </div>

      <div>
        <BaseTitleHeader :title="'フォロー一覧'" />
        <div class="my-2">
          <BaseBannerButton :title="'準備中...'" :link="'/'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "~/plugins/firebase";
import firebase from "~/plugins/firebase";

import TeamShowCard from "~/components/pages/TeamShowCard";

export default {
  components: {
    TeamShowCard,
  },
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
    checkContents() {
      return this.teams.length != 0 ? true : false;
    },
  },
};
</script>
