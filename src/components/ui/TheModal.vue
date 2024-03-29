<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
    <div class="modal bg-themeBackground text-themeText shadow-lg overflow-y-auto flex flex-col rounded-md max-w-md sm:max-w-md mx-auto">
      <header class="p-4 lilita-one-regular flex relative border-b border-gray-200 justify-between text-xl">
        <slot name="header">
          This is the default title!
        </slot>
        <v-icon 
            name="fa-window-close" 
            class="text-lg cursor-pointer" 
            animation="wrench" 
            hover scale="2" 
            @click="close"
        />
      </header>
      <section class="relative py-5 px-2.5">
        <slot name="body">
          This is the default body!
        </slot>
       </section>

      <footer class="p-4 flex border-t border-gray-200 flex-col justify-end">
        <slot name="footer">
          This is the default footer!
        </slot>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emits = defineEmits(['close'])

const close = () => {
  emits('close')
}

</script>
