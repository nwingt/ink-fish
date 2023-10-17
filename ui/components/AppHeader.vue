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

    <h1 class="text-center text-2xl font-bold">{{ $t('app_header_title') }}</h1>

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

          <div class="flex items-center gap-4">
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
  
            <USelect
              :value="locale"
              :options="localeList"
              icon="i-heroicons-language"
              :ui="{ rounded: 'rounded-full' }"
              @change="handleLocaleChange"
            />
          </div>
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
          <UButton
            size="xl"
            :block="true"
            variant="outline"
            :label="$t('app_menu_logout_button')"
          />

          <AppFooter class="mt-4 lg:hidden" tag="div" />
        </template>
      </UCard>
    </USlideover>
  </header>
</template>

<script setup>
const isOpenMenu = ref(false)

const { locale, locales, t: $t } = useI18n()

const localeList = computed(() => locales.value.map(i => ({
  label: i.name,
  value: i.code,
})))

const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

function handleLocaleChange(event) {
  router.push(switchLocalePath(event.target.value))
}

const localePath = useLocalePath()

const menuLinks = computed(() => [
  {
    label: $t('app_menu_home_link'),
    icon: 'i-heroicons-home',
    to: localePath({ name: 'index' }),
  },
  {
    label: $t('app_menu_collection_link'),
    icon: 'i-heroicons-squares-2x2',
    to: localePath({ name: 'collection' }),
  },
  {
    label: $t('app_menu_settings_link'),
    icon: 'i-heroicons-cog-8-tooth',
    to: localePath({ name: 'settings' }),
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
}))

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
