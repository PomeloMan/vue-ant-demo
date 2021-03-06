<template>
  <!-- 商品分类 -->
  <div>
    <app-header :breadcrumbs="breadcrumbs" @refresh="getData">
      <div slot="action-group">
        <a-button type="link" @click="showInfoDrawer(0)">{{ $t('common.new') }}</a-button>
        <a-divider type="vertical" />
        <template v-if="selectedRowKeys.length !== 0">
          <a-popconfirm
            :title="$t('message.is_confirm_delete')"
            :okText="$t('common.ok')"
            :cancelText="$t('common.cancel')"
            @confirm="onDeleteConfirmOk($api.OPERACTION_SUCCESS)"
          >
            <a-button type="link">{{ $t('common.delete') }}</a-button>
          </a-popconfirm>
        </template>
        <template v-else>
          <a-button type="link" :disabled="selectedRowKeys.length === 0">{{ $t('common.delete') }}</a-button>
        </template>
      </div>
    </app-header>
    <div class="table-content-wrapper">
      <a-table
        :columns="columns"
        :rowKey="record => record[key]"
        :rowSelection="{
          columnWidth: 50,
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        :dataSource="data"
        :pagination="false"
        :loading="loading"
        :scroll="{ y: tableScrollY }"
        size="middle"
        @expand="handleExpand"
      >
        <span slot="thumbnail" slot-scope="val">
          <a-avatar
            :src="val"
            shape="square"
            :size="56"
            @click="showPreview(val)"
            style="cursor: pointer;"
          ></a-avatar>
        </span>
        <span slot="operation" slot-scope="text, record">
          <!-- 编辑 -->
          <a-button
            type="link"
            size="small"
            @click="showInfoDrawer(record[key])"
          >{{ $t('common.edit') }}</a-button>
          <a-divider type="vertical" />
          <!-- 删除 -->
          <a-popconfirm
            :title="$t('message.is_confirm_delete')"
            :okText="$t('common.ok')"
            :cancelText="$t('common.cancel')"
            @confirm="onDeleteConfirmOk($api.OPERACTION_SUCCESS, record)"
          >
            <a-button type="link" size="small">{{ $t('common.delete') }}</a-button>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <app-footer
      :current="page"
      :total="total"
      @onPageChange="onPageChange"
      @onPageSizeChange="onPageSizeChange"
    ></app-footer>
    <!-- 图片预览 -->
    <a-modal
      :visible="previewVisible"
      @cancel="previewVisible = false"
      :footer="null"
      :dialogStyle="{top: '50px'}"
    >
      <img :src="previewImage" />
    </a-modal>
    <info-drawer ref="infoDrawer" @refresh="savedCallback"></info-drawer>
  </div>
</template>

<script>
import BaseTable from '@/components/mixins/base-table'
import TableColumn from './mixins/table-column'
import KeepAlive from '@/components/mixins/keep-alive'
import InfoDrawer from './drawer/info'
import GlobalData from '../index'
export default {
  name: 'ec_brand_keepalive',
  mixins: [BaseTable, TableColumn, KeepAlive, GlobalData],
  components: { InfoDrawer },
  data() {
    return {
      key: 'id',
      previewVisible: false,
      previewImage: ''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.getMockData()
    },
    getChildren(record) {
      this.getChildrenMockData(record)
    },
    // 保存成功回调
    savedCallback() {
      this.getEcCategory() // 更新全局分类缓存数据
      this.getData() // 更新列表数据
    },
    // 缩略图预览
    showPreview(image) {
      this.previewVisible = true
      this.previewImage = image
    },
    // 新增/编辑详情
    showInfoDrawer(id) {
      this.$refs['infoDrawer'].form.resetFields()
      this.$refs['infoDrawer'].visible = true
      this.$refs['infoDrawer'].id = id
    },
    // 查询子集
    handleExpand(expanded, record) {
      if (expanded && record.children.length === 0) {
        this.getChildren(record)
      }
    },
    // ----- mock -----
    getMockData() {
      this.loading = true
      this.$http
        .get(this.$api.ECOMMERCE_CATEGORY)
        .then(({ data }) => {
          this.loading = false
          this.data = data.content
          this.total = data.totalElements
          this.$message.warning(this.$t('message.using_mock_data'))
        })
        .catch(() => {
          this.loading = false
        })
    },
    getChildrenMockData(record) {
      this.loading = true
      this.$http
        .get(this.$api.ECOMMERCE_CATEGORY_CHILDREN(record.id))
        .then(({ data }) => {
          this.loading = false
          if (data && data.length > 0) {
            record.children = [...data]
          } else {
            delete record.children
          }
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>