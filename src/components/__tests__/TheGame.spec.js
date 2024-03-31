import { describe, it, expect } from 'vitest'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import TheGame from '@/components/game/TheGame.vue'

describe('TheGame.vue', () => {
  it('renders the component', () => {
    const app = createApp(TheGame)
    app.use(createPinia())
    const wrapper = mount(TheGame, { global: { plugins: [app] } })
    expect(wrapper.element).to.exist
  })
})
