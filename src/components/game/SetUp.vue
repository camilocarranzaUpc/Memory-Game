<template>
    <div class="flex-grow flex flex-col text-themeText justify-center items-center gap-2">
        <div>
            <p class="p-0 text-lg sm:text-xl md:text-xl lg:text-xl xl:text-2xl 2xl:text-4xl">
                <span class="lilita-one-regular font-bold text-4xl sm:text-4xl md:text-4xl lg:text-6xl xl:text-6xl 2xl:text-8xl">1.</span>
                Select the number of pairs</p>
            <div class="flex gap-2 justify-center mt-4">
                <v-icon 
                    name="bi-dash-circle-fill" 
                    class="text-lg cursor-pointer" 
                    animation="wrench" 
                    hover scale="2" 
                    v-show="pairsNumber > 2"
                    @click="pairsNumber--"
                />
                <div class="w-16 h-16 rounded-full bg-themeText text-themeBackground flex items-center justify-center"><p>{{ pairsNumber }}</p></div>
                <v-icon 
                    name="bi-plus-circle-fill" 
                    class="text-lg cursor-pointer" 
                    animation="wrench" 
                    hover scale="2" 
                    v-show="pairsNumber < 16"
                    @click="pairsNumber++"
                />
            </div>
            <p class="p-0 text-lg sm:text-xl md:text-xl lg:text-xl xl:text-2xl 2xl:text-4xl">
                <span class="lilita-one-regular font-bold text-4xl sm:text-4xl md:text-4xl lg:text-6xl xl:text-6xl 2xl:text-8xl">2.</span>
                Select cards theme</p>
            <div class="flex flex-wrap gap-2 mt-4 justify-center">
                <div v-for="index in 9" :key="index" class="w-10 sm:w-15 md:w-20 lg:w-30 xl:w-40 cursor-pointer p-2"
                    :class="{ 'border-2 border-[#bdbcbc] rounded-lg': selectedCard === index }"
                    @click="selectCard(index)"
                >
                    <img :src="`/themes/img${index}.jpg`" :alt="`img${index}.jpg`" class="rounded-lg">
                </div>
            </div>
        </div>
        <div>
            <button @click="goGame" class="lilita-one-regular bg-themeText text-themeBackground p-2 rounded-md transform transition-transform duration-200 ease-in-out hover:scale-125">Start Game</button>
        </div>
        
    </div>
</template>

<script setup>
import { ref, defineEmits, watch } from "vue";
const emits = defineEmits(["start"]);

const pairsNumber = ref(6);
const selectedCard = ref(1);

function goGame() {
    emits("start", pairsNumber.value, selectedCard.value);
}

function selectCard(index) {
    selectedCard.value = index;
}

</script>
