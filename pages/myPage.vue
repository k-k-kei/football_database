<template>
  <div>
    <div class="bg-white divide-y divide-gray-200">
      <div class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
          <!-- ユーザー画像 -->
          <div class=" flex-shrink-0 h-10 w-10">
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
            <div class="text-sm text-gray-500">
              <button><nuxt-link to="profile">プロフィール</nuxt-link></button>
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

    <div class="w-full text-center">
      <select
        v-model="teamInfo.selectedTeamId"
        name="teams"
        class="bg-gray-200 w-11/12 p-2 rounded-lg"
      >
        <option>チームを選択してください</option>
        <option v-for="team in teams" :value="team.id" :key="team.id">
          <div>{{ team.name }}</div>
        </option>
      </select>
    </div>

    <!-- 
  
  チーム表示エリア

 -->
    <template v-if="isEdited">
      <div
        v-for="one in oneTeam"
        :key="one.id"
        class="max-w-sm my-5 mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
      >
        <!-- チームプロフィール画像 -->
        <img class="object-cover object-center w-full h-56" :src="showImage" />

        <div class="px-6 py-4">
          <h1 class="text-xl font-semibold text-gray-800 dark:text-white">
            {{ one.name }}
          </h1>

          <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            <svg
              class="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 11H10V13H14V11Z" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z"
              />
            </svg>

            <h1 class="px-2 text-sm">{{ one.level }}</h1>
          </div>

          <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            <svg
              class="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"
              />
            </svg>

            <h1 class="px-2 text-sm">{{ one.area }}</h1>
          </div>

          <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            <svg
              class="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
              />
            </svg>

            <h1 class="px-2 text-sm">patterson@example.com</h1>
          </div>
        </div>
        <button
          @click="edit"
          class="w-11/12 bg-yellow-400 text-white m-3 p-3 rounded-md"
        >
          編集
        </button>
      </div>
    </template>

    <!-- 
  
  チーム編集エリア

 -->
    <template v-else>
      <div
        v-for="one in oneTeam"
        :key="one.id"
        class="max-w-sm my-5 mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
      >
        <!-- チームプロフィール画像 -->
        <img
          :src="profileImage === '' ? showImage : profileImage"
          class="object-cover object-center w-full h-56"
        />
        <div class="text-center pt-5">プロフィール画像を変更</div>
        <div class="w-full flex">
          <input type="file" @change="selectImage" class="mx-auto p-2" />
        </div>

        <ValidationObserver v-slot="{ invalid }">
          <div class="px-6 py-4">
            <ValidationProvider
              name="チーム名"
              rules="required"
              v-slot="{ errors }"
            >
              <div>
                <input
                  type="text"
                  v-model="teamInfo.name"
                  class="bg-gray-200 w-full mt-2 p-2 rounded-lg"
                />
              </div>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>

            <ValidationProvider name="競技レベル" rules="required" v-slot="v">
              <select
                v-model="teamInfo.level"
                name="競技レベル"
                class="bg-gray-200 w-full mt-2 p-2 rounded-lg"
              >
                <option disabled>競技レベルを選択</option>
                <option>競技志向（ハイレベル）</option>
                <option>競技志向（シリアス）</option>
                <option>競技志向（ジェネラル）</option>
                <option>エンジョイ（シリアス）</option>
                <option>エンジョイ（ジェネラル）</option>
                <option>エンジョイ（ファン）</option>
              </select>
              <span>{{ v.errors[0] }}</span>
            </ValidationProvider>

            <ValidationProvider
              name="エリア"
              rules="required"
              v-slot="{ errors }"
            >
              <div>
                <input
                  type="text"
                  v-model="teamInfo.area"
                  class="bg-gray-200 w-full mt-2 p-2 rounded-lg"
                />
              </div>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <button
            @click="update"
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
  message: "必須入力項目です"
});

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      userInfo: {
        user_id: "",
        loginName: ""
      },

      teamInfo: {
        selectedTeamId: "",
        name: "",
        level: "",
        area: "",
        image: ""
      },

      userProfileImage: "",
      profileImage: "",
      updatedFile: "",
      showImage: "",
      isEdited: true
    };
  },
  created: function() {
    auth.onAuthStateChanged(user => {
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
        .then(url => {
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
        el => el.user_id === this.userInfo.user_id
      );
    },
    oneTeam() {
      const oneTeam = this.$store.state.teams.filter(
        el =>
          el.user_id === this.userInfo.user_id &&
          el.id === this.teamInfo.selectedTeamId
      );

      oneTeam.forEach(el => {
        this.teamInfo.name = el.name;
        this.teamInfo.level = el.level;
        this.teamInfo.area = el.area;
        this.showImage = el.image;
      });

      return oneTeam;
    }
  },
  methods: {
    edit() {
      return (this.isEdited = false);
    },
    cancel() {
      return (this.isEdited = true);
    },
    update() {
      this.teamInfo.image =
        this.updatedFile === "" ? this.teamInfo.image : this.updatedFile;
      this.$store.dispatch("update", this.teamInfo);
      this.isEdited = true;
    },
    selectImage(e) {
      console.log(e.target.files[0]);
      const file = e.target.files[0];
      this.updatedFile = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        console.log(e.target.result);
        this.profileImage = e.target.result;
      };
    }
  }
};
</script>
