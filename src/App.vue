<script setup>
import { ref } from 'vue';
import Demo from './demo/Demo.vue';
import Hero from './demo/Hero.vue';
import Alerts from './demo/Alerts.vue';
import Buttons from './demo/Buttons.vue';
import Colors from './demo/Colors.vue';
import Forms from './demo/Forms.vue';
import Typography from './demo/Typography.vue';
import Grid from './demo/Grid.vue';
import Modal from './demo/Modal.vue';
import Spinners from './demo/Spinners.vue';
import Nav from './demo/Nav.vue';

const dark = ref(false);

function toggle() {
  dark.value = !dark.value;
}
</script>

<template lang="pug">
.page
  header#header.fg-white.text-center.fw-l
    h1.fw-inh.fg-white.mgb-0.flex-center Slim#[span.fg-primary Kit] #[small.text-upper.font-mono.mgl-sm.opc-70 (beta)]
    .fs-h4.mgb-sm.opc-70 Basic Lightweight vue3 UI components
    .mgb-md.fw-n Github: #[a(href="https://github.com/Arnique/slimkit") github.com/Arnique/slimkit]
  .d-iflex.flex-just-center.fg-white.fw-n.skin-toggle.rad-md.center-x
    sk-toggle.mgb-0(mode='switch' v-model="dark" label="Dark Mode")
  
  div(:data-skin="dark ? 'dark' : 'light'")
    //- Demo
    Grid
    Colors
    Buttons
    Alerts
    Forms
    Nav
    Modal
    Spinners
    Typography
  footer#footer &copy;2022 - #[a(href="http://www.arnique.net") arnique.net]
</template>

<style lang="scss">
  body {
    background: var(--bg);
    color: var(--text);
    @include bp-down(md) {
      font-size: 14px;
    }
  }

  .page {
    max-width: 780px;
    padding: 0 30px;
    margin: 0 auto;

    .sk-card {
      margin-bottom: 30px;

      pre {
        margin: 0;
      }
    }

    @include bp-down(md) {
      padding: 0 20px;
    }
  }

  #header {
    position: relative;
    z-index: 500;
    padding-top: 100px;

    @include bp-down(md) {
      padding-top: 70px;

      .fs-h4 {
        font-size: 1.3rem;
      }
    }
  }

  .skin-toggle {
    position: sticky;
    top: 40px;
    background: var(--dark-600);
    padding: 10px 13px;
    margin: 0 auto 50px auto;
    z-index: 500;

    .sk-toggle {
      margin: 0
    }
  }

  #footer {
    text-align: center;
    color: #fff;
    padding: 20px 0 50px 0;

    @include bp-down(md) {
      padding: 10px 0 40px 0;
    }
  }
</style>
