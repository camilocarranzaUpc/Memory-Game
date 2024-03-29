<template>
  <main class="flex-grow flex bg-themeBackground text-themeText px-8 py-4">
    <div class="flex-grow h-full flex flex-col justify-center items-center max-w-[50%]">
      <p class="font-bold text-4xl sm:text-4xl md:text-4xl lg:text-6xl xl:text-6xl 2xl:text-9xl p-0 lilita-one-regular">The Cartoon Memory Game</p>
      <transition name="bounce">
        <img src="../assets/main.svg" v-if="show" alt="Description of image" class="absolute mb-8 mr-8 bottom-0 right-0 w-24 sm:w-24 md:w-40 lg:w-60 xl:w-75">
      </transition>
    </div>
    <div class="flex-grow h-full flex flex-col gap-5 justify-center items-center">
      <menu-box><router-link :to="{ name: 'game'}">New Game</router-link></menu-box>
      <menu-box><router-link :to="{ name: 'scoreboard'}">Scoreboard</router-link></menu-box>
      <menu-box @click="showModal = true">About</menu-box>
    </div>
    <transition name="bounce">
      <the-modal v-show="showModal" @close="showModal = false">
        <template #header>
          <h2>About The Game</h2>
        </template>
        <template #body>
          <p>The Cartoon Memory Game is a web-based game that challenges players to match pairs of cards. The game is built 
            using <b>Vue.js</b> and <b>Vite</b> for fast and efficient development, with <b>TailwindCSS</b> for styling and responsive design. <b>Pinia</b> is used as a 
            state manager to handle game logic, while <b>Oh Vue Icons!</b> provides a library of icons for enhanced visual appeal. <b>Vitest</b> is used 
            for testing to ensure the game is functioning correctly.</p>
        </template>
        <template #footer>
          <button @click="showModal = false" class="lilita-one-regular bg-themeText text-themeBackground p-2 rounded-md">I Got it!</button>
        </template>
      </the-modal>
    </transition>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MenuBox from '@/components/ui/MenuBox.vue'
import TheModal from '@/components/ui/TheModal.vue'

const show = ref(false);
const showModal = ref(false);

onMounted(() => {
  setTimeout(() => {
    show.value = true;
  }, 500);
});
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.20);
  }
  100% {
    transform: scale(1);
  }
}
</style>