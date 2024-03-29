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
        deck: [],
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
        this.pairsNumber = pairsNumber
        this.cardsTheme = cardsTheme
        this.gameStatus = "playing"
        this.deck = this.buildDeck()
        },
        gameOver() {
        this.gameStatus = "gameover"
        },
        restartGame() {
        this.gameStatus = "setup"
        this.score = 0
        this.cardsTheme = null
        this.pairsNumber = null
        this.deck = []
        },
        buildDeck() {
        const deck = []
        for (let i = 0; i < this.pairsNumber; i++) {
            deck.push({ id: i * 2, image: `img${i + 1}`, theme: `img${this.cardsTheme}`, flipped: false })
            deck.push({ id: i * 2 + 1, image: `img${i + 1}`, theme: `img${this.cardsTheme}`, flipped: false })
        }
        // Shuffle the deck
        return deck.sort(() => Math.random() - 0.5)
        }
    },
    })