<template>
  <div class="md:w-2/5 md:mx-auto">
    <ValidationObserver v-slot="{ invalid }">
      <keep-alive>
        <FormListInput v-if="formNumber === 0" @update="updateForm" />
        <FormListConfirm v-if="formNumber === 1" :form="formVal" />
        <FormComplate v-if="formNumber === 2" />
      </keep-alive>

        <div class="flex w-11/12 mx-auto">
        <button
            v-if="formNumber === 0"
            @click="plusNum"
            :disabled="invalid"
            class="buttonClickable"
        >
            確認画面へ
        </button>
        </div>
      <!-- </div> -->

      <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          v-if="formNumber === 1"
          @click="minusNum"
          class="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          修正する
        </button>
      </div>

      <div class="px-4 pt-3 pb-10 bg-gray-50 text-right sm:px-6">
        <button
          v-if="formNumber === 1"
          @click="add"
          class="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          この内容で送信する
        </button>
      </div>

    </ValidationObserver>
  </div>
</template>

<script>
import FormListInput from "../../components/pages/FormListInput.vue";
import FormListConfirm from "../../components/pages/FormListConfirm.vue";
import FormComplate from "../../components/pages/FormComplate.vue";

import { auth } from "~/plugins/firebase";

import { ValidationObserver } from "vee-validate";

//バリデーションルールをここで定義
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "必須入力項目です"
});

export default {
  components: {
    FormListInput,
    FormListConfirm,
    FormComplate,
    ValidationObserver
  },
  data() {
    return {
      formNumber: 0,
      formVal: {
        user_id: "",
        name: "",
        category: "",
        level: "",
        motibation: "",
        area1: "",
        area2: "",
        area3: "",
        selfIntroduction: "",
        image: "",
        showImage: ""
      }
    };
  },
  created: function() {
    this.$store.dispatch("init");
    this.$store.dispatch("user/userInit");

    auth.onAuthStateChanged(user => {
      if (!user) {
        this.user_id = null;
      } else {
        this.formVal.user_id = user.uid;
      }
    });
  },
  methods: {
    updateForm: function(formData) {
      Object.assign(this.formVal, formData);
      console.log(this.formVal, formData)
    },
    plusNum() {
      this.formNumber++;
    },
    minusNum() {
      this.formNumber--;
    },
    add() {
      this.$store.dispatch("add", this.formVal);
      this.formNumber++;

      const teams = this.$store.state.teams
      .filter(el => el.user_id === this.formVal.user_id)
      .map(data => data.id);

      const userDocId = this.$store.state.user.users
      .filter(el => el.uid === this.formVal.user_id)
      .map(data => data.id)[0];

      this.$store.dispatch("user/addTeamInfo", { docId: userDocId, teams: teams })
      
      this.$toast.success("チーム登録完了！", {
            position: "top-center",
            timeout: 2000,
          });
    }
  }
};
</script>

<style lang="postcss" scoped>

.buttonClickable {
  @apply w-full bg-indigo-600 text-white p-3 rounded-md;
}

:disabled {
  @apply w-full bg-gray-200 text-white p-3 rounded-md;
}

</style>