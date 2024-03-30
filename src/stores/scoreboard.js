import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useScoreboardStore = defineStore({
    id: 'scoreboard',
    state: () => ({
        scores: useStorage('scores', [])
    }),
    getters: {
        getScores() {
            return this.scores
        },
    },
    actions: {
        addScore(score) {
            this.scores.push(score)
        },
        deleteScore(index) {
            this.scores.splice(index, 1)
        }
    }
})
