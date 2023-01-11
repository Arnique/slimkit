<script setup>
  import { useCode } from './utils';
  const { toggle, showCode } = useCode();
</script>

<template lang="pug">
section
  sk-card
    h4.d-flex.flex-items-center Spinners
      sk-btn.mgl-auto(@click="toggle" fill="tint" variant="primary" size="sm") #[span.fw-b &lt;\&gt;]

    pre(v-if="showCode")
      -
        const markup =
        `
        <!-- Variants -->
        <sk-spinner variant="primary" />
        <sk-spinner variant="info" />
        <sk-spinner variant="success" />
        <sk-spinner variant="warning" />
        <sk-spinner variant="danger" />
        `
      code.
        #{markup}

    div(v-else)
      sk-grid(cols="1" cols-lg="4" gap="10px")
        sk-col(v-for="v in ['primary', 'info', 'success', 'danger']")
          .d-iflex.flex-items-center
            sk-spinner(:variant="v")
            .font-mono.mgl-md {{ v }}
</template>
