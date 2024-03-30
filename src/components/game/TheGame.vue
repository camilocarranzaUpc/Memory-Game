<template>
    <div class="flex-grow flex flex-col text-themeText justify-center items-center gap-2">
        <div class="grid grid-rows-4 grid-flow-col gap-2">
        <the-card v-for="(card, index) in cards" :card="card" :key="index">
            <template  #front>
                <div class="bg-themeText text-themeBackground p-2 rounded-md cursor-pointer"
                    :class="cardSize"
                >
                    <img :src="`/src/assets/themes/${card.theme}.jpg`" alt="">
                </div>
            </template >
            <template  #back>
                <div class="bg-themeText text-themeBackground p-2 rounded-md cursor-pointer"
                    :class="cardSize"
                >
                    <img :src="`/src/assets/doodles/${card.image}.jpg`" alt="">
                </div>
            </template>
        </the-card>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useGameStore } from '@/stores/game'
import TheCard from './TheCard.vue'

const gameStore = useGameStore()
const cards = computed(() => gameStore.getCards)
const size = computed(() => cards.value.length)
const windowWidth = ref(window.innerWidth)

const updateWindowWidth = () => {
    windowWidth.value = window.innerWidth
}

onMounted(() => {
    window.addEventListener('resize', updateWindowWidth)
})

onUnmounted(() => {
    window.removeEventListener('resize', updateWindowWidth)
})

const cardSize = computed(() => {
    if (windowWidth.value > 1200) {
        if (size.value <= 16) return 'w-36 h-36'
        if (size.value <= 36) return 'w-24 h-24'
        if (size.value <= 64) return 'w-18 h-18'
        return 'w-16 h-16'
    } else if (windowWidth.value > 800) {
        if (size.value <= 16) return 'w-24 h-24'
        if (size.value <= 36) return 'w-20 h-20'
        if (size.value <= 64) return 'w-16 h-16'
        return 'w-14 h-14'
    } else {
        if (size.value <= 16) return 'w-20 h-20'
        if (size.value <= 36) return 'w-16 h-16'
        if (size.value <= 64) return 'w-14 h-14'
        return 'w-12 h-12'
    }
})
</script>
