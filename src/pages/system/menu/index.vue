<template>
  <div>
    <app-header
      :breadcrumbs="breadcrumbs"
      :searchType="'simple'"
      @onSimpleSearch="onSimpleSearch"
    >
      <div slot="action-group">
        <a-button type="link">{{ $t('common.new') }}</a-button>
        <a-divider type="vertical" />
        <a-popconfirm
          :title="$t('common.confirm_delete')"
          :okText="$t('common.confirm_ok')"
          :cancelText="$t('common.confirm_cancel')"
          @confirm="onDeleteConfirmOk()"
        >
          <a-button type="link" :disabled="selectedRowKeys.length === 0">{{
            $t('common.delete')
          }}</a-button>
        </a-popconfirm>
        <a-divider type="vertical" />
      </div>
    </app-header>
    <div class="table-content-wrapper">
      <a-table
        :columns="columns"
        :rowKey="record => record.id"
        :rowSelection="rowSelection"
        :dataSource="data"
        :pagination="false"
        :loading="loading"
        :scroll="{ y: tableScrollY }"
      >
        <template
          v-for="prop in ['name']"
          :slot="prop"
          slot-scope="text, record"
        >
          <a-input
            v-if="record.editable"
            :key="prop"
            size="small"
            style="width: calc(100% - 30px);"
            :value="text"
            @change="e => handlePropChange(e.target.value, record, prop)"
          />
          <span v-else :key="prop" style="word-break: break-all;">{{
            text
          }}</span>
        </template>
        <!-- 操作 -->
        <span slot="operation" slot-scope="text, record">
          <template v-if="record.editable">
            <a-button
              type="link"
              size="small"
              @click="save($api.MENU_SAVE, record)"
              >{{ $t('common.save') }}</a-button
            >
            <a-divider type="vertical" />
            <a-popconfirm
              :title="$t('common.confirm_save_cancel')"
              :okText="$t('common.confirm_ok')"
              :cancelText="$t('common.confirm_cancel')"
              @confirm="editCancel(record)"
            >
              <a-button type="link" size="small">{{
                $t('common.cancel')
              }}</a-button>
            </a-popconfirm>
          </template>
          <template v-else>
            <a-button type="link" size="small" @click="edit(record)">{{
              $t('common.edit')
            }}</a-button>
            <a-divider type="vertical" />
            <a-popconfirm
              :title="$t('common.confirm_delete')"
              :okText="$t('common.confirm_ok')"
              :cancelText="$t('common.confirm_cancel')"
              @confirm="onDeleteConfirmOk(record.id)"
            >
              <a-button type="link" size="small">{{
                $t('common.delete')
              }}</a-button>
            </a-popconfirm>
          </template>
        </span>
      </a-table>
    </div>
    <app-footer
      :total="total"
      @onPageChange="onPageChange"
      @onPageSizeChange="onPageSizeChange"
    >
      <div slot="action-group">
        <a-menu mode="horizontal">
          <a-menu-item>
            <a-upload
              name="file"
              :multiple="false"
              :showUploadList="false"
              :withCredentials="true"
              :action="$http.baseURL + $api.MENU_UPLOAD"
              @change="uploadChange"
              >{{ $t('common.import') }}</a-upload
            >
          </a-menu-item>
          <a-dropdown :trigger="['click']" :placement="'topLeft'">
            <li class="ant-menu-item">{{ $t('common.export') }}</li>
            <a-menu slot="overlay">
              <a-menu-item>
                <a target="_blank" :href="$http.baseURL + $api.MENU_TEMPLATE">{{
                  $t('common.export_template')
                }}</a>
              </a-menu-item>
              <a-menu-item>
                <a
                  href="javascript:void(0)"
                  @click="download($api.MENU_DOWNLOAD, selectedRowKeys)"
                  >{{ $t('common.export_data') }}</a
                >
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-menu>
      </div>
    </app-footer>
  </div>
</template>

<script>
import BaseComponent from '@/components/base.component'
import AppHeader from '@/components/header.component'
import AppFooter from '@/components/footer.component'
import {
  Table,
  Divider,
  Button,
  Menu,
  Dropdown,
  Popconfirm,
  Upload,
  Input
} from 'ant-design-vue'
import { date } from '@/pipes'

const rowSelection = $this => {
  return {
    onChange: (selectedRowKeys, selectedRows) => {
      $this.selectedRowKeys = selectedRowKeys
      $this.selectedRows = selectedRows
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows)
    }
  }
}

export default {
  name: 'sys_menu',
  extends: BaseComponent,
  components: {
    ATable: Table,
    ADivider: Divider,
    AButton: Button,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    ADropdown: Dropdown,
    APopconfirm: Popconfirm,
    AUpload: Upload,
    AInput: Input,
    AppHeader: AppHeader,
    AppFooter: AppFooter
  },
  data() {
    return {
      rowSelection: rowSelection(this)
    }
  },
  computed: {
    columns: {
      get() {
        const $this = this
        return [
          {
            title: this.$i18n.t('common.table.dictCode'),
            dataIndex: 'name',
            width: '25%',
            scopedSlots: { customRender: 'name' }
          },
          {
            title: this.$i18n.t('menu.table.name'),
            width: '15%',
            align: 'center',
            customRender: function(text, record) {
              return $this.mapOfDict[record.name]
            }
          },
          {
            title: this.$i18n.t('common.table.status'),
            dataIndex: 'status',
            width: '10%',
            align: 'center'
          },
          {
            title: this.$i18n.t('common.table.modifier'),
            dataIndex: 'modifier',
            width: '10%',
            align: 'center'
          },
          {
            title: this.$i18n.t('common.table.modifyDate'),
            dataIndex: 'modifiedDate',
            width: '15%',
            align: 'center',
            customRender: value => {
              return date(value)
            }
          },
          {
            title: this.$i18n.t('common.table.operation'),
            dataIndex: 'operation',
            width: '20%',
            align: 'center',
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    getData() {
      this.loading = true
      this.$http
        .get(this.$api.MENU_LIST)
        .then(({ data }) => {
          this.loading = false
          this.data = data
          this.cacheData = this.data.map(item => ({ ...item }))
          this.resize()
        })
        .catch(err => {
          this.loading = false
          console.error(err)
        })
    },
    // 删除
    onDeleteConfirmOk(id) {
      let ids = this.selectedRowKeys
      if (id) {
        ids = [id]
      }
      this.delete(this.$api.MENU_DELETE, ids)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>