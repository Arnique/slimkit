<template lang="pug">
.sk-grid(:style="_cssVars")
  slot
</template>

<script setup>
  import { computed } from 'vue';
  import { pick, cascadeObj } from './utils';

  const props = defineProps({
    // cols
    cols: {
      type: String,
      default: '12'
    },
    colsSm: {
      type: String,
      default: null
    },
    colsMd: {
      type: String,
      default: null
    },
    colsLg: {
      type: String,
      default: null
    },
    colsXl: {
      type: String,
      default: null
    },
    // col tpl
    tpl: {
      type: String,
      default: null
    },
    tplSm: {
      type: String,
      default: null
    },
    tplMd: {
      type: String,
      default: null
    },
    tplLg: {
      type: String,
      default: null
    },
    tplXl: {
      type: String,
      default: null
    },
    // gap
    gap: {
      type: String,
      default: '0 20px'
    },
    gapSm: {
      type: String,
      default: null
    },
    gapMd: {
      type: String,
      default: null
    },
    gapLg: {
      type: String,
      default: null
    },
    gapXl: {
      type: String,
      default: null
    },
  });

  const _cssVars = computed(()=> {
    const vars = cascadeObj({
      '--t': props.tpl || tplCols() || null,
      '--t-sm': props.tplSm || tplCols('sm'),
      '--t-md': props.tplMd || tplCols('md'),
      '--t-lg': props.tplLg || tplCols('lg'),
      '--t-xl': props.tplXl || tplCols('xl'),
      '--g': props.gap,
      '--g-sm': props.gapSm,
      '--g-md': props.gapMd,
      '--g-lg': props.gapLg,
      '--g-xl': props.gapXl,
    });

    return vars;
  });

  const cssVars = computed(()=> {
    const keys = [
      '--t',
      ...props.tplSm ? ['--t-sm'] : [],
      ...props.tplMd ? ['--t-md'] : [],
      ...props.tplLg ? ['--t-lg'] : [],
      ...props.tplXl ? ['--t-xl'] : [],
      '--g',
      ...props.gapSm ? ['--g-sm'] : [],
      ...props.gapMd ? ['--g-md'] : [],
      ...props.gapLg ? ['--g-lg'] : [],
      ...props.gapXl ? ['--g-xl'] : [],
    ]

    return pick(_cssVars.value, keys);
  });

  const cols = computed(() => {
    return {
      def: props.cols,
      sm: props.colsSm,
      md: props.colsMd,
      lg: props.colsLg,
      xl: props.colsXl,
    }
  });

  function tplCols(bp = 'def') {
    if (!cols.value[bp]) return null;
    return `repeat(${cols.value[bp]}, 1fr)`;
  }

  function cascadeVals(arr = []) {
    arr.forEach((v, i) => {
      if (i < arr.length && !v) {
        arr[i+1] = v;
      }
    })
  }
</script>

<style lang="scss">
  .sk-grid {
    display: grid;
    gap: var(--g);
    grid-template-columns: var(--t);

    @include bp-up(sm) {
      gap: var(--g-sm);
      grid-template-columns: var(--t-sm);
    }

    @include bp-up(md) {
      gap: var(--g-md);
      grid-template-columns: var(--t-md);
    }

    @include bp-up(lg) {
      gap: var(--g-lg);
      grid-template-columns: var(--t-lg);
    }

    @include bp-up(xl) {
      gap: var(--g-xl);
      grid-template-columns: var(--t-xl);
    }
  }
</style>
