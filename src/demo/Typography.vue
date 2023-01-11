<template lang="pug">
sk-card
  h1.mgb-0 Heading 1<br>on two lines
  .fg-mute.mgb-sm.case-c Muted Text
  p Lorem Ipsum has #[a(href="#home") been the industry's] standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  sk-grid(gap="20px")
    sk-col(xs="12" lg="4")
      ul.ul-disc
        li First line
        li Second line
        li Third line
    sk-col(xs="12" lg="4")
      ol.ul-decimal
        li First line
        li Second line
        li Third line
  hr
  sk-grid
    sk-col(xs="12" lg="6")
      h2 Heading 2<br>accross two lines
      p Lorem Ipsum is the industry's standard dummy
      h3 Heading 3<br>accross two lines
      p Lorem Ipsum is the industry's standard dummy
    sk-col(xs="12" lg="6")
      h4 Heading 4<br>accross two lines
      p Lorem Ipsum is the industry's standard dummy
      h5 Heading 5<br>accross two lines
      p Lorem Ipsum is the industry's standard dummy
      h6 Heading 6<br>accross two lines
      p Lorem Ipsum is the industry's standard dummy
</template>