import { describe, it, expect } from 'vitest'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import GameView from '@/views/GameView.vue'
import { useGameStore } from '@/stores/game'

describe('GameView.vue', () => {
    for (let pairsNumber = 2; pairsNumber <= 16; pairsNumber++) {
      for (let selectedCard = 1; selectedCard <= 9; selectedCard++) {
        it(`starts and ends the game with ${pairsNumber} pairs and theme ${selectedCard}`, async () => {
          const app = createApp(GameView)
          app.use(createPinia())
          const wrapper = mount(GameView, { global: { plugins: [app] } })
          const store = useGameStore()
          await nextTick()
          expect(store.getGameStatus).toBe('setup')
          wrapper.vm.startGame(pairsNumber, selectedCard)
          await nextTick()
          expect(store.getGameStatus).toBe('playing')
          store.gameOver()
          await nextTick()
          expect(store.getGameStatus).toBe('gameover')
        })
      }
    }
  })

