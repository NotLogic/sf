<template>
  <div class="public_button"
    :class="disabled ? 'disabled' : ''"
    @click="btnClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      default: false
    }
  },
  methods: {
    btnClick (e) {
      !this.disabled && this.$emit('clickHandle', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.public_button {
  user-select: none;
  display: inline-block;
  cursor: pointer;
  min-width: 80px;
  padding: 0 20px;
  text-align: center;
  line-height: 30px;
  color: #fff;
  border-radius: 5px;
  background-color: #F56C6C;
  &.disabled {
    cursor: not-allowed;
    background-color: gray;
  }
}
</style>
