<script setup>
  import { ref } from 'vue';
  import { useCode } from './utils';
  const { toggle, showCode } = useCode();
  const show = ref(false);
</script>

<template lang="pug">
section
  sk-card
    h4.d-flex.flex-items-center Modals
      sk-btn.mgl-auto(@click="toggle" fill="tint" variant="primary" size="sm") #[span.fw-b &lt;\&gt;]

    pre(v-if="showCode")
      -
        const markup =
        `
        <!-- Trigger -->
        <sk-btn variant="primary" @click="show = true">Open Modal</sk-btn>

        <!-- Modal -->
        <sk-modal v-model="show">
          <!-- Content -->
          <sk-btn @click="show = false">Cancel</sk-btn>
        </sk-modal>
        `
      code.
        #{markup}

    div(v-else)
      sk-btn(@click="show = true" variant="primary" fat) Open Modal
      sk-modal(v-model="show")
        div
          h4.mgb-sm Close This Modal?
          p By the way you can put anything in the modal
          .d-flex.flex-just-end.gap-col-xs
            sk-btn(@click="show = false" fill="ol" variant="primary" fat) Ok
            sk-btn(@click="show = false" variant="primary" fat) Cancel
</template>
