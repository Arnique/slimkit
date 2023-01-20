<template lang="pug">
.sk-dropdown(:class="classes")
  sk-btn.sk-dropdown-toggle(
    ref="toggler"
    :variant="variant"
    :block="block"
    :fill="fill"
    @click="toggle"
  )
    ._text
      slot(name="button") {{ text }}
    ChevDown.sk-dropdown-arrow
  .sk-dropdown-menu(v-if="isOpen")
    slot
</template>

<script setup>
  import ChevDown from '../assets/svg/cheveron-down.svg';
  import { computed, ref } from 'vue';
  import { isOutsideClick } from './utils';

  const isOpen = ref(false);
  const toggler = ref(null);

  const props = defineProps({
    variant: {
      type: String,
      default: 'primary'
    },

    align: {
      type: String,
      default: 'left'
    },

    block: {
      type: Boolean,
      default: false
    },

    text: {
      type: String,
      default: ''
    },

    fill: {
      type: String,
      default: 'bg'
    }
  })

  const classes = computed(() => {
    return [
      { 'is-open': isOpen.value },
      `sk-dropdown-${props.align}`,
      `sk-dropdown-${props.variant}`,
    ]
  })

  function toggle() {
    const closer = (e) => {
      if (isOpen.value && isOutsideClick(e, toggler.value )) {
        window.removeEventListener('click', closer);
        isOpen.value = false;
      }
    }

    window.addEventListener('click', closer);

    isOpen.value = !isOpen.value;
  }

  function close() {
    isOpen.value = false;
  }
</script>

<style lang="scss">
  .sk-dropdown {
    position: relative;

    ._text {
      padding-right: 0.7em;
    }

    &.is-open {
      z-index: 10;

      .sk-btn {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom: none;
        border-color: var(--btn-focus-bc);
        background: var(--btn-focus-bg);
        color: var(--btn-focus-fg);
      }

      .sk-dropdown-arrow {
        transform: rotateZ(180deg);
      }
    }
  }

  .sk-dropdown-arrow {
    display: inline-block;
    margin-left: auto;
  }

  .sk-dropdown-menu {
    position: absolute;
    top: 100%;
    background: var(--btn-focus-bg);
    border-radius: 0 0 var(--btn-rad) var(--btn-rad);
    min-width: 100%;
    font-size: 0.9em;
    border: 1px solid var(--btn-focus-bc);
    border-top: none;

    .sk-dropdown-left & {
      left: 0;
    }
    .sk-dropdown-right & {
      right: 0;
    }

    hr {
      margin: 10px 0;
    }
  }

  .sk-dropdown-item, a.sk-dropdown-item {
    display: flex;
    align-items: center;
    padding: 0.5em var(--btn-pdx);
    line-height: 1;
    color: var(--btn-focus-fg);
    cursor: pointer;
    @extend %unlink;

    &.active, &.nuxt-link-exact-focus, &:hover {
      background: rgba(#000, 0.05);
    }
  }
</style>
