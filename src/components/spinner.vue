<template lang="pug">
.sk-spinner(:class="classes" :style="cssVars")
  .sk-spinner-circle
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    size: {
      type: String,
      default: '30px'
    },

    width: {
      type: String,
      default: '3px'
    },

    variant: {
      type: String,
      default: 'primary'
    }
  });

  const classes = computed(() => {
    return [
      `sk-spinner-${props.size}`,
      `sk-spinner-${props.variant}`,
    ]
  });

  const cssVars = computed(() => {
    return {
      '--spin-bg': 'var(--mute-xl)',
      '--spin-color': `var(--${props.variant}-500)`,
      '--spin-width': props.width,
      '--spin-size': props.size,
    }
  });
</script>

<style lang="scss">
  .sk-spinner-circle {
    width: var(--spin-size);
    height: var(--spin-size);
    border: var(--spin-width) solid var(--spin-bg);
    border-top-color: var(--spin-color);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
