<template>
  <NuxtLink :to="link">
    <div class="mx-auto overflow-hidden bg-white shadow md:h-56 md:w-1/2">
      <p class="w-full p-4">{{ title }}</p>
    </div>
  </NuxtLink>
</template>

<script>
export default {
    props: {
        link: String,
        title: String
    }
}
</script>