<template>
  <UCard
    :ui="{
      base: 'flex flex-col flex-grow',
      body: { base: 'overflow-x-hidden overflow-y-auto' },
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      header: {
        base: 'flex items-center justify-between',
      },
    }"
  >
    <template #header>
      <h1 class="text-xl font-bold">New Mail</h1>
      <UButton
        variant="ghost"
        icon="i-heroicons-x-mark"
        @click="router.back()"
      />
    </template>

    <main>
      <UTextarea />
    </main>

    <template #footer>
      <UButton
        icon="i-heroicons-paper-airplane"
        label="Send"
        size="xl"
        variant="solid"
        :block="true"
        @click="handleClickSendButton"
      />
    </template>
  </UCard>
</template>

<script setup>
const toast = useToast()
const route = useRoute()
const router = useRouter()

function handleClickSendButton() {
  router.replace({ name: 'index', query: { ...route.query } })
  toast.add({ title: 'Sent!' })
}
</script>
