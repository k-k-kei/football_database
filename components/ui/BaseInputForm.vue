<template>
  <div>
    <label :for="name" class="block text-sm font-medium text-gray-700">
        {{ label }}
        <span v-if="required" class="text-red-400">※必須</span>
      </label>
    <input
      type="text"
      @change="inputValue"
      :value="value"
      :placeholder="placeholder"
      class="
                       appearance-none
                        bg-gray-200
                        mt-1
                        p-2
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-11/12
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
    />
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    value: String,
    label: String,
    required: Boolean,
    placeholder: String
  },

  methods: {
    inputValue($event) {
      this.$emit("inputValue", $event.target.value);
    },
  },
};
</script>
