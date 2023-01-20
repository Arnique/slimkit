<script setup>
  import BoltSvg from '@/assets/svg/refresh.svg';
  import { useCode } from './utils';
  const { toggle, showCode } = useCode();
  const colors1 = ['default', 'primary', 'success', 'danger'];
</script>

<template lang="pug">
section
  sk-card(style="--fs-unit: 15px")
    h4.d-flex.flex-items-center Buttons
      sk-btn.mgl-auto(@click="toggle" fill="tint" variant="primary" size="sm") #[span.fw-b &lt;\&gt;]

    pre(v-if="showCode")
      -
        const markup =
        `
        <!-- Fill Variants -->
        <sk-btn variant="primary" fill="fg">Button</sk-btn>
        <sk-btn variant="primary" fill="tint">Button</sk-btn>
        <sk-btn variant="primary" fill="bg">Button</sk-btn>
        <sk-btn variant="primary" fill="ol">Button</sk-btn>
        `
      code.
        #{markup}

    div(v-else)
      sk-grid(gap="10px" cols="2" cols-lg="4")
        sk-col(v-for="v in colors1" :key="v" xs="auto")
          sk-btn.mgb-sm(:variant="v" fill="fg" block to="/about") {{ v }}
          sk-btn.mgb-sm(:variant="v" fill="tint" block) {{ v }}
          sk-btn.mgb-sm(:variant="v" fill="bg" block) {{ v }}
          sk-btn.mgb-sm(:variant="v" fill="ol" block) {{ v }}

      h5.mgy-md Buttons with icons
      sk-grid(gap="10px" cols="4")
        sk-col
          sk-btn(variant="primary" fill="bg" block) #[BoltSvg.sk-btn-left] Left Icon
        sk-col
          sk-btn(variant="success" fill="ol" block) Right Icon #[BoltSvg.sk-btn-right]
        sk-col
          sk-btn(variant="danger" fill="tint" sq) #[BoltSvg]
</template>
