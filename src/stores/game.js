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
        time: 0,
        deck: [],
        flippedCards: [],
        timerId: null
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
        },
        getCards() {
        return this.deck
        },
        getScore() {
        return this.score
        },
        getTime() {
        return this.time
        },
        getFlippedCards() {
        return this.flippedCards
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
        this.incrementTime()
        },
        gameOver() {
        this.gameStatus = "gameover"
        //Stop the timer
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
        },
        restartGame() {
        this.gameStatus = "setup"
        this.score = 0
        this.cardsTheme = null
        this.pairsNumber = null
        this.deck = []
        this.time = 0
        this.flippedCards = []
        this.timerId = null
        },
        buildDeck() {
        const deck = []
        for (let i = 0; i < this.pairsNumber; i++) {
            deck.push({ id: i * 2, image: `img${i + 1}`, theme: `img${this.cardsTheme}`, flipped: false, block: false })
            deck.push({ id: i * 2 + 1, image: `img${i + 1}`, theme: `img${this.cardsTheme}`, flipped: false, block: false })
        }
        // Shuffle the deck
        return deck.sort(() => Math.random() - 0.5)
        },
        shuffleDeck() {
        this.deck = this.deck.sort(() => Math.random() - 0.5)
        },
        flipCard(cardId) {
        const card = this.deck.find((card) => card.id === cardId)
        if(!card.block){
        card.flipped = !card.flipped
        this.flippedCards.push(cardId)
        card.block = true
        }
        },
        incrementTime() {
            // Increment the time every second
            this.timerId = setInterval(() => {
                this.time++
            }, 1000)
        },
        checkMatch() {
            const [firstCard, secondCard] = this.flippedCards
            const card1 = this.deck.find((card) => card.id === firstCard)
            const card2 = this.deck.find((card) => card.id === secondCard)
            if (card1.image === card2.image) {
                this.incrementScore()
                this.flippedCards = []
                card1.block = true
                card2.block = true
            } else {
                
                setTimeout(() => {
                    this.flippedCards = []
                    card1.block = false
                    card2.block = false
                    card1.flipped = false
                    card2.flipped = false
                }, 500)
            }
        },
    },
    })