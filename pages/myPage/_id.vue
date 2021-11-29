<template>
  <div class="mb-10 md:w-3/4 md:mx-auto">
    <div class="md:flex">
      <!-- 
          
        チーム詳細表示
          
      -->
      <div class="md:w-1/2 md:mx-5">
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
      </div>
      <!-- チーム情報編集画面 -->
    </div>
  </div>
</template>

<script>
import { auth } from "~/plugins/firebase";
import firebase from "~/plugins/firebase";

import { ValidationObserver } from "vee-validate";

import TeamDetailCard from "~/components/pages/TeamDetailCard";
import TeamDetailCardEdit from "~/components/pages/TeamDetailCardEdit";

export default {
  components: {
    ValidationObserver,
    TeamDetailCard,
    TeamDetailCardEdit,
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

      this.$toast.success("更新完了！", {
        position: "top-center",
        timeout: 2000,
      });
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
