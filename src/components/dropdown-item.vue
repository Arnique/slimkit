<template lang="pug">
component.sk-dropdown-item(:is="tag" :to="to")
  slot
</template>

<script setup>
  import { resolveComponent, computed } from 'vue';

  const props = defineProps({
    to: {
      type: String
    }
  })

  const tag = computed(()=> {
    return props.to 
      ? resolveComponent('nuxt-link')
      : props.href ? 'a' 
      : 'div';
  })
</script>
  