<template>
  <div class="text-gray-700 font-sans text-sm md:text-lg">
    <div class="bg-white shadow">
      <div class="text-center flex justify-between mx-3 md:mx-8 py-2">
        <div class="p-2">
          <NuxtLink to="/chat/chatList">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>

    <Nuxt />
    <Footer />
  </div>
</template>
