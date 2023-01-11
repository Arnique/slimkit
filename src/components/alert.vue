<template lang="pug">
Transition(name="fade")
  .sk-alert(:class="classes" :data-fill="fill" v-show="show" )
    .sk-alert-close.flex-center-y.pos-abs(v-if="closable" @click="show = false")
      CloseSvg
    slot
      .fw-bold.mgb-xs(v-if="title") {{ title }}
      | {{ text }}
</template>

<script setup>
  import { ref, computed } from 'vue';
  import CloseSvg from '@/assets/svg/close.svg';

  const props = defineProps({
    variant: {
      type: String,
      default: 'primary'
    },

    fill: {
      type: String,
      default: 'bg'
    },

    title: {
      type: String,
      default: ''
    },

    text: {
      type: String,
      default: ''
    },

    closable: {
      type: Boolean,
      default: false
    },
  })

  const show = ref(true);

  const classes = computed(()=> {
    return [
      `sk-alert-${props.variant}`,
      ...props.closable ? ['closable'] : []
    ]
  })
</script>

<style lang="scss">
  .sk-alert {
    @each $key, $val in $alert-css-vars {
      --#{'alert-' + $key}: #{$val};
    }

    position: relative;
    padding: var(--alert-pdy) var(--alert-pdx);
    border: 1px solid transparent;
    border-radius: var(--alert-rad);
    line-height: 1.5;

    color: var(--alert-fg);
    background: var(--alert-bg);
    border-color: var(--alert-bc);

    &[data-fill="ol"] {
      background: none;
      border-color: var(--alert-fg);
      border-width: 2px;

      .sk-alert-close svg path {
        fill: var(--alert-fg);
      }
    }
  }

  .sk-alert-close {
    top: var(--alert-pdy);
    right: var(--alert-pdx);
    width: 1em;
    height: 1em * 1.5;
    cursor: pointer;

    svg {
      display: block;
      width: 0.7em;
      height: auto;

      path {
        fill: var(--alert-fg)
      }
    }
  }

  @each $name, $map in $alert-variants {
    .sk-alert-#{$name} {
      @each $var, $val in $map {
        --alert-#{$var}: #{$val};
      }
    }
  }
</style>
