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
        :scroll="{ y: tableScrollY }"
        size="middle"
      >
        <!-- 店铺LOGO -->
        <span slot="logo" slot-scope="val">
          <a-avatar
            :src="val"
            :size="56"
            shape="square"
            @click="showPreview(val)"
            style="cursor: pointer;"
          ></a-avatar>
        </span>
        <!-- 操作 -->
        <span slot="operation" slot-scope="value, record" class="operation">
          <a-button
            type="link"
            size="small"
            @click="$router.push({path: `/main/e-commerce/shop/${record.id}`})"
          >{{$t('common.edit')}}</a-button>
          <a-divider type="vertical"></a-divider>
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
  </div>
</template>

<script>
import BaseTable from '@/components/mixins/base-table'
import TableColumn from './mixins/table-column'
export default {
  name: 'ec_shop_tab',
  mixins: [BaseTable, TableColumn],
  data() {
    return {
      key: 'id',
      previewVisible: false,
      previewImage: ''
    }
  },
  created() {},
  methods: {
    getData() {
      this.getMockData()
    },
    showPreview(image) {
      this.previewVisible = true
      this.previewImage = image
    },
    // ----- mock -----
    getMockData() {
      this.$http.get(this.$api.ECOMMERCE_SHOP).then(({ data }) => {
        this.data = data.content
        this.total = data.totalElements
        this.$message.warning(this.$t('message.using_mock_data'))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>