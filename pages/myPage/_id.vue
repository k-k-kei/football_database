<template>
  <div>
    <!-- チーム表示エリア -->
    <template v-if="isEdited">
      <TeamDetailCard :teamDetailed="teams" />

      <!-- 編集ボタン -->
      <div v-for="team in teams" :key="team.id">
        <div v-if="hasAuthority(team.user_id)">
          <button
            @click="edit"
            class="w-11/12 bg-yellow-400 text-white m-3 p-3 rounded-md"
          >
            編集
          </button>
        </div>
      </div>
    </template>
    <!-- チーム表示エリア -->

    <!-- チーム編集エリア -->
    <template v-else>
      <!-- チームプロフィール画像編集 -->
      <img
        :src="profileImage === '' ? showImage : profileImage"
        class="object-cover object-center w-full h-56"
      />
      <div class="text-center pt-5">プロフィール画像を変更</div>
      <div class="w-full flex">
        <input type="file" @change="selectImage" class="mx-auto p-2" />
      </div>
      <!-- チームプロフィール画像編集 -->

      <ValidationObserver v-slot="{ invalid }">
        <!-- チーム情報編集 -->
        <TeamDetailCardEdit
          :teamInfo="teamInfo"
          :profileImage="profileImage"
          :showImage="showImage"
        />
        <!-- チーム情報編集 -->

        <!-- 更新・キャンセルボタン -->
        <button
          @click="update"
          :disabled="invalid"
          class="w-11/12 bg-blue-400 text-white m-3 p-3 rounded-md"
        >
          更新
        </button>
        <button
          @click="cancel"
          class="w-11/12 bg-gray-400 text-white m-3 p-3 rounded-md"
        >
          キャンセル
        </button>
        <!-- 更新・キャンセルボタン -->
      </ValidationObserver>
    </template>

    <!-- チーム情報編集画面 -->

    <!-- スケジュール調整中の予定表示 -->
    <div class="md:w-2/3">
      <LayoutTitleHeader :title="'スケジュール調整中'" />

      <div v-if="checkContentsForAdjust()">
        <div v-for="match in adjustedMatches" :key="match.id">

          <!-- 調整中スケジュール一覧 -->
          <div class="w-11/12 m-2 mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
            <NuxtLink :to="'/match/' + match.id">
            <div class="flex p-2">

              <!-- 調整中スケジュールカードのヘッダー -->
              <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              </div>
                <h1 class="text-base font-bold text-gray-800 p-2">{{ match.title }}</h1>
                <p class="text-base font-bold text-gray-800 p-2">
                  vs {{ getTeamName(match.teamId) }}
                </p>
                <div class="flex-shrink-0 h-10 w-10 mx-2">
                  <img
                    class="h-10 w-10 rounded-full"
                    :src="getTeamImage(match.teamId)"
                    alt=""
                  />
                </div>
              </div>

              <!-- 調整中スケジュールカードの内容 -->
              <div class="flex">
                <div class="w-1/2 px-4 md:p-4">
                  <div class="my-4">
                    <!-- チーム画像 -->
                    <div class="text-sm font-bold">場所</div>
                    <p class="text-xs">{{ match.place }}</p>
                  </div>
                </div>
                <div class="w-1/2 px-4 md:p-4">
                  <div class="my-4">
                    <div class="text-sm font-bold">候補日</div>
                    <div
                      v-for="datetime in match.datetime"
                      :key="datetime.id"
                      class="text-xs"
                    >
                      {{ getDate(datetime) }} {{ getTime(datetime) }}
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="text-center p-5">
          <div>現在調整中のスケジュールはありません</div>
          <div>気になるチームと日程調整してみましょう！</div>
        </div>
      </div>
      <!-- スケジュール調整中の予定表示 -->

      

      <!-- 確定スケジュールの予定表示 -->
      <LayoutTitleHeader :title="'確定スケジュール'" />
      <div v-if="checkContentsForConfirmation()">

        <!-- 確定スケジュールカードの内容 -->
        <div v-for="match in confirmationMatches" :key="match.id">
          <div class="w-11/12 m-2 mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
            <!-- 確定スケジュールカードのヘッダー -->
            <div class="flex p-2">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 bg-yellow-200 text-yellow-300 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 class="text-base font-bold text-gray-800 p-2">{{ match.title }}</h1>
            <p class="text-base font-bold text-gray-800 p-2">
              vs {{ getTeamName(match.teamId) }}
            </p>
            </div>

            <p class="text-sm px-2">日程：{{ getDate(match.confirmDate) }}</p>
            <p class="text-sm px-2">キックオフ：{{ getTime(match.confirmDate) }}</p>
            <p class="text-xs px-2">場所：{{ match.place }}</p>
            <div class="flex">
              <div class="w-1/2 px-4 md:p-4">
                <div class="my-4">
                  <!-- チーム画像 -->
                  <div class="flex-shrink-0 h-28 w-28">
                    <img
                      class="h-28 w-28 rounded-full"
                      :src="getTeamImage(match.teamId)"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              
              <div class="w-1/2 px-4 md:p-4">
                <div class="my-4">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="text-center p-5">
          <div>現在確定されたスケジュールはありません</div>
          <div>スケジュールを確定して活動しましょう！</div>
        </div>
      </div>
      <!-- 確定スケジュールの予定表示 -->
    </div>
  </div>
</template>

<script>
import { auth } from "~/plugins/firebase";
import firebase from "~/plugins/firebase";

import { ValidationObserver } from "vee-validate";

export default {
  components: {
    ValidationObserver,
  },
  data() {
    return {
      userInfo: {
        user_id: "",
        loginName: "",
      },

      teamInfo: {
        selectedTeamId: this.$route.params.id,
        name: "",
        category: "",
        level: "",
        motibation: "",
        area1: "",
        area2: "",
        area3: "",
        image: "",
        showImage: "",
        selfIntroduction: "",
      },

      userProfileImage: "",
      profileImage: "",
      updatedFile: "",
      isEdited: true,
    };
  },
  created: function() {
    this.$store.dispatch("init");
    this.$store.dispatch("match/init");

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
          });
      }
    });
  },
  computed: {
    teams() {
      const teams = this.$store.state.teams.filter(
        (el) => el.id === this.$route.params.id
      );

      teams.forEach((el) => {
        this.teamInfo.name = el.name;
        this.teamInfo.category = el.category;
        this.teamInfo.level = el.level;
        this.teamInfo.motibation = el.motibation;
        this.teamInfo.area1 = el.area1;
        this.teamInfo.area2 = el.area2;
        this.teamInfo.area3 = el.area3;
        this.teamInfo.selfIntroduction = el.selfIntroduction;
        this.showImage = el.image;
      });

      return teams;
    },

    adjustedMatches() {
      return this.$store.state.match.matches
        .filter((el) =>
          el.teamId.some((data) => data === this.$route.params.id)
        )
        .filter((teams) => teams.flag === 0)
        .sort((a, b) => b.timestamp - a.timestamp);
    },

    confirmationMatches() {
      return this.$store.state.match.matches
        .filter((el) =>
          el.teamId.some((data) => data === this.$route.params.id)
        )
        .filter((teams) => teams.flag === 1)
        .sort((a, b) => b - a);
    },
  },
  methods: {
    edit() {
      return (this.isEdited = false);
    },
    cancel() {
      return (this.isEdited = true);
    },
    update() {
      console.log("aaa");
      this.updatedFile === "" ? this.teamInfo.image : this.updatedFile;
      this.$store.dispatch("update", this.teamInfo);
      this.isEdited = true;
    },

    hasAuthority(id) {
      return this.userInfo.user_id === id;
    },

    getTeamName(array) {
      return this.$store.state.teams
        .filter((el) =>
          array.some((data) => data === el.id && data != this.$route.params.id)
        )
        .map((team) => team.name)[0];
    },

    getTeamImage(array) {
      return this.$store.state.teams
        .filter((el) =>
          array.some((data) => data === el.id && data != this.$route.params.id)
        )
        .map((team) => team.image)[0];
    },

    getDate(datetime) {
      return datetime
        .replace("-", "/")
        .replace("-", "/")
        .slice(0, -6);
    },

    getTime(datetime) {
      return datetime.slice(-5);
    },

    selectImage(e) {
      const file = e.target.files[0];
      this.teamInfo.image = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.profileImage = e.target.result;
      };
    },

    checkContentsForAdjust() {
      return this.adjustedMatches.length != 0 ? true : false;
    },

    checkContentsForConfirmation() {
      return this.confirmationMatches.length != 0 ? true : false;
    },
  },
};
</script>
