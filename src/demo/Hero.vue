<template lang="pug">
.hero
  .h6.mgb-0.case-u.fw-n.fg-primary Introducing
  h1.fw-l.mgb-0.fs-2xl Arnique#[span.fg-primary Kit]
  h3.fw-l.mgb-sm Lightweight UI Lib for Vue 3
  p.fw-l Basic vue components collection under 100kb.
  
  sk-grid(gap="10px")
    sk-col(xs="4")
      sk-btn(variant="primary" block) NodeJs
    sk-col(xs="4")
      sk-btn(variant="white" fill="ol" block) ReactJS
</template>

<style lang="scss">
  .hero {
    color: #fff;
    padding: 100px 0 50px 0;

    h1, h3, .h6 {
      color: inherit;
    }

    p {
      opacity: 0.6;
    }

    @include bp-up(lg) {
      width: 100%;
      height: 100vh;
      position: sticky;
      top: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-bottom: 100px;
    }

    @include bp-down(md) {
      h3 {
        font-size: 1rem;
      }
    }
  }
</style>