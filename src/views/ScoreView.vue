<template>
<div class="flex flex-col bg-themeBackground text-themeText px-8 py-4 gap-2">
    <!-- Table of Scores -->
    <div class="lilita-one-regular flex flex-grow justify-between text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-4xl 2xl:text-4xl" v-for="(score, index) in scores" :key="index">
        <div>Number of Pairs: {{ score.score }}</div>
        <div>Time: {{ formatTime(score.time) }}</div>
        <v-icon 
            name="md-deleteforever" 
            class="text-lg cursor-pointer" 
            animation="wrench" 
            hover scale="2" 
            @click="deleteScore(index)"
        />
    </div>
</div>
</template>

<script setup>
import { computed } from 'vue'
import { useScoreboardStore } from '@/stores/scoreboard'

const scoreboardStore = useScoreboardStore()

//every score is an object with a score and a time
const scores = computed(() => scoreboardStore.getScores)

function deleteScore(index) {
    scoreboardStore.deleteScore(index)
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}
</script>
