<template>
  <div>
    <ValidationObserver v-slot="{ invalid }">
      <keep-alive>
        <form-list-input v-if="formNumber === 0" @update="updateForm" />
        <form-list-confirm v-if="formNumber === 1" :form="formVal" />
        <form-complate v-if="formNumber === 2" />
      </keep-alive>

      <div class="px-4 bg-gray-50 text-right sm:px-6">
        <button
          v-if="formNumber === 0"
          @click="plusNum"
          :disabled="invalid"
          class="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          確認画面へ
        </button>
      </div>

      <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          v-if="formNumber === 1"
          @click="minusNum"
          class="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          戻る
        </button>
      </div>

      <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          v-if="formNumber === 1"
          @click="add"
          class="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          送信
        </button>
      </div>

    </ValidationObserver>
  </div>
</template>

<script>
import FormListInput from "../../components/FormListInput.vue";
import FormListConfirm from "../../components/FormListConfirm.vue";
import FormComplate from "../../components/FormComplate.vue";

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
        level: "",
        area: "",
        selfIntroduction: "",
        image: "",
        showImage: ""
      }
    };
  },
  created: function() {
    auth.onAuthStateChanged(user => {
      if (!user) {
        this.user_id = null;
      } else {
        this.formVal.user_id = user.uid;
        console.log("uidをフォームに追加");
      }
    });
  },
  methods: {
    updateForm: function(formData) {
      Object.assign(this.formVal, formData);
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
    }
  }
};
</script>
