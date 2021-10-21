<template>
    <div>
        <h1 class="text-xl text-white bg-gradient-to-r from-green-400  to-blue-500 my-2 px-3 py-4">{{ title }}</h1>
    </div>
</template>

<script>
export default {
  props: {
    title: String,
  }
}
</script>