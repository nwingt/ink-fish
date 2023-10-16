<template>
  <header class="grid grid-cols-3 items-center">
    <UTooltip text="Menu">
      <UButton
        icon="i-heroicons-bars-3"
        variant="ghost"
        size="xl"
        @click="isOpenMenu = true"
      />
    </UTooltip>

    <h1 class="text-center text-2xl font-bold">Ink Fish</h1>

    <USlideover v-model="isOpenMenu" side="left">
      <UCard
        class="flex flex-col flex-1"
        :ui="{
          body: { base: 'flex-1' },
          header: { base: 'flex justify-between items-center' },
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <UButton
            variant="ghost"
            icon="i-heroicons-x-mark"
            @click="isOpenMenu = false"
          />
          <ClientOnly>
            <UToggle
              on-icon="i-heroicons-moon-20-solid"
              off-icon="i-heroicons-sun-20-solid"
              v-model="isDark"
            />
            <template #fallback>
              <div class="w-8 h-8" />
            </template>
          </ClientOnly>
        </template>

        <UVerticalNavigation
          :links="menuLinks"
          :ui="{
            size: 'text-xl',
            padding: 'py-4',
            icon: { base: 'w-8 h-8' },
          }"
        >
        <template #avatar="{ link }">
          <UAvatar
            v-if="link.avatar"
            v-bind="link.avatar"
            size="sm"
            :ui="{ wrapper: 'outline outline-gray-100 dark:outline-gray-800' }"
          />
        </template>
        </UVerticalNavigation>

        <template #footer>
          <UButton size="xl" :block="true" variant="outline" label="Logout" />

          <AppFooter class="mt-4 lg:hidden" tag="div" />
        </template>
      </UCard>
    </USlideover>
  </header>
</template>

<script setup>
const isOpenMenu = ref(false)

const menuLinks = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/',
  },
  {
    label: 'Collection',
    icon: 'i-heroicons-squares-2x2',
    to: '/collection',
  },
  {
    label: 'Settings',
    icon: 'i-heroicons-cog-8-tooth',
    to: '/settings',
  },
].map((link) => {
  if (link.to) {
    return {
      ...link,
      click: () => {
        isOpenMenu.value = false
      },
    }
  }
  return link
})

const colorMode = useColorMode()

const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>
