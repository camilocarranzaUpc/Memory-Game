import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { set } from '@vueuse/core'

export const useGameStore = defineStore({
    id: 'game',
    state: () => ({
        score: 0,
        movesNumber: 0,
        settings: false,
        gameStatus: "setup", // setup, playing, gameover
        cardsTheme: null,
        pairsNumber: null,
        time: 0,
        innerTime: 0,
        deck: [],
        flippedCards: [],
        timerId: null,
        innerTimerId: null,
        blockDeck: false
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
        },
        getPairsNumber() {
        return this.pairsNumber
        },
        getMovesNumber() {
        return this.movesNumber
        },
        getBlockedStatus() {
            return this.blockDeck
        }
    },
    actions: {
        incrementScore() {
            const scoreIncrement = Math.max(10 - this.innerTime, 1); // Minimum score increment is 1
            this.score += scoreIncrement;
            clearInterval(this.innerTimerId);
            this.innerTimerId = null;
            this.innerTime = 0;
            this.incrementInnerTime();

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
        this.incrementInnerTime()
        },
        gameOver() {
        this.gameStatus = "gameover"
        //Stop the timer
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
        if (this.innerTimerId) {
            clearInterval(this.innerTimerId);
            this.innerTimerId = null;
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
        if (this.timerId) clearInterval(this.timerId)
        this.timerId = null
        this.innerTime = 0
        if (this.innerTimerId) clearInterval(this.innerTimerId)
        this.innerTimerId = null
        this.movesNumber = 0
        },
        quitGame() {
            if (this.timerId) {
                clearInterval(this.timerId);
                this.timerId = null;
            }
            if (this.innerTimerId) {
                clearInterval(this.innerTimerId);
                this.innerTimerId = null;
            }
            this.restartGame()

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
        this.movesNumber++
        }
        },
        incrementTime() {
            // Increment the time every second
            this.timerId = setInterval(() => {
                this.time++
            }, 1000)
        },
        incrementInnerTime() {
            // Increment the time every second
            this.innerTimerId = setInterval(() => {
                this.innerTime++
            }, 1000)
        },
        checkMatch() {
            this.blockDeck = true
            const [firstCard, secondCard] = this.flippedCards
            const card1 = this.deck.find((card) => card.id === firstCard)
            const card2 = this.deck.find((card) => card.id === secondCard)
            if (card1.image === card2.image) {
                this.incrementScore()
                this.flippedCards = []
                card1.block = true
                card2.block = true
                this.blockDeck = false
            } else {
                
                setTimeout(() => {
                    this.flippedCards = []
                    card1.block = false
                    card2.block = false
                    card1.flipped = false
                    card2.flipped = false
                }, 500)
               setTimeout(() => {
                this.blockDeck = false
               }, 600)
            }
            
        },
    },
    })