<template lang="pug">
.sk-card.shad-md(:class="{ 'is-busy': busy }")
  .sk-card-header(v-if="hasHeader" :class="headerClasses")
    slot(name="header")
  .sk-card-body(:class="bodyClasses")
    slot
  .sk-card-footer(v-if="hasFooter" :class="footerClasses")
    slot(name="footer")
</template>

<script setup>
  import { computed, useSlots } from 'vue';

  const slots = useSlots();

  const props = defineProps({
    headerClass: {
      type: String,
      default: ''
    },
    footerClass: {
      type: String,
      default: ''
    },
    bodyClass: {
      type: String,
      default: ''
    },
    busy: {
      type: Boolean,
      default: false
    },
  });

  const hasHeader = computed(()=> {
    return slots.hasOwnProperty('header') && slots.length;
  });

  const hasFooter = computed(()=> {
    return slots.hasOwnProperty('footer') && slots.length;
  });

  const bodyClasses = computed(()=> {
    return [
      ...props.bodyClass ? [props.bodyClass] : []
    ];
  });

  const headerClasses = computed(()=> {
    return [
      ...props.headerClass ? [props.headerClass] : []
    ];
  });

  const footerClasses = computed(()=> {
    return [
      ...props.footerClass ? [props.footerClass] : []
    ];
  });
</script>

<style lang="scss">
  .sk-card {
    @each $key, $val in $card-css-vars {
      --#{'card-' + $key}: #{$val};
    }

    @each $key, $val in $card-color-vars {
      --#{'card-' + $key}: #{$val};
    }
    border-radius: var(--card-rad);
    background: var(--card-bg);
    color: var(--text);
    border: 1px solid var(--card-bd);
  }

  [data-skin="dark"] {
    &.sk-card, .sk-card {
      @each $key, $val in $dmd-card-color-vars {
        --#{'card-' + $key}: #{$val};
      }
    }
  }

  .sk-card-body {
    padding: var(--card-body-pdy) var(--card-body-pdy);
  }

  .sk-card-header {
    padding: var(--card-header-pdy) var(--card-header-pdy);
  }

  .sk-card-footer {
    padding: var(--card-footer-pdy) var(--card-footer-pdy);
  }
</style>