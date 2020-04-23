<template>
  <p class="public_title">{{title}}</p>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .public_title {
    position: relative;

    padding-left: 13px;

    font-size: 18px;
    font-weight: bold;
    &::after {
      content: '';
      display: block;
      clear: both;
      position: absolute;
      top: 5px;
      left: 0;

      width: 3px;
      height: 15px;
      background-color: #dc1e32;
    }
  }
</style>
