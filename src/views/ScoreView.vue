<template>
<div class="flex flex-col bg-themeBackground text-themeText px-8 py-4 gap-2 lilita-one-regular">
    <!-- Table of Scores -->
    <!-- <div class="lilita-one-regular flex flex-grow justify-between text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-4xl 2xl:text-4xl" v-for="(score, index) in sortedScores" :key="index">
        <div>Number of pairs: {{score.pairs}}</div>
        <div>Moves: {{score.moves}}</div>
        <div>Score: {{ score.score }}</div>
        <div>Time: {{ formatTime(score.time) }}</div>
        <v-icon 
            name="md-deleteforever" 
            class="text-lg cursor-pointer" 
            animation="wrench" 
            hover scale="2" 
            @click="deleteScore(index)"
        />
    </div> -->
    <table>
         <thead class="text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-4xl 2xl:text-4xl">
          <tr>
            <th class="px-6 py-2 text-left">Number of pairs</th>
            <th class="px-6 py-2 text-center">Moves</th>
            <th class="px-6 py-2 text-center">Score</th>
            <th class="px-6 py-2 text-center">Time</th>
            <th class="px-6 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(score, index) in sortedScores" :key="index" class="" >
            <td class="px-6 py-4 text-left">{{ score.pairs }}</td>
            <td class="px-6 py-4 text-center">{{ score.moves }}</td>
            <td class="px-6 py-4 text-center">{{ score.score }}</td>
            <td class="px-6 py-4 text-center">{{ formatTime(score.time) }}</td>
            <td class="px-6 py-4 text-right">
              <v-icon 
                name="md-deleteforever" 
                class="text-lg cursor-pointer" 
                animation="wrench" 
                hover scale="2" 
                @click="deleteScore(index)"
            />
            </td>
          </tr>
        </tbody>
    </table>
</div>
</template>

<script setup>
import { computed } from 'vue'
import { useScoreboardStore } from '@/stores/scoreboard'

const scoreboardStore = useScoreboardStore()

//every score is an object with a score and a time
const scores = computed(() => scoreboardStore.getScores)
//sort the scores by les time
const sortedScores = computed(() => scores.value.sort((a, b) => a.time - b.time))

function deleteScore(index) {
    scoreboardStore.deleteScore(index)
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}
</script>
