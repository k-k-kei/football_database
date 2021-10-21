<template>
  <div>
    <div
      v-for="user in users"
      :key="user.id"
      class="
        max-w-sm
        mx-auto
        overflow-hidden
        bg-white
        rounded-lg
        shadow-lg
        dark:bg-gray-800
        mt-3
      "
    >
      <nuxt-link
        :to="'/userPage/' + user.uid"
        class="flex items-center mx-2 py-2 text-gray-700 dark:text-gray-200"
      >
        <div class="flex-shrink-0 h-10 w-10">
          <img
            class="h-10 w-10 rounded-full"
            :src="user.profileImage"
            :alt="user.name"
          />
        </div>
        <h1 class="px-2 text-sm">{{ user.displayName }}</h1>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: Array,
  }
}
</script>