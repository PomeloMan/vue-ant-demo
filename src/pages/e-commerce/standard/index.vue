<template>
  <!-- 规格标准管理 -->
  <!-- 一个分类对应多个规格标准，当创建商品时选择分类后，可以导入对应分类下的一个规格标准，方便快速创建商品 -->
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
      >
        <!-- 设置 -->
        <span slot="setting" slot-scope="val, record">
          <a-popover v-model="record.skuVisible" trigger="click">
            <div slot="content">
              <p>颜色</p>
              <p>尺寸</p>
              <a-button
                type="link"
                size="small"
                @click="$router.push({path: `/main/e-commerce/attribute/${record.id}`})"
              >设置</a-button>
            </div>
            <a-tag>SKU</a-tag>
          </a-popover>
          <a-divider type="vertical"></a-divider>
          <a-popover v-model="record.spuVisible" trigger="click">
            <div slot="content">
              <p>颜色</p>
              <p>尺寸</p>
            </div>
            <a-tag>SPU</a-tag>
          </a-popover>
        </span>
        <span slot="operation" slot-scope="text, record">
          <!-- 编辑 -->
          <a-button
            type="link"
            size="small"
            @click="showInfoDrawer(record[key])"
          >{{ $t('common.edit') }}</a-button>
          <a-divider type="vertical" />
          <a-button
            type="link"
            size="small"
            @click="$router.push({path: `/main/e-commerce/attribute/${record.id}`})"
          >{{ $t('common.setting') }}</a-button>
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
    <info-drawer ref="infoDrawer" @refresh="getData"></info-drawer>
  </div>
</template>

<script>
import BaseTable from '@/components/mixins/base-table'
import TableColumn from './mixins/table-column'
import KeepAlive from '@/components/mixins/keep-alive'
import InfoDrawer from './drawer/info'
import GlobalData from '../index'
export default {
  name: 'ec_standard_keepalive',
  mixins: [BaseTable, TableColumn, KeepAlive, GlobalData],
  components: { InfoDrawer },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.getMockData()
    },
    // 新增/编辑详情
    showInfoDrawer(id) {
      this.$refs['infoDrawer'].form.resetFields()
      this.$refs['infoDrawer'].visible = true
      this.$refs['infoDrawer'].id = id
    },
    // ----- mock -----
    getMockData() {
      this.loading = true
      this.$http
        .get(this.$api.ECOMMERCE_STANDARD)
        .then(({ data }) => {
          this.loading = false
          this.data = data.content
          this.total = data.totalElements
          this.$message.warning(this.$t('message.using_mock_data'))
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.ant-table .ant-tag {
  cursor: pointer;
  margin: 0;
}
</style>