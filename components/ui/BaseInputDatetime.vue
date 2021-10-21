<template>
  <div>
    <input
      type="datetime-local"
      @change="inputValue"
      class="p-1 rounded-lg"
    />
  </div>
</template>

<script>
export default {
  methods: {
    inputValue($event) {
      this.$emit("inputValue", $event.target.value);
    },
  },
};
</script>
