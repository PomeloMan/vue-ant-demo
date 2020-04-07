<template>
  <a-modal
    :visible="visible"
    :title="$t('common.upload_avatar')"
    :maskClosable="false"
    :width="680"
    @cancel="visible = false"
    @ok="save"
  >
    <div>
      <template v-if="!avatar">
        <a-upload-dragger
          name="file"
          :multiple="false"
          :showUploadList="false"
          :beforeUpload="beforeUpload"
        >
          <p class="ant-upload-drag-icon">
            <a-icon :type="!uploading ? 'inbox' : 'loading'" />
          </p>
          <p class="ant-upload-text">Click or drag file to this area to upload</p>
          <p class="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
          </p>
        </a-upload-dragger>
      </template>
      <template v-else>
        <a-row class="cropper-wrapper" :gutter="24">
          <a-col :span="14">
            <div>
              <img id="avatar" :src="avatar" />
            </div>
          </a-col>
          <a-col :span="10">
            <div class="preview-wrapper clearfix">
              <div class="img-preview"></div>
              <a-divider type="vertical" style="background: transparent"></a-divider>
              <div class="img-preview"></div>
            </div>
          </a-col>
        </a-row>
      </template>
    </div>
  </a-modal>
</template>

<script>
import Cropper from 'cropperjs'
import { getBase64 } from '@/utils'
export default {
  data() {
    return {
      visible: false,
      uploading: false,
      avatar: '',
      cropper: ''
    }
  },
  watch: {
    avatar() {
      if (this.avatar) {
        this.$nextTick(() => {
          const avatar = document.getElementById('avatar')
          const previews = document.querySelectorAll('.img-preview')
          this.cropper = new Cropper(avatar, {
            dragMode: 'move',
            aspectRatio: 1 / 1,
            autoCrop: false, // 手动执行crop方法，详见ready() { this.cropper.crop() }
            autoCropArea: 0.65,
            guides: false,
            center: false, // 截取框居中
            cropBoxMovable: false, // 截取框是否可以移动，如果设为false则移动背景图
            cropBoxResizable: false, // 是否可以改变截取框大小
            toggleDragModeOnDblclick: false,
            ready: function() {
              var clone = this.cloneNode()
              clone.className = ''
              clone.style.cssText =
                'display: block;' +
                'width: 100%;' +
                'min-width: 0;' +
                'min-height: 0;' +
                'max-width: none;' +
                'max-height: none;'
              previews.forEach(elem => {
                elem.appendChild(clone.cloneNode())
              })
              this.cropper.crop()
            },
            crop(event) {
              var data = event.detail
              var cropper = this.cropper
              var imageData = cropper.getImageData()
              // var previewAspectRatio = data.width / data.height

              previews.forEach(elem => {
                var previewImage = elem.querySelector('img')
                if (previewImage) {
                  var previewWidth = elem.offsetWidth
                  // var previewHeight = previewWidth / previewAspectRatio
                  var imageScaledRatio = data.width / previewWidth

                  // elem.style.height = previewHeight + 'px'
                  previewImage.style.width =
                    imageData.naturalWidth / imageScaledRatio + 'px'
                  previewImage.style.height =
                    imageData.naturalHeight / imageScaledRatio + 'px'
                  previewImage.style.marginLeft =
                    -data.x / imageScaledRatio + 'px'
                  previewImage.style.marginTop =
                    -data.y / imageScaledRatio + 'px'
                }
              })
            }
          })
        })
      }
    }
  },
  methods: {
    beforeUpload(file) {
      const $this = this
      getBase64(file, function(result) {
        $this.avatar = result
      })
      return false
    },
    save() {
      const cropped = this.cropper.getCroppedCanvas()
      cropped.toDataURL('image/jpeg') // 截取后图片的Base64

      const $this = this
      this.cropper.getCroppedCanvas().toBlob(
        blob => {
          const formData = new FormData()
          // Pass the image file name as the third parameter if necessary.
          formData.append('file', blob /*, 'example.png' */)
          $this.$http
            .post($this.$api.UPLOAD, formData)
            .then(() => {
              $this.$message.success($this.$i18n.t('common.avatar_upload_success'))
              $this.visible = false
            })
            .catch(err => {
              $this.$message.error(err.message)
            })
        } /*, 'image/png' */
      )
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  display: block;
  max-width: 100%;
}
.cropper-wrapper {
  .preview-wrapper {
    display: flex;
    justify-content: space-between;
    .img-preview {
      width: 96px;
      height: 96px;
      overflow: hidden;
      box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2),
        -1px -1px 1px 1px rgba(0, 0, 0, 0.2);
      &:last-child {
        border-radius: 50%;
      }
    }
  }
}
</style>