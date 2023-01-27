<template lang="pug">
.sk-col(:style="cssVars")
  slot
</template>

<script setup>
  import { computed } from 'vue';
  import { cascadeObj } from './utils';

  const props = defineProps({
    xs: String,
    sm: String,
    md: String,
    lg: String,
    xl: String
  });

  const cssVars = computed(()=> {
    return cascadeObj({
      '--cols-xs': props.xs,
      '--cols-sm': props.sm,
      '--cols-md': props.md,
      '--cols-lg': props.lg,
      '--cols-xl': props.xl
    }, '1')
  });
</script>

<style lang="scss">
  .sk-col {
    grid-column: span var(--cols-xs);

    @include bp-up(sm) {
      grid-column: span var(--cols-sm);
    }

    @include bp-up(md) {
      grid-column: span var(--cols-md);
    }

    @include bp-up(lg) {
      grid-column: span var(--cols-lg);
    }

    @include bp-up(xl) {
      grid-column: span var(--cols-xl);
    }
  }
</style>