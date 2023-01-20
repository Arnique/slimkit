// CSS
import '../assets/scss/index.scss';

// Comps
import SkAlert from './alert.vue';
import SkBtn from './btn.vue';
import SkCard from './card.vue';
import SkCol from './col.vue';
import SkDropdown from './dropdown.vue';
import SkDropdownItem from './dropdown-item.vue';
import SkField from './field.vue';
import SkGrid from './grid.vue';
import SkModal from './modal.vue';
import SkNav from './nav.vue';
import SkSpinner from './spinner.vue';
import SkToggle from './toggle.vue';

const map = {
  SkAlert,
  SkBtn,
  SkCard,
  SkCol,
  SkDropdown,
  SkDropdownItem,
  SkField,
  SkGrid,
  SkModal,
  SkNav,
  SkSpinner,
  SkToggle,
};

const keys = Object.keys(map);

export default {
  install(app, options = keys) {
    options.forEach(key => app.component(key, map[key]));
  }
}

export {
  SkAlert,
  SkBtn,
  SkGrid,
  SkCard,
  SkCol,
  SkDropdownItem,
  SkDropdown,
  SkField,
  SkSpinner,
  SkModal,
}
