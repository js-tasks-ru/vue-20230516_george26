import {  watch } from 'vue';
import { ref } from 'vue';

/**
 * @template T
 * @param {Ref<T>} source - Отслеживаемый ref
 * @returns {Object<{ history: Ref<T[]> }>} - История изменения source
 */
export function refHistory(source) {
  const history = ref([source.value]);
  watch(source, (newHistory) => {
    history.value.push(newHistory);
  }, { flush: 'sync' });
  // ...
  return { history };
}
