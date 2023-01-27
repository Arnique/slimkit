<template lang="pug">
section
  sk-card
    h4.d-flex.flex-items-center Grid 
      sk-btn.mgl-auto.fw-b(@click="toggle" fill="tint" variant="primary" size="sm") &lt;\&gt;

    pre(v-if="showCode")
      -
        const markup =
        `
        <!-- 12 Column Grid -->
        <sk-grid gap="10px" cols="12">
          <sk-col xs="3" sm="4" lg="2" xl="1"></sk-col>
          <sk-col xs="6" sm="4" lg="8" xl="10"></sk-col>
          <sk-col xs="3" sm="4" lg="2" xl="1"></sk-col>
        </sk-grid>

        <!-- Template Grid -->
        <sk-grid gap="10px" cols="3.5fr 6.5fr">
          <sk-col></sk-col>
          <sk-col></sk-col>
        </sk-grid>

        <!-- N Columns -->
        <sk-grid gap="10px" cols="2" cols-sm="3" cols-lg="4" cols-xl="6">
          <sk-col></sk-col>
          <sk-col></sk-col>
          <sk-col></sk-col>
          <sk-col></sk-col>
          <sk-col></sk-col>
          <sk-col></sk-col>
        </sk-grid>
        `
      code.
        #{markup}
        
    div(v-else)
      h5 12 Column Grid
      sk-grid.text-center.mgb-md(gap="10px" cols="12")
        sk-col(xs="3")
          .pd-sm.fg-white.bg-info-500.rad-md 3/12
        sk-col(xs="6")
          .pd-sm.fg-white.bg-info-500.rad-md 6/12
        sk-col(xs="3")
          .pd-sm.fg-white.bg-info-500.rad-md 3/12

      h5 Template Grid
      sk-grid.text-center.mgb-md(gap="10px" cols="3.5fr 6.5fr")
        sk-col
          .pd-sm.fg-white.bg-primary-500.rad-md 3.5fr
        sk-col
          .pd-sm.fg-white.bg-primary-500.rad-md 6.5fr

      h5 {N} Columns
      sk-grid.text-center.mgb-md(gap="10px" cols="5")
        sk-col(v-for="v in 5" :key="v")
          .pd-sm.fg-white.bg-info-500.rad-md {{ v }}
      h5 Gap = 15px
      sk-grid.text-center.mgb-md(gap="15px" cols="5")
        sk-col(v-for="v in 10" :key="v")
          .pd-sm.fg-white.bg-primary-500.rad-md {{ v }}

      h5 Gap = 0 15px
      sk-grid.text-center.mgb-md(gap="0 15px" cols="5")
        sk-col(v-for="v in 10" :key="v")
          .pd-sm.fg-white(:class="[ v > 5 ? 'bg-info-600 rad-b-md' : 'bg-info-500 rad-t-md']") {{ v }}

      h5 Gap = 15px 0
      sk-grid.text-center.mgb-md(gap="15px 0" cols="5")
        sk-col(v-for="v in 10" :key="v")
          .pd-sm.fg-white(:class="[ v % 2 == 0 ? 'bg-primary-600' : 'bg-primary-500', { 'rad-l-md': [1,6].includes(v) }, { 'rad-r-md': [5,10].includes(v) }]") {{ v }}

</template>

<script setup>
  import { useCode } from './utils';

  const { toggle, showCode } = useCode();
</script>