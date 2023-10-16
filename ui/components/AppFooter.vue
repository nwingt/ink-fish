<template>
  <component :is="tag" class="text-sm text-center text-zinc-500 dark:text-zinc-400">
    Made with ❤️ By Liker Land
  </component>
</template>

<script setup>
const props = defineProps({
  tag: {
    type: String,
    default: 'footer'
  }
})
</script>
