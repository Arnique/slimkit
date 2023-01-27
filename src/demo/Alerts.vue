<script setup>
  import { useCode } from './utils';
  const { toggle, showCode } = useCode();
  const colors = ['success', 'info', 'warning', 'danger'];
</script>

<template lang="pug">
section
  sk-card
    h4.d-flex.flex-items-center Alerts
      sk-btn.mgl-auto(@click="toggle" fill="tint" variant="primary") #[span &lt;\&gt;]

    pre(v-if="showCode")
      -
        const markup =
        `
        <!-- Solid Variants -->
        <sk-alert variant="success" closable>Success</sk-alert>
        <sk-alert variant="info" closable>Info</sk-alert>
        <sk-alert variant="warning" closable>Warning</sk-alert>
        <sk-alert variant="danger" closable>Danger</sk-alert>

        <!-- Outline Variants -->
        <sk-alert variant="success" fill="ol" closable>Success</sk-alert>
        <sk-alert variant="info" fill="ol" closable>Info</sk-alert>
        <sk-alert variant="warning" fill="ol" closable>Warning</sk-alert>
        <sk-alert variant="danger" fill="ol" closable>Danger</sk-alert>
        `
      code.
        #{markup}

    div(v-else)
      sk-grid(cols="12")
        sk-col(xs="12" lg="6")
          sk-alert.mgb-md(v-for="v in colors" :key="v" :variant="v" :closable="true") {{ v }}
        sk-col(xs="12" lg="6")
          sk-alert.mgb-md(v-for="v in colors" :key="v" :variant="v" :closable="true" fill="ol") {{ v }}
</template>
