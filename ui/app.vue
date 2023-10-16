<template>
  <div>
    <UContainer
      :ui="{
        base: 'fixed inset-0 flex flex-col',
        padding: 'px-0 sm:px-0 lg:py-16',
      }"
    >
      <UCard
        :ui="{
          base: 'flex flex-col flex-grow',
          body: {
            base: 'flex flex-col flex-grow overflow-x-hidden overflow-y-auto',
            padding: 'p-0 sm:p-0',
          },
          header: {
            padding: 'p-2 sm:py-4',
          },
          footer: {
            padding: 'p-0 lg:p-2 lg:py-4',
          },
          rounded: 'rounded-none lg:rounded-lg',
        }"
      >
        <template #header>
          <AppHeader />
        </template>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
        <template #footer>
          <AppFooter class="hidden lg:block" />
        </template>
      </UCard>
    </UContainer>

    <UNotifications />
  </div>
</template>
