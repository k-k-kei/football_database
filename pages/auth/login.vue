<template>
  <div>
    <div class="grayBackCover">
      <LoginForm />
    </div>
  </div>
</template>

<script>
import LoginForm from "~/components/pages/LoginForm"

export default {
  components: {
    LoginForm
  }
}
</script>

<style lang="postcss" scoped>

.grayBackCover {
  @apply min-h-screen bg-gray-200 py-6 flex flex-col sm:py-12;
}

</style>