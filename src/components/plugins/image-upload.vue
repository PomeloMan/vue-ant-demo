<template>
  <div class="image-upload">
    <a-upload
      :name="name"
      accept=".jpg, .jpeg, .png"
      listType="picture-card"
      :action="'https://www.mocky.io/v2/5cc8019d300000980a055e76'"
      :multiple="multiple"
      :showUploadList="multiple"
      :disabled="disabled"
      :withCredentials="true"
      :beforeUpload="beforeUpload"
      @preview="handlePreview"
      @change="handleChange"
      :style="uploadStyle"
    >
      <img v-if="imageUrl" :src="imageUrl" style="width:100%;" />
      <div v-else>
        <a-icon :type="uploading?'loading':'plus'" />
        <div class="ant-upload-text">{{$t('common.upload')}}</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
      <img style="width: 100%" :src="previewImageUrl" />
    </a-modal>
    <slot></slot>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
export default {
  props: {
    // ant组件属性
    name: {
      type: String,
      default: 'file'
    },
    action: String,
    multiple: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fileList: {
      type: Array,
      default: undefined
    },
    headers: Object,
    // 自定义属性
    limit: {
      type: Object,
      default: () => ({
        width: 1024, // 1024px
        height: 1024, // 1024px
        size: 10 // 1M
      })
    },
    width: [Number, String],
    height: [Number, String]
  },
  data() {
    return {
      uploading: false,
      previewVisible: false, // 多图片字段
      imageUrl: '', // 单图片字段
      previewImageUrl: '', // 多图片字段
      uploadStyle: {}
    }
  },
  mounted() {
    const el = this.$el.querySelector(
      '.ant-upload.ant-upload-select-picture-card'
    )
    if (this.width != null) {
      if (isNaN(Number(this.width))) {
        el.style.width = this.width
      } else {
        el.style.width = `${this.width}px`
      }
    }
    if (this.height != null) {
      if (isNaN(Number(this.height))) {
        el.style.height = this.height
      } else {
        el.style.height = `${this.height}px`
      }
    }

    if (!this.multiple) {
      this.uploadStyle = {
        width: 'auto'
      }
    }
  },
  methods: {
    handleChange(info) {
      if (!this.multiple) {
        this.handleSingleChange(info.file)
      } else {
        this.handleMultipleChange(info.fileList)
      }
    },
    handleSingleChange(file) {
      if (file.status === 'uploading') {
        this.uploading = true
        return
      }
      if (file.status === 'done') {
        this.uploading = false
        const response = file.response
        if (response) {
          this.imageUrl = response.url
        }
        this.$emit('done', response)
      }
      if (file.status == 'error') {
        this.uploading = false
        this.$message.error(this.$t('message.image_upload_failure'))
      }
    },
    handleMultipleChange(fileList) {
      this.fileList = fileList
    },
    // 预览
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImageUrl = file.url || file.preview
      this.previewVisible = true
    },
    // 上传验证
    beforeUpload(file) {
      // 校验图片
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error(this.$t('message.image_type_error'))
        return false
      }
      // 校验大小
      const isLtSize = file.size / 1024 / 1024 < this.limit.size
      if (!isLtSize) {
        this.$message.error(
          this.$t('message.image_size_error', { max: this.limit.size })
        )
        return false
      }
      // 校验图片尺寸
      const $this = this
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        const image = new Image()
        image.onload = function() {
          if (
            $this.limit.width < image.width ||
            $this.limit.height < image.height
          ) {
            $this.$message.error(
              $this.$t('message.image_wh_error', {
                w: $this.limit.width,
                h: $this.limit.height
              })
            )
            reject(false)
          } else {
            resolve(true)
          }
        }
        image.onerror = reject
        reader.addEventListener('load', () => {
          image.src = reader.result
        })
        reader.readAsDataURL(file)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>