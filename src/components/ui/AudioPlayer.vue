<template>
<div>
    <v-icon 
        :name="soundOn ? 'gi-sound-on' : 'gi-sound-off'" 
        class="text-lg cursor-pointer" 
        animation="wrench" 
        hover scale="1.5"
        @click="toggle"
    />
    <audio ref="audioRef" loop>
    <source src="../../assets/audio/lofi.mp3" type="audio/mpeg">
    </audio>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const audioRef = ref(null);

const props = defineProps(['soundOn'])
const emits = defineEmits(['switchSound'])


const play = () => {
    audioRef.value.volume = 0.3;
    audioRef.value.play().catch((error) => {
        audioRef.value.muted = false;
        audioRef.value.play();
    });
};

const pause = () => {
    audioRef.value.pause();
};

const toggle = () => {
    if (!props.soundOn) { play() } 
    else { pause() }
    emits('switchSound')
};

</script>