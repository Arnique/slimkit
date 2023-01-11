<script setup>
  import { useCode } from './utils';

  const { toggle, showCode } = useCode();
  const colors = ['dark', 'primary', 'info', 'success', 'warning', 'danger']
</script>

<template lang="pug">
section
  sk-card
    h4.d-flex.flex-items-center Theme Colors
      sk-btn.mgl-auto(@click="toggle" fill="tint" variant="primary" size="sm") #[span.fw-b &lt;\&gt;]

    pre(v-if="showCode")
      -
        const markup =
        `
        <!-- Backgrounds -->
        <div class="bg-primary-500"></div>

        <!-- Foregrounds/text -->
        <div class="fg-primary-500"></div>

        <!-- Svg fills -->
        <svg class="fill-primary-500"></svg>
        `
      code.
        #{markup}

    div(v-else)
      sk-grid.fs-xs(cols="3" cols-lg="3" gap="15px")
        sk-col(xs="auto" v-for="c in colors" :key="c")
          div.pd-sm.rad-t-xs.fg-dark-700(:class="[`bg-${c}-50`]") 50
          div.pd-sm(v-for="v in 9" :key="v" :class="[`bg-${c}-${v}00`, v < 4 ? 'fg-dark-700' : 'fg-white', { 'rad-b-xs': v == 9 }]") {{c}}-{{ v * 100}}

</template>
