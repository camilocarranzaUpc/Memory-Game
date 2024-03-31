<template>
<div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 bg-themeBackground text-themeText px-8 py-4 gap-4 lilita-one-regular">
    <!-- Table of Scores -->
    <score-card 
      :pairs="score.pairs" 
      :moves="score.moves" 
      :score="score.score" 
      :time="score.time"
      :index="index" 
      @delete="deleteScore(index)" 
      v-for="(score, index) in sortedScores" 
      :key="index"
    >
    </score-card>
</div>
</template>

<script setup>
import { computed } from 'vue'
import { useScoreboardStore } from '@/stores/scoreboard'
import ScoreCard from '@/components/ui/ScoreCard.vue'

const scoreboardStore = useScoreboardStore()

//every score is an object with a score and a time
const scores = computed(() => scoreboardStore.getScores)
//sort the scores by les time
const sortedScores = computed(() => scores.value.sort((a, b) => a.time - b.time))

function deleteScore(index) {
    scoreboardStore.deleteScore(index)
}
</script>
