<template lang="pug">
section
  sk-card
    h4.d-flex.flex-items-center Form Elements
      sk-btn.mgl-auto(@click="toggle" fill="tint" variant="primary" size="sm") #[span.fw-b &lt;\&gt;]

    pre(v-if="showCode")
      -
        const markup =
        `
        <!-- Fields -->
        <sk-field mode="input" label="First Name" v-model="name"/>
        <sk-field mode="ta" label="Message" v-model="message"/>
        <sk-field mode="select" label="Country" :options="countries" v-model="country"/>

        <!-- Checkbox -->
        <sk-toggle type="checkbox" label="Primary" variant="primary" v-model="opt" />

        <!-- Radio -->
        <sk-toggle type="radio" label="Primary" variant="primary" v-model="opt" />

        <!-- Switch -->
        <sk-toggle mode="switch" label="Primary" variant="primary" v-model="opt" />
        `
      code.
        #{markup}

    div(v-else)
      sk-grid.mgb-lg
        sk-col(xs="12" lg="6")
          sk-field(block label="First Name" name="firstname" placeholder="Enter name" v-model="firstname")
          sk-field(block mode="select" label="Country" name="country" v-model="country" :options="countries")
        sk-col(xs="12" lg="6")
          sk-field(block mode="ta" rows="5" label="Message" name="message" v-model="message")
      sk-grid
        sk-col(xs="12" lg="12")
          sk-grid(cols="1" cols-lg="3" gap="20px")
            sk-col
              h5 Checkbox
              sk-toggle(v-for="(v,i) in colors" :key="v" type="checkbox" :name="'radio' + i" v-model="ar1" :value="v" :label="v" :variant="v")
            sk-col
              h5 Radio
              sk-toggle(v-for="(v,i) in colors" :key="v" type="radio" name="radio" mode="radio" v-model="ar2" :value="v" :label="v" :variant="v")
            sk-col
              h5 Switch
              sk-toggle(mode="switch" v-for="(v,i) in colors" :key="v" v-model="terms[i]" :variant="v" :label="v")

</template>

<script setup>
  import {ref} from 'vue';
  import { useCode } from './utils';
  const { toggle, showCode } = useCode();
  
  const email = ref('')
  const password = ref('')
  const message = ref('')
  const country = ref('ke')
  const firstname = ref('')
  const lastname = ref('')

  const ar1 = ref(['primary', 'secondary', 'success'])
  const ar2 = ref('primary')
  const terms = ref([true, true, true, true, true, true])

  const countries = [
    { value: 'ke', name: 'Kenya' },
    { value: 'de', name: 'Germany' },
    { value: 'es', name: 'Spain' },
  ]

  const colors = ref(['primary', 'secondary', 'success', 'info', 'warning', 'danger']);
</script>
