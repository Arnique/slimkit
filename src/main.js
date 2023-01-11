import { createApp } from 'vue';
import App from './App.vue';

var escape = document.createElement('textarea');
function escapeHTML(html) {
    escape.textContent = html;
    return escape.innerHTML;
}

const code = {
  mounted(el, binding, vnode, prevVnode) {
    // el.innerHTML = el.innerHTML.replace(/<br>/g,'\n')
    // el.innerHTML = el.innerHTML.replace(/</g,'&lt;').replace(/>/g,'&gt;');
    el.innerText = el.innerHTML;
    el.innerText = el.innerText.replace(/<br>/g,'\n')
  }
}


// Import components
import './assets/scss/index.scss';
import SkPlugin from './components/index';

// Create app
const app = createApp(App);

// Use all components
app.use(SkPlugin);

// Mount app
app.mount('#app');
