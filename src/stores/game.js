import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore({
    id: 'game',
    state: () => ({
        score: 0,
        isGameOver: false,
    }),
    getters: {
        scoreText() {
        return `Score: ${this.score}`
        },
    },
    actions: {
        incrementScore() {
        this.score++
        },
        endGame() {
        this.isGameOver = true
        },
    },
    })