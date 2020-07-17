<template>
  <div class="tag" :style="{padding: closable? '0 0 0 12px': '0 12px'}">
    <slot></slot>
    <a-button type="link" v-if="closable" @click="handleTagClose">
      <a-icon type="close" />
    </a-button>
  </div>
</template>

<script>
export default {
  props: {
    closable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleTagClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/vars.less';
.tag {
  display: flex;
  align-items: center;
  height: 32px;
  line-height: 32px;
  border-radius: @border-radius-base;
  background-color: var(--component-background);
  border: 1px solid transparent;
  transition: all 0.3s;
  .ant-btn {
    width: 32px;
    padding: 0;
    margin-left: 12px;
  }
  &:hover {
    border: 1px solid var(--primary-color);
    .ant-btn {
      color: var(--component-background);
      background-color: var(--primary-color);
    }
  }
}
</style>