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
            v-show="title === 'score' || title === 'not-found'"
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
    <div class="flex gap-5">
        <audio-player :soundOn="isSoundOn" @switchSound="switchSound" />
        <v-icon 
            :name="isDarkMode ? 'fa-moon' : 'fa-sun'" 
            class="text-lg cursor-pointer" 
            animation="wrench" 
            hover scale="1.5" 
            :fill="isDarkMode ? '#3B82F6' : '#FFB84C'"
            v-show="title === 'home'"
            @click="switchTheme"
        />    
    </div>
  </header>
</template>

<script setup>
//import pinia store
import { useGlobalStore } from "@/stores/global";
import { watch, ref, defineEmits, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import AudioPlayer from "@/components/ui/AudioPlayer.vue";


const store = useGlobalStore();
const route = useRoute();
const router = useRouter();

const emits = defineEmits(["toogleSettings"]);

const title = ref('home');

const isDarkMode = computed(() => store.isDarkMode);
const isSoundOn = computed(() => store.isSoundOn);

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
    emits("toogleSettings");
}

//watch route change
watch(() => route.name, (name) => {
    title.value = name;
});
</script>

