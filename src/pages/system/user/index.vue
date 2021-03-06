<template>
  <div>
    <app-header
      :breadcrumbs="breadcrumbs"
      :searchType="'advanced'"
      :formItems="formItems"
      @onAdvancedSearch="onAdvancedSearch"
    >
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
        size="middle"
      >
        <!-- 列编辑 -->
        <template v-for="prop in editableColumns" :slot="prop.slot" slot-scope="text, record">
          <editable-cell
            :class="prop.align"
            :key="prop.slot"
            :text="text"
            @change="onCellChange($api.SYS_USER, record[key], prop.slot, $event)"
          />
        </template>
        <template slot="avatar" slot-scope="text, record">
          <a-tooltip :title="$t('common.upload_avatar')">
            <a-avatar size="large" :src="text" icon="user" @click="showAvatarModal(record)"></a-avatar>
          </a-tooltip>
        </template>
        <!-- 角色显示 -->
        <span slot="role" slot-scope="text, record">
          <a-tag
            :key="item.name"
            v-for="item in record.roles"
            style="margin-bottom: 4px;"
          >{{item.displayName}}</a-tag>
        </span>
        <!-- 操作 -->
        <span slot="operation" slot-scope="text, record">
          <a-button
            type="link"
            size="small"
            @click="showInfoDrawer(record[key])"
          >{{ $t('common.edit') }}</a-button>
          <a-divider type="vertical" />
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
    >
      <div slot="action-group">
        <a-menu mode="horizontal">
          <!-- 导入 -->
          <a-menu-item class="upload-menu-item">
            <a-upload
              ref="aupload"
              name="file"
              :multiple="false"
              :showUploadList="false"
              :withCredentials="true"
              :action="$http.baseURL + $api.MENU_UPLOAD"
              @change="uploadChange"
            >{{ $t('common.import') }}</a-upload>
          </a-menu-item>
          <!-- 导出 -->
          <a-dropdown :trigger="['click']" :placement="'topLeft'">
            <li class="ant-menu-item">{{ $t('common.export') }}</li>
            <a-menu slot="overlay">
              <a-menu-item>
                <a
                  target="_blank"
                  :href="$http.baseURL + $api.MENU_TEMPLATE"
                >{{ $t('common.export_template') }}</a>
              </a-menu-item>
              <a-menu-item>
                <a
                  href="javascript:void(0)"
                  @click="download($api.MENU_DOWNLOAD, selectedRowKeys)"
                >{{ $t('common.export_data') }}</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-menu>
      </div>
    </app-footer>
    <info-drawer ref="infoDrawer" @refresh="getData"></info-drawer>
    <avatar-modal ref="avatarModal" @refresh="getData"></avatar-modal>
  </div>
</template>

<script>
import BaseTable from '@/components/mixins/base-table'
import EditableCell from '@/components/plugins/editable-cell'
import KeepAlive from '@/components/mixins/keep-alive'
import InfoDrawer from './drawer/info'
import AvatarModal from './modal/avatar'
import FormItem from './mixins/form-item'
import TableColumn from './mixins/table-column'
export default {
  name: 'sys_user_keepalive',
  mixins: [BaseTable, FormItem, TableColumn, KeepAlive],
  components: {
    EditableCell,
    InfoDrawer,
    AvatarModal
  },
  data() {
    return {
      key: 'username'
    }
  },
  created() {
    // 进入组件时由于组件名带有 keepalive（详见KeepAlive.beforeRouteEnter），将组件加入到缓存中，第一次执行 created()
    // 在未销毁的状态下第二次及之后执行 activated()；created()不会与 activated()同时执行
    this.getData()
  },
  activated() {
    this.getData()
  },
  methods: {
    onAdvancedSearch(values) {
      this.page = 1
      this.body = values
      this.getData()
    },
    getData() {
      this.loading = true
      this.$http
        .post(this.$api.SYS_USER_PAGE, {
          page: this.page - 1,
          size: this.pageSize,
          object: { ...this.body }
        })
        .then(({ data }) => {
          this.loading = false
          this.data = data.content
          this.total = data.totalElements

          this.cacheData = this.data.map(item => ({ ...item }))
          this.$forceUpdate()
        })
        .catch(() => {
          this.loading = false
          this.getMockData()
        })
    },
    showInfoDrawer(id) {
      this.$refs['infoDrawer'].form.resetFields()
      this.$refs['infoDrawer'].visible = true
      this.$refs['infoDrawer'].isnew = true
      if (id) {
        this.$refs['infoDrawer'].isnew = false
        this.$refs['infoDrawer'].loading = true
        this.$http
          .get(`${this.$api.SYS_USER}/${id}`)
          .then(({ data }) => {
            this.$refs['infoDrawer'].loading = false
            const formData = {
              username: data.username,
              displayName: data.displayName,
              email: data.email,
              roles: data.roles.map(item => item.name)
            }
            this.$refs['infoDrawer'].form.setFieldsValue(formData)
          })
          .catch(() => {
            this.$refs['infoDrawer'].loading = false
          })
      }
    },
    showAvatarModal(record) {
      this.$refs['avatarModal'].visible = true
      this.$refs['avatarModal'].user = record
      this.$refs['avatarModal'].avatar = record.avatar
    },
    // ----- delete -----
    getMockData() {
      this.$http.get(this.$api.USER_PAGE).then(({ data }) => {
        this.data = data.content
        this.total = data.totalElements
        this.$message.warning(this.$t('message.using_mock_data'))
      })
    }
  }
}
</script>

<style scoped>
.ant-avatar {
  cursor: pointer;
}
</style>
