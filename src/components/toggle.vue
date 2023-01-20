<template lang="pug">
.sk-toggle.d-flex(:style="cssVars")
  label
    input.sk-toggle-input(:type="type" :name="name" :value="value" v-model="model")
    .sk-toggle-ctrl(:class="classes")
      CheckSvg.sk-toggle-check(name="sk-check" v-if="mode == 'check'")
    .sk-toggle-text {{ label }}
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue';
  import CheckSvg from '../assets/svg/checkmark.svg';

  const props = defineProps({
    modelValue: String | Array,
    value: String,
    label: String,
    name: String,
    type: {
      type: String,
      default: 'checkbox'
    },
    mode: {
      type: String,
      default: 'check'
    },
    variant: {
      type: String,
      default: 'primary'
    }
  })

  const emit = defineEmits(['update:modelValue']);

  const model = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    },
  });

  const classes = computed(()=> [
    `sk-toggle-${props.mode}`
  ]);

  const cssVars = computed(() => {
    return {
      '--tog-color': `var(--${props.variant}-500)`
    }
  })
</script>

<style lang="scss">
  .sk-toggle {
    line-height: 20px;
    margin-bottom: 0.5rem;

    label {
      margin: 0;
      display: inline-flex;
      cursor: pointer;
    }
  }

  .sk-toggle-ctrl {
    position: relative;
    display: block;
    user-select: none;
    cursor: pointer;
  }

  .sk-toggle-check.sk-toggle-ctrl,
  .sk-toggle-radio.sk-toggle-ctrl {
    $th: 20px;
    $tw: 20px;
    height: $th;
    width: $tw;
    border-radius: 5px;

    input:not(:checked) ~ & {
      box-shadow: inset 0 0 0 3px var(--mute-l);
      border: none;
      background: none;
    }
  }

  .sk-toggle-radio.sk-toggle-ctrl {
    border-radius: 50%;
    background: none;
    border: none;

    input:checked ~ & {
      box-shadow: inset 0 0 0 7px var(--tog-color);
    }
  }

  .sk-toggle-check.sk-toggle-ctrl {
    input:checked ~ & {
      background: var(--tog-color);
    }

    input:not(:checked) ~ & {
      .sk-toggle-check {
        display: none;
      }
    }

    .sk-toggle-check {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: auto;
      pointer-events: none;

      path {
        fill: #fff;
      }
    }

  }

  .sk-toggle-switch.sk-toggle-ctrl {
    $th: 20px;
    $tw: $th * 1.6;
    $tc: $th - 8px;
    height: $th;
    width: $tw;
    border-radius: $th * 0.5;
    background: var(--tog-color);

    input:not(:checked) ~ & {
      background:var(--mute-l) !important;
    }

    &:after {
      content: '';
      display: block;
      height: $tc;
      width: $tc;
      border-radius: 50%;
      background: #fff;
      position: absolute;
      top: 4px;
      left: 4px;
    }

    input:checked ~ & {
      &:after {
        left: $tw - $tc - 4px;
      }
    }
  }

  .sk-toggle-input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }

  .sk-toggle-text {
    margin-left: 0.7rem;
  }
</style>