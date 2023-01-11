<template lang="pug">
.sk-field.pos-rel(:class="classes")
  .sk-label-cont.d-flex(v-if="label")
    .sk-label {{ label }}

  .sk-input-cont.pos-rel
    SearchSvg.sk-field-icon(v-if="type == 'search'")
    //- Textbox
    component.sk-input(
      v-if="mode != 'select'"
      v-bind="$attrs"
      :is="tag"
      :value="modelValue"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @input="onChange($event.target.value)"
    )
    //- Dropdown
    sk-dropdown(
      v-if="mode == 'select'"
      :align="align"
      :text="formatValue(modelValue)"
      :block="block"
      :variant="selectVariant"
      :disabled="disabled"
    )
      sk-dropdown-item(
        v-for="v in opts"
        :key="v.value"
        :data-value="v.value"
        :class="{ active: v.value == modelValue }"
        @click="onChange(v.value)"
      ) {{ v.name }}

    .sk-field-errors.pdt-xs.fs-sm.fg-danger(v-if="error") {{ formatError(error) }}
</template>

<script setup>
  import SearchSvg from '../assets/svg/search.svg';
  import { computed, ref } from 'vue';
  import { isObject, formatError } from './utils.js';

  const isFocused = ref(false)

  const props = defineProps({
    modelValue: String | Number | Object,
    block: Boolean,
    disabled: Boolean,
    size: {
      type: String,
      default: 'md'
    },
    mode: {
      type: String,
      default: 'input'
    },
    variant: {
      type: String,
      default: 'input'
    },
    selectVariant: {
      type: String,
      default: 'input'
    },
    options: {
      type: Array,
      default: []
    },
    error: String,
    label: String,
    name: String,
    type: String,
    align: String,
    format: {
      type: String,
      default: '{{name}}'
    }
  })

  const emit = defineEmits(['update:modelValue'])

  function onChange(v) {
    emit('update:modelValue', v)
  }

  function formatValue(value) {
    if (!props.format) return value;

    const item = opts.value.find(item => item.value === value);
    if (!item) return value;

    return props.format.replace('{{name}}', item.name)
                        .replace('{{value}}', item.value);
  }

  const tag = computed(()=> {
    return props.mode === 'ta'
            ? 'textarea' 
            : props.mode === 'select' ? 'select'
            : 'input'
  })

  const opts = computed(()=> {
    if (!props.options || !props.options.length) return [];

    if (isObject(props.options[0])) return props.options;

    return props.options.map(value => ({ value, name: value }));
  })

  const classes = computed(() => {
    return [
      `sk-field-mode-${props.mode}`,
      `sk-field-size-${props.size}`,
      `sk-field-${props.variant}`,
      ...isFocused.value ? ['is-focused'] : [],
      ...props.error ? ['is-invalid'] : [],
      ...props.disabled ? ['is-disabled'] : [],
      ...props.type ? [`sk-field-type-${props.type}`] : [],
      ...props.block ? ['sk-field-block'] : [],
    ]
  })
</script>

<style lang="scss">
  .sk-input, .sk-select-text {
    font-size: var(--inp-unit);
    height: var(--inp-h);
    padding: 0 var(--inp-pdx);
    border-radius: var(--inp-rad);

    border: 1px solid transparent;
    background: var(--inp-bg);
    color: var(--inp-fg);
    border-color: var(--inp-bc);

    @at-root {
      textarea#{&} {
        height: auto;
        padding: var(--inp-pdx);
      }
    }

    &:focus-visible {
      outline: none
    }

    &::placeholder { 
      color: var(--inp-hint);
    }
  }

  @each $variant, $states in $inp-variants {
    .sk-field-#{$variant} {
      $idle: map-get($states, 'idle');
      $focus: map-get($states, 'focus');
      $error: map-get($states, 'error');
      $disab: map-get($states, 'disabled');

      @if ($idle) {
        @each $key, $val in $idle {
          --inp-#{$key}: #{$val};
        }
      }

      @if ($focus) {
        &.is-focused {
          @each $key, $val in $focus {
            --inp-#{$key}: #{$val};
          }
        }
      }

      @if ($disab) {
        &.is-disabled {
          pointer-events: none;
          @each $key, $val in $disab {
            --inp-#{$key}: #{$val};
          }
        }
      }

      @if ($error) {
        &.is-invalid {
          @each $key, $val in $error {
            --inp-#{$key}: #{$val};
          }
        }
      }
    }
  }

  @each $variant, $states in $dmd-inp-variants {
    [data-skin="dark"].sk-field-#{$variant},
    [data-skin="dark"] .sk-field-#{$variant} {
      $idle: map-get($states, 'idle');
      $focus: map-get($states, 'focus');
      $error: map-get($states, 'error');
      $disab: map-get($states, 'disabled');

      @if ($idle) {
        @each $key, $val in $idle {
          --inp-#{$key}: #{$val};
        }
      }

      @if ($focus) {
        &.is-focused {
          @each $key, $val in $focus {
            --inp-#{$key}: #{$val};
          }
        }
      }

      @if ($disab) {
        &.is-disabled {
          pointer-events: none;
          @each $key, $val in $disab {
            --inp-#{$key}: #{$val};
          }
        }
      }

      @if ($error) {
        &.is-invalid {
          @each $key, $val in $error {
            --inp-#{$key}: #{$val};
          }
        }
      }
    }
  }

  .sk-field {
    @each $key, $val in $inp-css-vars {
      --#{'inp-' + $key}: #{$val};
    }
  }

  @each $size, $map in $inp-sizes {
    .sk-field-size-#{$size} {
      @each $key, $val in $map {
        --inp-#{$key}: #{$val};
      }
    }
  }

  .sk-field {
    margin-bottom: var(--inp-mgb);
  }

  .sk-field-block, 
  .sk-field-block .sk-input {
    width: 100%;
  }

  .sk-field select {
    appearance: none;
    text-indent: -1000px;
    position: absolute;
    top: 0;
    left: 0;
  }

  .sk-select-text {
    pointer-events: none;
    border: none !important;
    background: none !important;
    padding-top: 0;
    padding-bottom: 0;
  }

  .sk-dd-arrow {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .sk-field-icon {
    position: absolute;
    left: calc(var(--inp-unit) * var(--inp-pdx) * var(--inp-scale));
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    height: 16px;
    width: auto;

    path {
      fill: var(--inp-fg);
    }
  }

  .sk-field-type-search .sk-input {
    padding-left: calc(var(--inp-unit) * var(--inp-pdx) * 2 * var(--inp-scale));
  }

  .sk-field-clear .sk-input {
    background: none;
    border: none;
    color: #fff;
  }

  .sk-label {
    line-height: 1;
    font-size: var(--inp-label);
    color: var(--inp-lc);
  }

  .sk-label-cont {
    margin-bottom: var(--inp-label-mgb);
  }
</style>