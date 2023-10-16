<template>
  <main class="flex flex-col h-full">
    <header class="px-4 sm:px-6 py-2 border-b border-b-gray-200 dark:border-b-gray-800">
      <UTabs
        :items="tabItems"
        v-model="selectedTabIndex"
        :ui="{ wrapper: '' }"
      />
    </header>

    <div class="flex flex-col flex-grow p-4 sm:px-6 overflow-x-hidden overflow-y-auto">
      <ul class="flex flex-col flex-grow gap-4">
        <li v-for="index in isReceivedTabSelected ? 10 : 4">
          <ClientOnly>
            <ULink :to="{ name: 'index-mail-id', params: { id: `${index}` }, query: { ...route.query } }">
              <MailCard :key="index" />
            </ULink>
          </ClientOnly>
        </li>
      </ul>

      <footer class="pt-10 pb-4 sticky bottom-0 pointer-events-none">
        <UTooltip class="pointer-events-auto" text="Inbox">
          <UButton
            size="xl"
            variant="solid"
            icon="i-heroicons-inbox-arrow-down"
            :ui="{
              variant: {
                solid: 'drop-shadow-xl',
              },
              rounded: 'rounded-full',
            }"
            @click="isMailboxOpened = true"
          />
        </UTooltip>
      </footer>
    </div>

    <ClientOnly>
      <UModal v-model="isMailboxOpened">
        <NuxtPage />
      </UModal>

      <UModal v-model="isComposeOpened">
        <NuxtPage />
      </UModal>

      <UModal v-model="isMailOpened">
        <NuxtPage />
      </UModal>
    </ClientOnly>
  </main>
</template>

<script setup>
definePageMeta({
  layout: 'paddingless',
})

const tabItems = [
  {
    label: "Received",
    key: 'received',
  },
  {
    label: "Sent",
    key: 'sent',
  },
]

const route = useRoute()
const router = useRouter()

const selectedTabIndex = computed({
  get() {
    const index = tabItems.findIndex((item) => item.key === route.query.tab)
    if (index === -1) {
      return 0
    }
    return index
  },
  set(value) {
    router.replace({ query: { tab: tabItems[value].key } })
  },
})

const isReceivedTabSelected = computed(() => tabItems[selectedTabIndex.value].key === 'received')

const isMailboxOpened = computed({
  get() {
    return route.name === 'index-mailbox'
  },
  set(value) {
    if (value) {
      router.push({ name: 'index-mailbox', query: { ...route.query } })
    } else {
      router.replace({ name: 'index', query: { ...route.query } })
    }
  },
})

const isComposeOpened = computed({
  get() {
    return route.name === 'index-compose'
  },
  set(value) {
    if (value) {
      router.push({ name: 'index-compose', query: { ...route.query } })
    } else {
      router.replace({ name: 'index-mailbox', query: { ...route.query } })
    }
  },
})

const isMailOpened = computed({
  get() {
    return route.name === 'index-mail-id'
  },
  set(value) {
    if (value) {
      router.push({ name: 'index-mail-id', query: { ...route.query } })
    } else {
      router.back()
    }
  },
})
</script>
