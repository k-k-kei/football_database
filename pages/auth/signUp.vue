<template>
  <div>
    <div class="grayBackCover">
      <SignupForm />
    </div>
  </div>
</template>

<script>
import SignupForm from "~/components/pages/SignupForm"

export default {
  components: {
    SignupForm
  }
}
</script>

<style lang="postcss" scoped>

.grayBackCover {
  @apply min-h-screen bg-gray-200 py-6 flex flex-col sm:py-12;
}

</style>