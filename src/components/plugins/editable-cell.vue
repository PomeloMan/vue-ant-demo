<template>
  <div class="editable-cell">
    <div v-if="editable" class="editable-cell-input-wrapper">
      <a-input :value="value" @change="handleChange" @pressEnter="check" />
      <a-icon type="check" class="editable-cell-icon-check" @click="check" />
    </div>
    <div v-else class="editable-cell-text-wrapper">
      <a @click="editable = true">{{ value || ' ' }}</a>
      <a-icon type="edit" class="editable-cell-icon" @click="edit" />
    </div>
  </div>
</template>
<script>
import { Input } from 'ant-design-vue'
export default {
  components: {
    AInput: Input
  },
  props: {
    text: String
  },
  data() {
    return {
      value: this.text,
      editable: false
    }
  },
  watch: {
    text() {
      this.value = this.text
    }
  },
  methods: {
    handleChange(e) {
      const value = e.target.value
      this.value = value
    },
    check() {
      this.editable = false
      this.$emit('change', this.value)
    },
    edit() {
      this.editable = true
    }
  }
}
</script>

<style lang="scss" scoped>
.editable-cell {
  position: relative;
}
// 编辑框样式
.editable-cell-input-wrapper {
  padding-right: 24px;
}
// 文本显示样式
.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}
// 图标样式
.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  width: 20px;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  cursor: pointer;
}
.editable-cell-icon {
  display: none;
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}
.editable-add-btn {
  margin-bottom: 8px;
}
</style>