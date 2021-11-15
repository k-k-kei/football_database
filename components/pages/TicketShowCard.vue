<template>
  <div class="md:flex md:flex-wrap">
    <div
      v-for="ticket in tickets"
      :key="ticket.id"
      class="h-44 m-2 mx-auto overflow-hidden bg-white shadow md:h-56 md:w-1/2"
    >
      <NuxtLink :to="link + ticket.id">
      <div class="flex items-center px-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
        <h1 class="text-base font-bold text-gray-800 p-2 overflow-hidden">
          {{ ticket.title }}
        </h1>
      </div>
        <div class="flex">
          <div class="w-1/2">
            <img :src="teamImage(ticket.uid)" :alt="ticket.title" class="h-full w-full" />
          </div>

          <div class="w-1/2 px-4 md:p-4">
            <div class="mt-1">
              <div class="text-sm font-bold">募集日時</div>
              <p class="text-xs">{{ ticket.datetime }}</p>
            </div>
            <div class="my-1">
              <div class="text-sm font-bold">レベル</div>
              <p class="text-xs">{{ ticket.level }}</p>
            </div>
            <div class="my-1">
              <div class="text-sm font-bold">場所</div>
              <p class="text-xs">{{ ticket.place }}</p>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tickets: Array,
    link: String
  },

  created(){
    this.$store.dispatch("init");
  },

  methods: {
    teamImage(uid) {
      return this.$store.state.teams
      .filter((el) => el.user_id === uid)
      .map(el => el.image);
    },
  }
}
</script>