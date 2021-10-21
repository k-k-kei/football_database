<template>
  <div>
    <label :for="name" class="block text-sm font-medium text-gray-700">
        {{ label }}
    <span v-if="required" class="text-red-400">※必須</span>
    </label>
    <select
      @input="selected"
      :value="value"
      class="appearance-none bg-gray-200 w-11/12 p-2 rounded-lg"
    >
      <option disabled>{{ value }}</option>
      <option v-for="option in options" :key="option.id">
        <div>{{ option }}</div>
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    label: String,
    required: Boolean,
    value: String,
    options: Array,
  },

  methods: {
    selected($event) {
        console.log($event.target.value)
      this.$emit("selected", $event.target.value);
    },
  },
};
</script>
