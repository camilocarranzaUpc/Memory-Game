<template>
<div :class="{
      'theme-light': !isDarkMode,
      'theme-dark': isDarkMode,
      'flex flex-col h-screen bg-themeBackground text-themeText': true
    }"
>
  <TheHeader />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</div>
</template>

<script setup>
import { useGlobalStore } from './stores/global'
import { computed } from 'vue'

import TheHeader from './components/ui/TheHeader.vue'


const store = useGlobalStore()

const isDarkMode = computed(() => store.isDarkMode)
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

