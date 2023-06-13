<template>
  <UiToasts>
    <UiToast
    v-for="[id, { message, type, icon }] in toasts"
    :key="id"
    :message="message"
    :icon="icon"
    :type="type"
    @close="close(id)"
    />
  </UiToasts>
</template>

<script>
import UiToast from './UiToast.vue';
import UiToasts from './UiToasts.vue';

export default {
  name: 'TheToaster',

  components: { UiToasts, UiToast},

  data() {
    return {
      toasts: new Map(),
    }
  },
  methods: {
    success(message) {
      const data = {
        message,
        type: 'success',
        icon: 'check',
        showTime: 5000,
      };
      this.show(data);
    },

    error(message) {
      const data = {
        message,
        type: 'error',
        icon: 'alert',
        showTime: 5000,
      };
      this.show(data);
    },

    show(data) {
      const id = setTimeout(() => {
        this.toasts.delete(id);
      }, data.showTime);

      this.toasts.set(id, data);
    },

    close(id) {
      this.toasts.delete(id);
      clearTimeout(id);
    }
  },
};
</script>
