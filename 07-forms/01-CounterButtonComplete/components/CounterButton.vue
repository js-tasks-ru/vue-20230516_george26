<template>
  <button @click="handlerCount">{{ updateCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    }
  },

  data() {
    return {
      updateCount: this.count,
    }
  },
  methods: {
    handlerCount() {
      this.updateCount++;
      this.$emit('update:count', this.updateCount);
    }
  },

  watch: {
      count(newValue) {
        this.updateCount = newValue;
    }
  },

  emits: ['update:count'],
};
</script>
