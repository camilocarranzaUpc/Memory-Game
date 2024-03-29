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
      <menu-box>About</menu-box>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MenuBox from '@/components/ui/MenuBox.vue'

const show = ref(false);

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