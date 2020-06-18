<template>
  <editor
    api-key="no-api-key"
    ref="tinymce"
    v-model="data"
    :disabled="disabled"
    :init="init"
    :plugins="plugins"
    :toolbar="toolbar"
  ></editor>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default/icons.min.js'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/image'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/preview'

const BASE_ASSET_URL = process.env.VUE_APP_BASE_ASSET_URL || ''

export default {
  name: 'tinymce-editor',
  components: { Editor },
  props: {
    value: {
      type: String,
      default: () => ''
    },
    uploadUrl: {
      type: String,
      default: () => ''
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    height: {
      type: [Number, String],
      default: () => 500
    },
    plugins: {
      type: Array,
      default: () => ['link lists image table wordcount fullscreen preview lineheight']
    },
    toolbar: {
      type: String,
      default: () =>
        'undo redo | formatselect lineheight | bold italic backcolor removeformat | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | link lists image table fullscreen | preview help'
    }
  },
  data() {
    const $this = this
    return {
      tinymce,
      data: '',
      //初始化配置
      init: {
        base_url: BASE_ASSET_URL + '/tinymce',
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/tinymce/skins/ui/oxide',
        height: this.height,
        branding: false,
        menubar: false,
        toolbar_drawer: false, // false | 'sliding' | 'floating'; @ref https://www.tiny.cloud/docs/configure/editor-appearance/#toolbar_drawer
        content_style: 'p {margin: 0px;}',
        plugins: this.plugins, //[
        // 'link lists image table wordcount fullscreen'
        // 'advlist autolink lists link image charmap print preview anchor',
        // 'searchreplace visualblocks code fullscreen',
        // 'insertdatetime media table paste code help wordcount'
        // ],
        toolbar: this.toolbar,
        // 'undo redo | formatselect | bold italic backcolor removeformat | \
        //  alignleft aligncenter alignright alignjustify | \
        //  bullist numlist outdent indent | link lists image table fullscreen | help',
        //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          // const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          // success(img)
          const formData = new FormData()
          formData.append('file', blobInfo.blob(), blobInfo.filename())
          $this.$http
            .post($this.uploadUrl, formData)
            .then(({ data }) => {
              success(data.url)
            })
            .catch(err => {
              failure(err.message)
            })
        }
      }
    }
  },
  watch: {
    data(value) {
      this.data = value
      this.$emit('input', value)
    },
    value(val) {
      this.data = val
    }
  },
  mounted() {
    this.data = this.value
  }
}
</script>

<style lang="scss" scoped>
</style>
