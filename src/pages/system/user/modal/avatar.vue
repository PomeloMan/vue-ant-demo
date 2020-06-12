<template>
  <a-modal
    :visible="visible"
    :title="$t('common.upload_avatar')"
    :maskClosable="false"
    :width="640"
    @cancel="visible = false"
    @ok="save"
  >
    <div>
      <template v-if="!avatar">
        <div class="upload-wrapper">
          <a-upload-dragger
            name="file"
            :multiple="false"
            :showUploadList="false"
            :beforeUpload="beforeUpload"
          >
            <p class="ant-upload-drag-icon">
              <a-icon :type="!uploading ? 'inbox' : 'loading'" />
            </p>
            <p class="ant-upload-text">{{$t('message.drag_area_title')}}</p>
            <p class="ant-upload-hint">{{$t('message.drag_area_hint')}}</p>
          </a-upload-dragger>
        </div>
      </template>
      <template v-else>
        <a-row class="cropper-wrapper" :gutter="24" type="flex">
          <a-col class="ant-col" :span="14">
            <div>
              <img id="avatar" :src="avatar" />
            </div>
          </a-col>
          <a-col class="ant-col" :span="10">
            <div class="preview-wrapper clearfix">
              <div class="img-preview"></div>
              <span class="flex-spacer"></span>
              <div class="img-preview"></div>
            </div>
            <div class="operate-wrapper">
              <div>
                <a-upload
                  name="file"
                  :multiple="false"
                  :showUploadList="false"
                  :beforeUpload="beforeUpload"
                >
                  <a-button type="primary">
                    <a-icon type="upload" />
                    {{$t('common.import')}}
                  </a-button>
                </a-upload>
                <a-button-group>
                  <a-tooltip :title="$t('common.reset')">
                    <a-button type="primary" @click="cropper.reset()">
                      <a-icon type="reload"></a-icon>
                    </a-button>
                  </a-tooltip>
                  <a-tooltip :title="$t('common.rotate_counterclockwise', {angle:45})">
                    <a-button type="primary" @click="cropper.rotate(-45)">
                      <a-icon type="undo"></a-icon>
                    </a-button>
                  </a-tooltip>
                  <a-tooltip :title="$t('common.rotate_clockwise', {angle:45})">
                    <a-button type="primary" @click="cropper.rotate(45)">
                      <a-icon type="redo"></a-icon>
                    </a-button>
                  </a-tooltip>
                </a-button-group>
              </div>
              <div>
                <a-button type="primary" @click="printAvatar">
                  <a-icon type="printer"></a-icon>
                  {{$t('common.print')}}
                </a-button>
              </div>
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
      user: '',
      originalFile: '',
      avatar: '',
      cropper: '',
      cropperOptions: {
        dragMode: 'move',
        aspectRatio: 1 / 1,
        autoCrop: true, // false手动执行crop方法，详见ready() { this.cropper.crop() }
        autoCropArea: 0.65,
        guides: false,
        center: false, // 截取框居中
        cropBoxMovable: false, // 截取框是否可以移动，如果设为false则移动背景图
        cropBoxResizable: false, // 是否可以改变截取框大小
        toggleDragModeOnDblclick: false, // 双击切换截取框移动方式
        preview: '.img-preview', // 预览元素（需要设置长宽）
        viewMode: 1,
        // 0:没有限制
        // 1:限制裁切框不要超过画布的大小。
        // 2:限制最小画布大小以适合容器。 如果画布和容器的比例不同，则最小画布将在其中一个维度中被多余的空间包围。
        // 3:限制最小画布大小以适合容器。 如果画布和容器的比例不同，则容器将无法以一个尺寸容纳整个画布。
        ready: function() {}
        // crop(event) {
        //   console.log(event)
        // }
      }
    }
  },
  watch: {
    avatar() {
      if (this.avatar) {
        this.$nextTick(() => {
          if (this.cropper) {
            this.cropper.destroy()
          }
          this.cropper = new Cropper(
            document.getElementById('avatar'),
            this.cropperOptions
          )
        })
      }
    }
  },
  methods: {
    beforeUpload(file) {
      const $this = this
      this.originalFile = file
      getBase64(file, function(result) {
        $this.avatar = result
      })
      return false
    },
    save() {
      const cropped = this.cropper.getCroppedCanvas()
      cropped.toDataURL('image/jpeg') // 截取后图片的Base64

      const $this = this
      this.cropper.getCroppedCanvas().toBlob(blob => {
        const formData = new FormData()
        formData.append('file', blob, this.originalFile.name)
        $this.$http
          .post($this.$api.FILE_USER_AVATAR_UPLOAD, formData, {
            params: {
              type: 'avatar'
            }
          })
          .then(({ data }) => {
            $this.$message.success(
              $this.$t('message.avatar_upload_success')
            )
            // 上传文件成功将文件ID赋值给用户头像
            $this.user.avatar = data[0] && data[0].id
            $this.$http
              .put($this.$api.SYS_USER, $this.user)
              .then(() => {
                $this.$emit('refresh')
                $this.visible = false
              })
              .catch(err => {
                $this.$message.error(err.message)
              })
          })
          .catch(err => {
            $this.$message.error(err.message)
          })
      }, this.originalFile.type)
    },
    printAvatar() {
      const cropped = this.cropper.getCroppedCanvas()
      this.$print({
        printable: [this.avatar, cropped.toDataURL(this.originalFile.type)],
        type: 'image',
        imageStyle: 'margin-bottom:20px;'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  display: block;
  max-width: 100%;
}
.upload-wrapper {
  max-width: 400px;
  margin: auto;
}
.cropper-wrapper {
  min-height: 200px;
  .ant-col:last-child {
    display: flex;
    flex-direction: column;
  }
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
  .operate-wrapper {
    padding: 24px 0;
    > div {
      display: flex;
      justify-content: space-between;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
}
</style>