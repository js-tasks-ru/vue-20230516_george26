<template>
  <div :class=viewInline class="form-group">
    <!-- form-group_inline -->
    <label v-if="isLabel" class="form-group__label">{{ label }}</label>
    <!-- CONTENT -->
    <slot />
  </div>
</template>

<script>
export default {
  name: 'UiFormGroup',

  props: {
    inline: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      required: false,
    }
  },

  computed: {
    viewInline() {
      let formClass = '';
      if (this.inline) {
        formClass = 'form-group_inline';
      }
      return formClass;
    },

    isLabel() {
      return !!this.label;
    },

  }
};
</script>

<style scoped>
.form-group {
  position: relative;
  margin-bottom: 24px;
}

.form-group.form-group_inline {
  display: inline-block;
  margin-bottom: 0;
}

.form-group.form-group_inline + .form-group.form-group_inline {
  margin-left: 16px;
}

.form-group__label {
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  margin-bottom: 10px;
  display: block;
}
</style>
