<template>
  <!-- 电商商户 -->
  <div>
    <app-header :breadcrumbs="breadcrumbs">
      <div slot="action-group">
        <a-button type="link" @click="showInfoDrawer(0)">{{ $t('common.new') }}</a-button>
        <a-divider type="vertical" />
        <template v-if="selectedRowKeys.length !== 0">
          <a-popconfirm
            :title="$t('message.is_confirm_delete')"
            :okText="$t('common.ok')"
            :cancelText="$t('common.cancel')"
            @confirm="onDeleteConfirmOk($api.SYS_USER)"
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
        :scroll="{ x: 1400, y: tableScrollY }"
        size="middle"
      >
        <!-- 商品图片 -->
        <span slot="picture" slot-scope="text, record">
          <img :src="record.pictures[0]" @click="showPreview(record.pictures)" />
        </span>
        <!-- 操作 -->
        <span slot="operation" class="operation">
          <a-button type="link" size="small">{{$t('common.detail')}}</a-button>
          <a-divider type="vertical"></a-divider>
          <a-popconfirm
            :title="$t('message.is_confirm_delete')"
            :okText="$t('common.ok')"
            :cancelText="$t('common.cancel')"
            @confirm="onDeleteConfirmOk($api.SYS_USER, record)"
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
    <image-carousel-modal v-model="previewVisible" :images="previewImages"></image-carousel-modal>
  </div>
</template>

<script>
import BaseTable from '@/components/mixins/base-table'
import KeepAlive from '@/components/mixins/keep-alive'
import TableColumn from './mixins/table-column'
import ImageCarouselModal from '@/components/plugins/image-carousel-modal'
import GlobalData from '../index'
export default {
  name: 'ec_shop_keepalive',
  mixins: [BaseTable, KeepAlive, TableColumn, GlobalData],
  components: { ImageCarouselModal },
  data() {
    return {
      key: 'id',
      previewVisible: false,
      previewImages: []
    }
  },
  created() {
    this.getData()
  },
  activated() {
    this.getData()
  },
  methods: {
    getData() {
      this.getMockData()
    },
    showPreview(images) {
      this.previewVisible = true
      this.previewImages = images
    },
    // ----- mock -----
    getMockData() {
      this.$http.get(this.$api.ECOMMERCE_PRODUCT).then(({ data }) => {
        this.data = data.content
        this.total = data.totalElements
        this.$message.warning(this.$t('message.using_mock_data'))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ant-table td img {
  width: 64px;
  height: 64px;
  cursor: pointer;
}
</style>