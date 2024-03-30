<template>
<div class="flex-grow flex bg-themeBackground text-themeText px-8 py-4">
    <transition name="bounce">
    <the-modal v-show="showModal" @close="closeModal">
        <template #header>
            <p>Settings</p>
        </template>
        <template #body>
            <div class="flex flex-col justify-center items-center">
                <menu-box @click="restartGame">Restart Game</menu-box>
                <menu-box><router-link :to="{ name: 'home'}">Quit Game</router-link></menu-box>
                <menu-box v-show="gameStatus === 'playing'" @click="shuffleCards">Remix Cards</menu-box>
            </div> 
        </template>
        <template #footer>
            <button @click="closeModal" class="lilita-one-regular bg-themeText text-themeBackground p-2 rounded-md">I Got it!</button>
        </template>
    </the-modal>
    </transition>
    <transition name="slide" mode="out-in">
        <set-up v-if="gameStatus === 'setup'" @start="startGame"/>
        <game v-else/>
    </transition>
    <transition name="bounce">
    <the-modal v-show="gameStatus === 'gameover'" @close="goScoreboard">
        <template #header>
            <p>Congratulations</p>
        </template>
        <template #body>
            <div class="flex flex-col justify-center items-center">
                <menu-box>Final Score: {{ gameStore.getScore }}</menu-box>
                <menu-box>Time elapsed: {{ time }}</menu-box>
            </div> 
        </template>
        <template #footer>
              <router-link class="lilita-one-regular bg-themeText text-themeBackground p-2 rounded-md" :to="{ name: 'scoreboard'}">Go to Scoreboard</router-link>
        </template>
    </the-modal>
    </transition>
</div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useGameStore } from "@/stores/game";
import { onBeforeRouteLeave } from "vue-router";
import TheModal from "@/components/ui/TheModal.vue";
import MenuBox from "@/components/ui/MenuBox.vue";
import SetUp from "@/components/game/SetUp.vue";
import Game from "@/components/game/TheGame.vue";

const gameStore = useGameStore();

const gameStatus = computed(() => gameStore.getGameStatus);
const showModal = computed(() => gameStore.settingsStatus);
const time = computed(() => {
    const minutes = Math.floor(gameStore.getTime / 60);
    const seconds = gameStore.getTime % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
});

function closeModal() {
    gameStore.toggleSettings();
}

function startGame(pairsNumber, selectedCard) {
    gameStore.startGame(pairsNumber, selectedCard);
}

function restartGame() {
    closeModal();
    gameStore.restartGame();
}

function shuffleCards() {
    closeModal();
    setTimeout(() => {
        gameStore.shuffleDeck();
    }, 1000);
}

function goScoreboard() {
    console.log("goScoreboard");
}

onBeforeRouteLeave(() => {
    if(showModal.value) {
        closeModal();
    }
    gameStore.restartGame();
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

.container {
  position: relative;
}
.text {
  position: absolute;
}
.slide-enter-active {
  animation: slide 1s;
}
.slide-leave-active {
  transition: all 1s;
  opacity: 0;
}

@-webkit-keyframes slide {
  0% {
    -webkit-transform: translateX(200px);
    transform: translateX(200px);
  }
  100% {
    -webkit-transform: translateX(0px);
    transform: translateX(0px);
  }
}
@keyframes slide {
  0% {
    -webkit-transform: translateX(200px);
    transform: translateX(200px);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
</style>