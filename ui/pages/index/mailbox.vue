<template>
  <UCard
    :ui="{
      base: 'flex flex-col flex-grow',
      body: {
        base: 'overflow-x-hidden overflow-y-auto flex-grow max-h-[50vh] px-4 py-5 sm:p-6',
        padding: '',
      },
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      header: {
        base: 'flex items-center justify-between',
      },
    }"
  >
    <template #header>
      <h1 class="text-xl font-bold">{{ $t('mailbox_page_title') }}</h1>
      <UButton
        variant="ghost"
        icon="i-heroicons-x-mark"
        :to="localePath({ name: 'index' })"
      />
    </template>

    <ul class="flex flex-col gap-4">
      <li v-for="index in 8">
        <ULink :to="localePath({ name: 'index-mail-id', params: { id: index }, query: { ...route.query } })">
          <MailCard :key="index" />
        </ULink>
      </li>
    </ul>

    <template #footer>
      <UButton
        icon="i-heroicons-pencil-square"
        :label="$t('mailbox_page_compose_button')"
        size="xl"
        variant="solid"
        :block="true"
        @click="router.push(localePath({ name: 'index-compose', query: { ...route.query } }))"
      />
    </template>
  </UCard>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
</script>
