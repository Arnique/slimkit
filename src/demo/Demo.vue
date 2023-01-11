<template lang="pug">
section
  sk-card()
    h1 Hello World!
    p This is some paragraph text!
    sk-btn(fill="ol") Button
    sk-btn Button
    sk-btn(disabled) Disabled
    hr
    sk-btn(fill="ol" variant="success") Button
    sk-btn(variant="success") Button
    sk-btn(disabled variant="success") Disabled
    hr
    sk-btn(fill="ol" variant="danger") Button
    sk-btn(variant="danger") Button
    sk-btn(disabled variant="danger") Disabled
    hr
    sk-dropdown(text="DropDown")
      sk-dropdown-item one
      sk-dropdown-item two
      sk-dropdown-item three
    div(style="height:100px")
    sk-dropdown(text="DropDown" fill="tint" variant="danger")
      sk-dropdown-item one
      sk-dropdown-item two
      sk-dropdown-item three
    div(style="height:100px")
    sk-field(label="username" placeholder="Enter term" type="search")
    sk-field(label="username" disabled)
    sk-toggle(variant="primary" v-model="opt" mode="switch")
</template>

<script setup>
  import { ref } from 'vue'

  const opt = ref(true)
</script>