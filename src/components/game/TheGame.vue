<template>
    <div class="flex-grow flex flex-col text-themeText justify-center items-center gap-2 ">
        <transition-group tag="div" name="fade" class="grid grid-rows-4 grid-flow-col gap-2">
        <the-card v-for="(card, index) in cards" :card="card" :key="index" @flip="flipCard" :block="isBlocked">
            <template  #front>
                <div class="bg-themeText text-themeBackground p-2 rounded-md cursor-pointer"
                    :class="cardSize"
                >
                    <img :src="`/themes/${card.theme}.jpg`" alt="">
                </div>
            </template >
            <template  #back>
                <div class="bg-themeText text-themeBackground p-2 rounded-md cursor-pointer"
                    :class="cardSize"
                >
                    <img :src="`/doodles/${card.image}.jpg`" alt="">
                </div>
            </template>
        </the-card>
        </transition-group>
    </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useGameStore } from '@/stores/game'
import TheCard from './TheCard.vue'

const gameStore = useGameStore()
const cards = computed(() => gameStore.getCards)
const size = computed(() => cards.value.length)
const windowWidth = ref(window.innerWidth)
const isGameOver = computed(() => gameStore.getCards.every(card => card.block))
const isBlocked = computed(() => gameStore.getBlockedStatus)

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

const flipCard = (cardId) => {
    gameStore.flipCard(cardId)
    if(gameStore.getFlippedCards.length === 2) {
        gameStore.checkMatch()
    }
    
}

//watch if all cards are matched (card.value.blocked = true)
watch(isGameOver, (value) => {
    if(value) {
        gameStore.gameOver()
    }
})

</script>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>
