<template>
  <component :is="tag" class="text-sm text-center text-zinc-500 dark:text-zinc-400">
    <span>{{ $t('footer_credit') }}</span>
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
