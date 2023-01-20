<script setup>
  import { useCode } from './utils';
  const { toggle, showCode } = useCode();
  const menu1 = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about', open: true, stayOpen: true, toggle: 'click', children: [
      { name: 'History', href: '#history' },
      { name: 'Team', href: '#team' },
      { name: 'Sponsors', href: '#sponsors' },
    ] },
    { name: 'Contact', href: '#about' },
  ]

  const menu2 = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about', open: true, toggle: 'click', children: [
      { name: 'History', href: '#history' },
      { name: 'Team', href: '#team' },
      { name: 'Sponsors', href: '#sponsors' },
    ] },
    { name: 'Contact', href: '#about' },
  ]
</script>

<template lang="pug">
section
  sk-card(style="min-height: 300px")
    h4.d-flex.flex-items-center Nav
      sk-btn.mgl-auto(@click="toggle" fill="tint" variant="primary" size="sm") #[span.fw-b &lt;\&gt;]

    pre(v-if="showCode")
      -
        const markup =
        `
        <!-- Default -->
        <sk-nav :menu="menu" />

        <!-- Vertical -->
        <sk-nav :menu="menu" vert/>

        <!-- Menu -->
        <script>
          const menu = [
            { name: 'Home', href: '#home' },
            { name: 'About', href: '#about', open: true, toggle: 'click', children: [
              { name: 'History', href: '#history' },
              { name: 'Team', href: '#team' },
              { name: 'Sponsors' },
            ] },
            { name: 'Contact', href: '#about' },
          ]
        </script>
        `
      code.
        #{markup}

    div(v-else)
      sk-grid(gap="20px")
        sk-col(xs="12" lg="3")
          .pd-md.rad-md.bg-mute-xl
            sk-nav(:menu="menu1" vert)
        sk-col(xs="12" lg="9")
          .pd-sm.rad-md.bg-mute-xl(style="margin-bottom: 100px")
            sk-nav(:menu="menu2")
</template>
