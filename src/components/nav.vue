<template lang="pug">
ul.sk-nav(:class="classes")
  li.sk-nav-item(
    v-for="(m,i) in _menu" :key="i"
    :ref="el => { items[i] = el}"
    :data-toggle="m.toggle"
    :aria-expanded="m.open"
    :class="{ open: m.open }"
    @click="m.toggle == 'click' ? toggle($event, { el: items[i], mi: m }) : () => {}"
  )
    component.sk-nav-link(:is="tag(m)" :to="m.to" :href="m.href")
      span {{ m.name }}
      DownSvg.sk-nav-arrow(v-if="m.children")

    .sk-nav-drop(v-if="m.children")
      component.sk-nav-drop-item(
        v-for="c in m.children"
        :is="tag(c)"
        :to="c.to"
        :href="c.href"
      )
        span {{ c.name }}
</template>

<script setup>
  import { computed, ref, onMounted, getCurrentInstance, resolveComponent } from 'vue';
  import DownSvg from '@/assets/svg/cheveron-down.svg';
  import { isOutsideClick, resolveLink } from './utils';

  const items = ref([]);
  const _menu = ref([]);
  const instance = getCurrentInstance();

  onMounted(()=> {
    _menu.value = [...props.menu].map(x => ({...x}));

    _menu.value.forEach(x => {
      x.open = x.open || false;
      x.toggle = x.toggle || 'hover';
    });
  })

  const props = defineProps({
    menu: {
      type: Array,
      default: () => []
    },

    vert: {
      type: Boolean,
      default: false
    }
  });

  const classes = computed(() => {
    return [
      { 'sk-nav-v': props.vert }
    ]
  });

  function tag(v) {
    return v.to || v.href
      ? resolveLink(instance, resolveComponent)
      : 'div';
  }

  function toggle(e, { el, mi }) {
    const closer = (e) => {
      if (!mi.stayOpen && mi.open && isOutsideClick(e, el)) {
        window.removeEventListener('click', closer);
        mi.open = false;
      }

      if (!mi.open) window.removeEventListener('click', closer);
    }

    window.addEventListener('click', closer);

    mi.open = !mi.open;
  }
</script>

<style lang="scss">
  .sk-nav {
    @each $key, $val in $nav-css-vars {
      --#{'nav-' + $key}: #{$val};
    }

    line-height: 1;
    display: flex;
    @extend %unlist;
  }

  .sk-nav-item {
    position: relative;

    &[data-toggle="hover"]:hover .sk-nav-drop,
    &[data-toggle="click"].open .sk-nav-drop {
      display: block;
    }

    &[data-toggle="focus"] {
      .sk-nav-link:focus ~ .sk-nav-drop {
        display: block;
      }
    }
  }

  .sk-nav-link {
    height: 100%;
    padding: var(--nav-pdy) var(--nav-pdx);
    color: var(--nav);
    @extend %unlink;
    @extend %flex-align-center;

    @at-root a#{&} {
      &:hover {
        color: var(--nav-hover);
      }

      &.nuxt-link-exact-active, 
      &.active {
        color: var(--nav-active);
      }
    }
  }

  .sk-nav-arrow {
    margin-left: 0.5rem;
    display: inline-block;
    height: 0.8em;
    width: auto;

    .sk-nav-item.open & {
      transform: rotateZ(180deg);
    }
  }

  .sk-nav-icon {
    margin-right: 10px;
  }

  .sk-nav-text {
    flex: 1;
  }

  .sk-nav-drop {
    display: none; 
    background: var(--card-bg);
    top: 100%;
    position: absolute;
    border-radius: var(--rad-md);
    box-shadow: 0 5px 10px $shadow, 0 0.5px 1px 1px $shadow; 
    padding: 0.5em 0;
  }

  .sk-nav-drop-item {
    padding: 0.5em var(--nav-pdx);
    color: $nav;
    @extend %unlink;
    @extend %flex-align-center;

    @at-root a#{&} {
      &:hover {
        color: $nav-hover;
      }
    }

    .sk-dark & {
      color: $dmd-nav;
    }
  }

  @mixin sk-nav-v($name:"") {
    .sk-nav-v#{$name} {
      display: block;

      > li > a {
          padding: 0.5em 0;
      }

      .sk-nav-drop {
        position: static;
        top: 0;
        padding: 0;
        box-shadow: none;
        background: none;
      }

      .sk-nav-arrow {
        margin-left: auto;
      }
    }
  }

  @include sk-nav-v();
</style>