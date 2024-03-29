import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore({
    id: 'game',
    state: () => ({
        score: 0,
        settings: false,
        gameStatus: "setup", // setup, playing, gameover
        cardsTheme: null,
        pairsNumber: null,
    }),
    getters: {
        scoreText() {
        return `Score: ${this.score}`
        },
        settingsStatus() {
        return this.settings
        },
        getGameStatus() {
        return this.gameStatus
        }
    },
    actions: {
        incrementScore() {
        this.score++
        },
        toggleSettings() {
        this.settings = !this.settings
        },
        startGame(pairsNumber, cardsTheme) {
        this.gameStatus = "playing"
        this.pairsNumber = pairsNumber
        this.cardsTheme = cardsTheme
        },
        gameOver() {
        this.gameStatus = "gameover"
        },
        restartGame() {
        this.gameStatus = "setup"
        this.score = 0
        this.cardsTheme = null
        this.pairsNumber = null
        }
    },
    })