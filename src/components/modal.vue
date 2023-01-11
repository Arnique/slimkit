<template lang="pug">
.sk-modal-bdrop(v-if="visible" :class="[status]")
  .sk-modal.flex-center(@click.self="close")
    .sk-modal-dialog(:class="classes")
      .sk-modal-body.pos-rel
        .sk-modal-close.pos-abs(@click="close" v-if="closer")
          CloseSvg
        slot
</template>

<script setup>
  import { ref, computed, watch } from 'vue';
  import CloseSvg from '../assets/svg/close.svg';

  const dur = 300;
  const status = ref('closed');
  const emit = defineEmits(['update:modelValue', 'onshow', 'onclose']);

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },

    closer: {
      type: Boolean,
      default: true
    },

    size: {
      type: String,
      default: 'md'
    }
  });

  const visible = computed(()=> status.value !== 'closed');

  const classes = computed(()=> {
    return [
      `sk-modal-${props.size}`
    ]
  });

  watch(() => props.modelValue, (vNew, vOld) => {
    handleBody();

    if (vOld === undefined) {
      status.value = vNew ? 'shown' : 'closed';
      return;
    }

    vNew ? show() : close();
  }, { immediate: true })

  function show() {
    status.value = 'showing';

    setTimeout(()=> {
      status.value = 'shown';
      emit('onshow');
    }, dur)
  }

  function close() {
    status.value = 'closing';

    setTimeout(()=> {
      status.value = 'closed';
      emit('update:modelValue', false);
      emit('onclose');
    }, dur)
  }

  function handleBody() {
    if (typeof document === 'undefined') return;

    if (props.modelValue) {
      document.body.classList.add('sk-modal-open');
    } else {
      document.body.classList.remove('sk-modal-open');
    }
  }
</script>

<style lang="scss">
  .sk-modal-bdrop {
    z-index: 10000;
    position: fixed;
    padding: 20px;
    @extend %box-filler;

    &:before {
      content: '';
      display: block;
      backdrop-filter: blur(2px);
      background-color: rgba(#000, 0.8);
      position: absolute;
      z-index: 0;
      @extend %box-filler;
    }

    &.showing {
      &:before {
        animation: animFadeIn .3s ease-out forwards;
      }

      .sk-modal-dialog {
        animation: modalIn .3s ease-out forwards;
      }
    }

    &.closing {
      &:before {
        animation: animFadeOut .3s ease-out forwards;
      }

      .sk-modal-dialog {
        animation: modalOut .3s ease-out forwards;
      }
    }
  }

  .sk-modal {
    @each $key, $val in $modal-css-vars {
      --#{'modal-' + $key}: #{$val};
    }

    @each $key, $val in $modal-color-vars {
      --#{'modal-' + $key}: #{$val};
    }

    position: relative;
    z-index: 1;
    @extend %box-filler;
  }

  .sk-modal-dialog {
    --modal-w: 400px;
    overflow: visible;
    width: 100%;
    background: var(--modal-bg);
    max-width: var(--modal-w);
    border-radius: var(--modal-rad);
  }

  [data-skin="dark"] {
    &.sk-modal-dialog, .sk-modal-dialog {
      @each $key, $val in $dmd-modal-color-vars {
        --#{'modal-' + $key}: #{$val};
      }
    }
  }

  .sk-modal-body {
    padding: var(--modal-body-pdy) var(--modal-body-pdx);
  }

  .sk-modal-close {
    top: var(--modal-body-pdy);
    right: var(--modal-body-pdx);
    transform: translate(10px, -10px);
    cursor: pointer;
    opacity: 0.5;
    padding: 10px;

    &:hover, &:active {
      opacity: 1;
    }

    svg {
      width: 15px;
      height: auto;
      display: block;

      path {
        fill: var(--title)
      }
    }
  }

  body.sk-modal-open {
    padding: 0 !important;
  }

  @each $key, $val in $modal-sizes {
    .sk-modal-#{$key} {
      --modal-w: #{$val};
    }
  }
</style>