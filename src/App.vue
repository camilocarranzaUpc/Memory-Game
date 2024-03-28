<template>
<div :class="{
      'theme-light': !isDarkMode,
      'theme-dark': isDarkMode,
    }"
>
  <TheHeader />
  <RouterView />
</div>
</template>

<script setup>
import { useGlobalStore } from './stores/global'
import { computed } from 'vue'

import TheHeader from './components/ui/TheHeader.vue'


const store = useGlobalStore()

const isDarkMode = computed(() => store.isDarkMode)
</script>
