import { ref } from 'vue';

export function useCode() {
  const showCode = ref(false);

  return {
    showCode,
    toggle() {
      showCode.value = !showCode.value
    }
  }
}