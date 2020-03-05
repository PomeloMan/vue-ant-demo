<template>
  <div>
    <app-header
      :breadcrumbs="breadcrumbs"
      :searchType="'advanced'"
      :formItem="formItem"
      @onAdvancedSearch="onAdvancedSearch"
    >
      <div slot="action-group">
        <a-button type="link">{{ $t('common.new') }}</a-button>
        <a-divider type="vertical" />
        <template v-if="selectedRowKeys.length !== 0">
          <a-popconfirm
            :title="$t('message.is_confirm_delete')"
            :okText="$t('common.ok')"
            :cancelText="$t('common.cancel')"
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
      </div>
    </app-header>
    <div class="table-content-wrapper">
      <a-table
        :columns="columns"
        :rowKey="record => record.username"
        :rowSelection="{
          columnWidth: 50,
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        :dataSource="data"
        :pagination="false"
        :loading="loading"
        :scroll="{ y: tableScrollY }"
      >
        <!-- 列编辑 -->
        <template slot="email" slot-scope="text, record">
          <editable-cell
            :text="text"
            @change="onCellChange(record.key, 'email', $event)"
          />
        </template>
        <!-- 行编辑 -->
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
              :okText="$t('common.ok')"
              :cancelText="$t('common.cancel')"
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
              :title="$t('message.is_confirm_delete')"
              :okText="$t('common.ok')"
              :cancelText="$t('common.cancel')"
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
          <a-menu-item class="upload-menu-item">
            <a-upload
              ref="aupload"
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
import EditableCell from '@/components/editable-cell.component'

export default {
  name: 'sys_user',
  mixins: [BaseComponent],
  components: {
    EditableCell: EditableCell
  },
  data() {
    return {
      key: 'username',
      formItem: [
        {
          label: this.$i18n.t('common.account'),
          key: 'username',
          type: 'input'
        },
        {
          label: this.$i18n.t('common.nick_name'),
          key: 'displayName',
          type: 'input'
        },
        {
          label: this.$i18n.t('common.role_name'),
          key: 'role',
          type: 'select',
          options: [{ value: 1, label: '管理员' }]
        },
        {
          label: this.$i18n.t('common.email'),
          key: 'email',
          type: 'input'
        },
        {
          label: this.$i18n.t('common.status'),
          key: 'status',
          type: 'radio',
          options: [
            { value: '', label: '全部' },
            { value: '0', label: '初始话' },
            { value: '1', label: '已生效' }
          ]
        }
      ]
    }
  },
  computed: {
    columns: {
      get() {
        return [
          {
            title: this.$i18n.t('common.account'),
            dataIndex: 'username',
            width: 100,
            align: 'center'
          },
          {
            title: this.$i18n.t('common.nick_name'),
            dataIndex: 'displayName',
            width: 150,
            align: 'center',
            scopedSlots: { customRender: 'displayName' }
          },
          {
            title: this.$i18n.t('common.role_name'),
            dataIndex: 'role',
            width: 100,
            align: 'center'
          },
          {
            title: this.$i18n.t('common.email'),
            dataIndex: 'email',
            width: 150,
            align: 'center',
            scopedSlots: { customRender: 'email' }
          },
          {
            title: this.$i18n.t('common.status'),
            dataIndex: 'status',
            width: 100,
            align: 'center'
          },
          {
            title: this.$i18n.t('common.operation'),
            width: 150,
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
    onAdvancedSearch(values) {
      this.page = 1
      this.body = values
      this.getData()
    },
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
