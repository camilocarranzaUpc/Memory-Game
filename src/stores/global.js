import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore({
    id: 'global',
    state: () => ({
        darkMode: false || localStorage.getItem('darkMode') === 'dark',
        sound: false,
    }),
    getters: {
        isDarkMode() {
        return this.darkMode
        },
        isSoundOn() {
        return this.sound
        }
    },
    actions: {
        toggleDarkMode() {
            this.darkMode = !this.darkMode
            localStorage.setItem('darkMode', this.darkMode ? 'dark' : 'light');
        },
        toggleSound() {
            this.sound = !this.sound;
        }
    },
    })