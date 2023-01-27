<template lang="pug">
.sk-grid(:style="cssVars")
  slot
</template>

<script setup>
	import { defineProps, computed } from 'vue'
  import { cascadeObj, isEmpty } from './utils.js'

	const props = defineProps({
    cols: {
      type: String,
      default: '1fr'
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
    gap: {
      type: String,
      default: '20px'
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
  })
  
  const cssVars = computed(() => {
    return {
      ...cascadeObj({
        '--gap': props.gap,
        '--gap-sm': props.gapSm,
        '--gap-md': props.gapMd,
        '--gap-lg': props.gapLg,
        '--gap-xl': props.gapXl,
      }, '0'),

      ...cascadeObj({
        '--tpl': toTpl(props.cols),
        '--tpl-sm': toTpl(props.colsSm),
        '--tpl-md': toTpl(props.colsMd),
        '--tpl-lg': toTpl(props.colsLg),
        '--tpl-xl': toTpl(props.colsXl),
      }, '1fr')
  	}
  })

  function toTpl(v) {
    if (isEmpty(v)) return null;
    
    if (isNaN(v)) return v;

    return `repeat(${v}, 1fr)`;
  }
</script>

<style lang="scss">
  .sk-grid {
    display: grid;
    gap: var(--gap);
    grid-template-columns: var(--tpl);
  }
  
  @include bp-up(sm) {
    .sk-grid {
    	gap: var(--gap-sm);
      grid-template-columns: var(--tpl-sm);
    }
  }

  @include bp-up(md) {
    .sk-grid {
    	gap: var(--gap-md);
      grid-template-columns: var(--tpl-md);
    }
  }

  @include bp-up(lg) {
    .sk-grid {
    	gap: var(--gap-lg);
      grid-template-columns: var(--tpl-lg);
    }
  }

  @include bp-up(xl) {
    .sk-grid {
    	gap: var(--gap-xl);
      grid-template-columns: var(--tpl-xl);
    }
  }
</style>
