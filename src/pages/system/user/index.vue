<template>
  <div>
    <app-header :breadcrumbs="breadcrumbs" :searchType="'advanced'">
      <div slot="action-group">
        <a-button type="link">{{ $t('common.new') }}</a-button>
        <a-divider type="vertical" />
        <template v-if="selectedRowKeys.length !== 0">
          <a-popconfirm
            :title="$t('common.confirm_delete')"
            :okText="$t('common.confirm_ok')"
            :cancelText="$t('common.confirm_cancel')"
            @confirm="onDeleteConfirmOk()"
          >
            <a-button type="link">{{ $t('common.delete') }}</a-button>
          </a-popconfirm>
        </template>
        <template v-else>
          <a-button type="link" :disabled="selectedRowKeys.length === 0">{{
            $t('common.delete')
          }}</a-button>
        </template>
        <a-divider type="vertical" />
      </div>
    </app-header>
    <div class="table-content-wrapper">
      <a-table
        :columns="columns"
        :rowKey="record => record.username"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        :dataSource="data"
        :pagination="false"
        :loading="loading"
        :scroll="{ y: tableScrollY }"
      >
        <template
          v-for="prop in ['displayName']"
          :slot="prop"
          slot-scope="text, record"
        >
          <a-input
            v-if="record.editable"
            :key="prop"
            size="small"
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
      :current="page"
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
import AppHeader from '@/components/header'
import AppFooter from '@/components/footer'
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

const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: '15%',
    align: 'center'
  },
  {
    title: '昵称',
    dataIndex: 'displayName',
    width: '15%',
    align: 'center',
    scopedSlots: { customRender: 'displayName' }
  },
  {
    title: '角色',
    dataIndex: 'role',
    width: '15%',
    align: 'center'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: '15%',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: '10%',
    align: 'center'
  },
  {
    title: '操作',
    width: '20%',
    align: 'center',
    scopedSlots: { customRender: 'operation' }
  }
]

export default {
  name: 'user',
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
      key: 'username',
      columns
    }
  },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    getData() {
      this.loading = true
      if (this.$env === 'mock') {
        this.$http
          .get(this.$api.USER_PAGE)
          .then(({ data }) => {
            this.loading = false
            this.data = data
            this.cacheData = this.data.map(item => ({ ...item }))
          })
          .catch(() => {
            this.loading = false
          })
      } else {
        this.$http
          .post(this.$api.USER_PAGE, {
            page: this.page - 1,
            size: this.pageSize,
            ...this.body
          })
          .then(({ data }) => {
            this.loading = false
            this.data = data
          })
          .catch(() => {
            this.loading = false
          })
      }
    }
  }
}
</script>

<style scoped>
</style>
