<template>
    <header class="bg-themeBackground text-themeText flex justify-between items-center px-8 py-4" >
    <div>
        <v-icon 
            name="bi-gear-fill" 
            class="text-lg cursor-pointer" 
            animation="wrench" 
            hover scale="2" 
            v-show="title === 'game'"
            @click="toogleSettings"
        />
        <v-icon 
            name="fa-arrow-alt-circle-left" 
            class="text-lg cursor-pointer" 
            animation="wrench" 
            hover scale="2" 
            v-show="title === 'scoreboard' || title === 'not-found'"
            @click="goHome"
        />
        <v-icon 
            name="fa-github" 
            class="text-lg cursor-pointer" 
            animation="wrench" 
            hover scale="2" 
            v-show="title === 'home'"
            @click="goGithub"
        />
    </div>
    <div v-show="title === 'game' && gameStore.getGameStatus === 'playing'">
        <div class="flex items-center gap-2">
            <v-icon 
            name="md-sportsscore" 
            class="text-lg" 
            animation="wrench" 
            hover scale="2" 
        />
        <span>{{ gameStore.getScore }}</span>
        </div>
    </div>
    <div v-show="title === 'game' && gameStore.getGameStatus === 'playing'">
        <div class="flex items-center gap-2">
            <v-icon 
            name="md-adsclick-outlined" 
            class="text-lg" 
            animation="wrench" 
            hover scale="2" 
        />
        <span>{{ gameStore.getMovesNumber }}</span>
        </div>
    </div>
    <div v-show="title === 'game' && gameStore.getGameStatus === 'playing'">
        <div class="flex items-center gap-2">
            <v-icon 
            name="io-time-sharp" 
            class="text-lg" 
            animation="wrench" 
            hover scale="2" 
        />
        <span>{{ time }}</span>
        </div>
    </div>
    <div class="flex gap-5">
        <audio-player :soundOn="isSoundOn" @switchSound="switchSound" />
        <v-icon 
            :name="isDarkMode ? 'fa-moon' : 'fa-sun'" 
            class="text-lg cursor-pointer" 
            animation="wrench" 
            hover scale="1.5" 
            :fill="isDarkMode ? '#3B82F6' : '#FFB84C'"
            @click="switchTheme"
        />    
    </div>
  </header>
</template>

<script setup>
//import pinia store
import { useGlobalStore } from "@/stores/global";
import { useGameStore } from "@/stores/game";
import { watch, ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import AudioPlayer from "@/components/ui/AudioPlayer.vue";


const store = useGlobalStore();
const gameStore = useGameStore();
const route = useRoute();
const router = useRouter();

// const emits = defineEmits(["toogleSettings"]);

const title = ref('home');

const isDarkMode = computed(() => store.isDarkMode);
const isSoundOn = computed(() => store.isSoundOn);
const time = computed(() => {
    const minutes = Math.floor(gameStore.getTime / 60);
    const seconds = gameStore.getTime % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
});

function switchTheme() {
    store.toggleDarkMode();
}

function switchSound() {
    store.toggleSound();
}

function goHome() {
    router.push({ name: "home" });
}

function goGithub() {
    window.open("https://github.com/camilocarranzaUpc/Memory-Game");
}

function toogleSettings() {
    gameStore.toggleSettings();
}

//watch route change
watch(() => route.name, (name) => {
    title.value = name;
});
</script>

