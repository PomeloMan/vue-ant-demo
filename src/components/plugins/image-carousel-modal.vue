<template>
  <!-- 图片走马灯模态框 -->
  <a-modal :visible="visible" @cancel="cancel" :footer="null" :dialogStyle="{top: '50px'}">
    <a-carousel arrows>
      <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
        <a-icon type="left-circle" />
      </div>
      <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
        <a-icon type="right-circle" />
      </div>
      <img :src="img" :key="index" v-for="(img, index) in images" />
    </a-carousel>
  </a-modal>
</template>

<script>
export default {
  model: {
    prop: 'visible',
    event: 'visibleChange'
  },
  props: {
    visible: {
      type: Boolean,
      default: () => false
    },
    images: {
      type: Array,
      default: () => new Array()
    }
  },
  methods: {
    cancel() {
      this.$emit('visibleChange', false)
    }
  }
}
</script>

<style scoped>
/* 注：穿透符【>>>】需要在CSS格式下才有效 */
.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}
</style>