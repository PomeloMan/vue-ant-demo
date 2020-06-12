<template>
  <a-form :form="form">
    <a-form-item :wrapper-col="{ offset: 5, span: 14 }">
      <a-upload-dragger
        name="file"
        :multiple="true"
        :action="'https://www.mocky.io/v2/5cc8019d300000980a055e76'"
        @change="handleChange"
      >
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">{{$t('message.drag_area_title')}}</p>
        <p class="ant-upload-hint">{{$t('message.drag_area_hint')}}</p>
      </a-upload-dragger>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 5, span: 14 }">
      <div class="preview-wrap">
        <template v-for="item in fileList">
          <img
            :key="item.uid"
            :src="item.response && item.response.url"
            v-if="item.status === 'done'"
          />
        </template>
      </div>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  model: {
    prop: 'data',
    event: 'dataChange'
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      refName: 'qualificationStep',
      fileList: []
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  created() {},
  mounted() {
    if (this.$parent.scrollContainer) {
      this.$parent.scrollContainer.scrollTop = 0
    }
  },
  methods: {
    next() {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$emit('dataChange', { ...values })
            resolve(values)
          } else {
            reject(err)
          }
        })
      })
    },
    handleChange(info) {
      const status = info.file.status
      if (status === 'done') {
        this.$message.success(this.$t('message.image_upload_success'))
      } else if (status === 'error') {
        this.$message.error(this.$t('message.image_upload_failure'))
      }
      this.fileList = info.fileList
    }
  }
}
</script>

<style lang="scss" scoped>
.ant-form {
  width: 80%;
  margin: auto;
}
.preview-wrap {
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
  }
}
</style>
<style scoped>
.ant-form >>> .ant-form-item-children > div {
  display: flex;
}
</style>