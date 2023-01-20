<template lang="pug">
component(
  role="button"
  :is="tag"
  :to="to"
  :disabled="disabled"
  :class="classes"
  :style="cssVars"
  :data-fill="fill"
  v-bind="$attrs"
  @click="ripple ? doRipple($event) : null"
)
  .sk-btn-anim(ref="animEl")
  sk-spinner(v-if="busy" width="2px" size="1.25em" style="--spin-color: var(--btn-fg); --spin-bg: var(--btn-opc-10)")
  slot(v-else)
</template>

<script setup>
  import { computed, getCurrentInstance, resolveComponent, useAttrs, ref } from 'vue';
  import { resolveLink } from './utils';

  const instance = getCurrentInstance();
  const attrs = useAttrs();
  const animElPos = ref({ x:0, y: 0 });
  const isAnimating = ref(false);
  const animEl = ref(null)

  function doRipple(e) {
    if (isAnimating.value) return;

    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    animElPos.value = { x, y };
    isAnimating.value = true;

    function onAnimEnd() {
      isAnimating.value = false;
      animEl.value.removeEventListener('animationend', onAnimEnd);
    }

    animEl.value.addEventListener('animationend', onAnimEnd);
  }

  const props = defineProps({
    variant: {
      type: String,
      default: 'primary'
    },

    size: {
      type: String,
      default: 'md'
    },

    to: {
      type: String,
      default: null
    },

    fill: {
      type: String,
      default: 'bg'
    },

    busy: {
      type: Boolean,
      default: false
    },

    block: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: null
    },

    sq: {
      type: Boolean,
      default: false
    },

    ripple: {
      type: Boolean,
      default: true
    }
  });

  const tag = computed(() => {
    return props.to || attrs.href
      ? resolveLink(instance, resolveComponent)
      : 'button';
  });

  const cssVars = computed(() => {
    return {
      '--rx': `${animElPos.value.x}px`,
      '--ry': `${animElPos.value.y}px`,
    }
  })

  const classes = computed(() => {
    return [
      'sk-btn',
      `sk-btn-${props.variant}`,
      `sk-btn-size-${props.size}`,
      { 'anim-on': isAnimating.value },
      ...props.busy ? ['sk-btn-busy'] : [],
      ...props.block ? ['sk-btn-block'] : [],
      ...props.sq ? ['sk-btn-sq'] : [],
    ]
  });
</script>

<style lang="scss">
  .sk-btn, .sk-dropdown {
    @each $key, $val in $btn-css-vars {
      --#{'btn-' + $key}: #{$val};
    }
  }

  .sk-btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-family: $font-body;
    position: relative;
    overflow: hidden;
    @extend %unlink;

    font-size: var(--btn-unit);
    height: var(--btn-h);
    padding: 0 var(--btn-pdx);
    border-radius: var(--btn-rad);

    border: 1px solid transparent;
    background: var(--btn-bg);
    color: var(--btn-fg);
    border-color: var(--btn-bc);

    svg {
      display: block;
      height: 1.1em;
      width: auto;

      path {
        fill: var(--btn-fg)
      }
    }

    &:focus, 
    &:active {
      outline: none;
    }

    &[disabled] {
      pointer-events: none;
    }

    &:hover, &.hover {
      color: var(--btn-hover-fg);
      background: var(--btn-hover-bg);
      border-color: var(--btn-hover-bc);

      svg path {
        fill: var(--btn-hover-fg);
      }
    }

    &:focus, &.focus {
      color: var(--btn-focus-fg);
      background: var(--btn-focus-bg);
      border-color: var(--btn-focus-bc);

      svg path {
        fill: var(--btn-focus-fg);
      }
    }

    &:active, &.active {
      color: var(--btn-active-fg);
      background: var(--btn-active-bg);
      border-color: var(--btn-active-bc);

      svg path {
        fill: var(--btn-active-fg);
      }
    }

    &[disabled], &.disabled {
      color: var(--btn-disabled-fg);
      background: var(--btn-disabled-bg);
      border-color: var(--btn-disabled-bc);

      svg path {
        fill: var(--btn-disabled-fg);
      }
    }

    .sk-btn-anim {
      position: absolute;
      top: var(--ry);
      left: var(--rx);
      width: 1px;
      height: 1px;
      border-radius: 50%;
      background: rgba(#fff, 0.2);
    }

    &.anim-on {
      .sk-btn-anim {
        animation: sk-btn-ripple .6s ease;
      }
    }
  }

  @keyframes sk-btn-ripple {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    100% {
      transform: scale(300);
      opacity: 0;
    }
  }

  .sk-btn-sq {
    width: var(--btn-h);
    padding: 0;
  }

  .sk-btn-block {
    width: 100%;
    display: flex;
  }

  .sk-btn-left {
    margin-right: 0.7em
  }

  .sk-btn-right {
    margin-left: 0.7em
  }

  // Variants
  @each $name, $states in $btn-variants {
    .sk-btn-#{$name}, .sk-dropdown-#{$name} {
      @each $state, $map in $states {
        @each $key, $val in $map {
          $var: #{'btn-' + $state + '-' + $key};

          @if ($state == 'idle') {
            $var: 'btn-' + $key;
          }

          --#{$var}: #{$val};
        }
      }
    }
  }

  @each $name, $states in $dmd-btn-variants {
    [data-skin="dark"].sk-btn-#{$name},
    [data-skin="dark"].sk-dropdown-#{$name},
    [data-skin="dark"] .sk-btn-#{$name},
    [data-skin="dark"] .sk-dropdown-#{$name} {
      @each $state, $map in $states {
        @each $key, $val in $map {
          $var: #{'btn-' + $state + '-' + $key};

          @if ($state == 'idle') {
            $var: 'btn-' + $key;
          }

          --#{$var}: #{$val};
        }
      }
    }
  }

  // Fills
  .sk-btn {
    &[data-fill="fg"],
    &[data-fill="ol"],
    &[data-fill="tint"] {
      --btn-fg: var(--btn-hex);
      --btn-bg: none;
      --btn-bc: transparent;
    }

    &[data-fill="fg"] {
      --btn-hover-fg: var(--btn-hex);
      --btn-focus-fg: var(--btn-hex);
      --btn-active-fg: var(--btn-hex);
      --btn-hover-bg: var(--btn-opc-10);
      --btn-focus-bg: var(--btn-opc-20);
      --btn-active-bg: var(--btn-opc-30);
    }

    &[data-fill="ol"] {
      --btn-bc: var(--btn-hex);
      --btn-hover-bg: var(--btn-hex);
      --btn-focus-bg: var(--btn-hex);
    }

    &[data-fill="tint"] {
      --btn-bg: var(--btn-opc-10);
    }
  }

  // Sizes
  @each $name, $size in $btn-sizes {
    .sk-btn-size-#{$name} {
      @each $key, $val in $size {
        --btn-#{$key}: #{$val};
      }
    }
  }
</style>
