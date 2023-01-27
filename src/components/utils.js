import { isPromise } from "@vue/shared";

export function isUndef(v) {
  return typeof v === 'undefined' || v === null
}

export function isDef(v) {
  return !isUndef(v)
}

export function isArray(v) {
  return Array.isArray(v);
}

export function isObject(v) {
  if (isUndef(v)) return false;
  return v === Object(v) && !isArray(v);
}

export function isAnyObject(v) {
  if (isUndef(v)) return false;
  return v === Object(v);
}

export function isString(v) {
  if (isUndef(v)) return false;
  return typeof v === 'string'
}

export function isEmpty(v) {
  return v === undefined ||
         v === null ||
         v.hasOwnProperty('length') && v.length === 0
}

export function formatError(e) {
  if (isString(e)) return e;

  const msgKeys = ['message', '$message'];
  const msg = msgKeys.map(k => e[k]).find(msg => msg != undefined);
  return msg || 'unkown error';
}

export function pick(obj, keys = []) {
  const v = {};
  keys.forEach(k=> v[k] = obj[k]);
  return v;
}

export function cascadeObj(obj, defVal) {
  const x = { ...obj };

  Object.entries(x).reduce((acm, [key, val]) => {
    x[key] = isEmpty(val) ? acm : val
    return x[key]
  }, defVal)

  return x;
}

export function isOutsideClick(event, element) {
  const el = element.$el ? element.$el : element;
  console.log(el)
  const iselement = event.target === el || el.contains(event.target);
  return !iselement;
}

export function getStyleProps(style, props = []) {
  const vars = {}
  props.forEach(k => vars[k] = style.getPropertyValue(k))
  return vars
}

export function resolveLink(instance, resolveComponent) {
  const ctx = instance.appContext;
  const hasNuxtRouter = ctx.app && ctx.app.$nuxt !== undefined;
  const hasRegRouter = ctx.components && ctx.components.RouterLink !== undefined;

  /**
   * NOTE: resolveComponent('NuxtLink') currently does not work in Nuxt3x...
   */
  return hasNuxtRouter
    ? resolveComponent('RouterLink')
    : hasRegRouter ? resolveComponent('RouterLink')
    : 'a'
}