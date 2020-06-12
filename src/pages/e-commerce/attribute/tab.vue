<template>
  <!-- 店铺 -->
  <div>
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
      >
        <!-- 店铺LOGO -->
        <span slot="logo" slot-scope="val">
          <a-avatar
            :src="val"
            :size="64"
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
            @click="showInfoDrawer(record.id)"
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
    <info-drawer ref="infoDrawer" @refresh="getData"></info-drawer>
  </div>
</template>

<script>
import BaseTable from '@/components/mixins/base-table'
import TableColumn from './mixins/table-column'
import InfoDrawer from './drawer/info'
import GlobalData from '../index'
export default {
  name: 'ec_shop_tab',
  mixins: [BaseTable, TableColumn, GlobalData],
  components: { InfoDrawer },
  data() {
    return {
      key: 'id',
      standardId: undefined,
      tabIndex: this.$parent.$parent.activeKey // 0:SKU / 1:SPU
    }
  },
  created() {
    this.standardId = this.$route.params.standardId
    this.getData()
  },
  methods: {
    getData() {
      this.getMockData()
    },
    // 新增/编辑详情
    showInfoDrawer(id) {
      this.$refs['infoDrawer'].form.resetFields()
      this.$refs['infoDrawer'].id = id
      this.$refs['infoDrawer'].standardId = Number(this.standardId)
      this.$refs['infoDrawer'].visible = true
    },
    // ----- mock -----
    getMockData() {
      this.$http
        .get(this.$api.ECOMMERCE_ATTRIBUTE(this.standardId, this.tabIndex))
        .then(({ data }) => {
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