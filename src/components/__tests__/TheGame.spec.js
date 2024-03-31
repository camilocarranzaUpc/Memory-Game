import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TheGame from '@/components/game/TheGame.vue'

describe('TheGame.vue', () => {
  it('All cards in computed property have block property set to false initially', () => {
    const wrapper = mount(TheGame)
    const computedCards = wrapper.vm.cards
    for (let card of computedCards) {
      expect(card.block).toBe(false)
    }
  })
})