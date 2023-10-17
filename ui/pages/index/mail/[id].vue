<template>
  <UCard
    :ui="{
      base: 'flex flex-col flex-grow',
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      header: {
        base: 'flex items-center justify-between',
      },
    }"
  >
    <template #header>
      <h1 class="text-xl font-bold">{{ $t('mail_details_page_title', { id: route.params.id }) }}</h1>
      <UButton
        variant="ghost"
        icon="i-heroicons-x-mark"
        @click="router.back()"
      />
    </template>

    <article class="space-y-2">
      <USkeleton class="h-4 w-[250px]" />
      <USkeleton class="h-4 w-[200px]" />
      <USkeleton class="h-4 w-[150px]" />
      <USkeleton class="h-4 w-[200px]" />
    </article>

    <template #footer>
      <UButton
        icon="i-heroicons-paper-airplane"
        :label="$t('mail_details_page_reply_button')"
        size="xl"
        variant="solid"
        :block="true"
        :to="localePath({ name: 'index-compose', query: { ...route.query } })"
      />
    </template>

  </UCard>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
</script>
