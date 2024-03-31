<template>
    <div class="bg-themeText text-themeBackground text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-4xl 2xl:text-4xl p-4 min-w-40 rounded-lg">
        <p>Number of pairs: {{pairs}}</p>
        <p>Moves: {{moves}}</p>
        <p>Score: {{ score }}</p>
        <p>Time: {{ formatTime(time) }}</p>
        <div class="flex justify-between">
            <v-icon 
                name="md-deleteforever" 
                class="text-lg cursor-pointer" 
                animation="wrench" 
                hover scale="2" 
                @click="deleteScore"
            />
            <v-icon 
                v-if="index >= 0 && index < 3"
                name="fa-medal" 
                :fill="fillIcon"
                class="text-lg" 
                animation="wrench" 
                hover scale="2" 
            />
        </div>
        
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useScoreboardStore } from '@/stores/scoreboard'

const scoreboardStore = useScoreboardStore()

const props = defineProps({
    pairs: Number,
    moves: Number,
    score: Number,
    time: Number,
    index: Number
})

const emits = defineEmits(['delete'])

const fillIcon = props.index === 0 ? 'gold' : props.index === 1 ? 'silver' : 'orange'

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function deleteScore() {
    emits('delete')
}
</script>
