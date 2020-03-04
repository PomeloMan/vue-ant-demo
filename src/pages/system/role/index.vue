<template>
  <div>
    <app-header :breadcrumbs="breadcrumbs" :searchType="'advanced'">
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
        :rowKey="record => record.id"
        :rowSelection="{
          width: 50,
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        :dataSource="data"
        :pagination="false"
        :loading="loading"
        :scroll="{ y: tableScrollY }"
      >
        <!-- 名称（可编辑） -->
        <template
          v-for="prop in ['name']"
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
        <!-- 时间 -->
        <template slot="date" slot-scope="text">
          <span>{{ text | date }}</span>
        </template>
        <!-- 操作 -->
        <span slot="operation" slot-scope="text, record">
          <template v-if="record.editable">
            <!-- 保存编辑 -->
            <a-button
              type="link"
              size="small"
              @click="save($api.MENU_SAVE, record)"
              >{{ $t('common.save') }}</a-button
            >
            <a-divider type="vertical" />
            <!-- 取消编辑 -->
            <a-popconfirm
              :title="$t('message.is_confirm_cancel')"
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
            <!-- 编辑 -->
            <a-button type="link" size="small" @click="edit(record)">{{
              $t('common.edit')
            }}</a-button>
            <a-divider type="vertical" />
            <!-- 删除 -->
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

export default {
  name: 'sys_role',
  mixins: [BaseComponent],
  components: {},
  data() {
    return {}
  },
  computed: {
    columns: {
      // 表头国际化，切换时需要立刻更新组件渲染，所以需要放进 computed 函数
      get() {
        return [
          {
            title: this.$i18n.t('common.number'),
            width: 50,
            align: 'center',
            customRender: function(text, record, index) {
              return index + 1
            }
          },
          {
            title: this.$i18n.t('common.role_name'),
            dataIndex: 'name',
            width: 150,
            align: 'center',
            scopedSlots: { customRender: 'name' }
          },
          {
            title: this.$i18n.t('common.status'),
            dataIndex: 'status',
            width: 100,
            align: 'center'
          },
          {
            title: this.$i18n.t('common.modifier'),
            dataIndex: 'modifier',
            width: 100,
            align: 'center'
          },
          {
            title: this.$i18n.t('common.modify_date'),
            dataIndex: 'modifyDate',
            width: 150,
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
    getData() {
      this.loading = true
      let method = 'post'
      if (this.$env === 'mock') {
        method = 'get'
      }
      this.$http({
        method: method,
        url: this.$api.ROLE_PAGE,
        data: {
          page: this.page - 1,
          size: this.pageSize,
          ...this.body
        }
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
</script>

<style lang="scss" scoped>
</style>