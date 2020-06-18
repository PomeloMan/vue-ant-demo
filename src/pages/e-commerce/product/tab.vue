<template>
  <!-- 店铺 -->
  <div>
    <div class="table-content-wrapper no-footer">
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
        <span slot="picture" slot-scope="val, record">
          <a-avatar
            :src="record.pictures[0]"
            @click="showPreview(record.pictures)"
            shape="square"
            :size="56"
          ></a-avatar>
        </span>
        <!-- 操作 -->
        <span slot="operation" slot-scope="val, record" class="operation">
          <a-button
            type="link"
            size="small"
            @click="$router.push({path: `/main/e-commerce/product/${record.id}`})"
          >{{$t('common.edit')}}</a-button>
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
    <!-- 图片预览 -->
    <image-carousel-modal v-model="previewVisible" :images="previewImages"></image-carousel-modal>
  </div>
</template>

<script>
import BaseTable from '@/components/mixins/base-table'
import TableColumn from './mixins/table-column'
import ImageCarouselModal from '@/components/plugins/image-carousel-modal'
import GlobalData from '../index'
export default {
  name: 'ec_product_tab',
  mixins: [BaseTable, TableColumn, GlobalData],
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
.ant-avatar {
  cursor: pointer;
}
</style>