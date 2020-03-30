<template>
  <div>
    <app-header :breadcrumbs="breadcrumbs" :searchType="'simple'" @onSimpleSearch="onSimpleSearch">
      <div slot="action-group">
        <a-button type="link" @click="showInfoDrawer">{{ $t('common.new') }}</a-button>
        <a-divider type="vertical" />
        <template v-if="selectedRowKeys.length !== 0">
          <a-popconfirm
            :title="$t('message.is_confirm_delete')"
            :okText="$t('common.ok')"
            :cancelText="$t('common.cancel')"
            @confirm="onDeleteConfirmOk($api.SYS_MENU)"
          >
            <a-button type="link" :disabled="deleting">
              <a-icon type="loading" v-if="deleting" />
              {{ $t('common.delete') }}
            </a-button>
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
        :rowSelection="rowSelection"
        :dataSource="data"
        :pagination="false"
        :loading="loading"
        :scroll="{ y: tableScrollY }"
      >
        <template v-for="prop in ['displayName', 'icon']" :slot="prop" slot-scope="text, record">
          <a-input
            v-if="record.editable"
            :key="prop"
            style="width: calc(100%);"
            :value="text"
            @change="e => handlePropChange(e.target.value, record, prop)"
          />
          <span v-else :key="prop" style="word-break: break-all;">{{ text }}</span>
        </template>
        <!-- 操作 -->
        <span slot="operation" slot-scope="text, record">
          <!-- 编辑状态 -->
          <template v-if="record.editable">
            <!-- 保存编辑 -->
            <a-button
              type="link"
              size="small"
              @click="save($api.SYS_MENU, record)"
            >{{ $t('common.save') }}</a-button>
            <a-divider type="vertical" />
            <!-- 取消编辑 -->
            <a-popconfirm
              :title="$t('common.confirm_save_cancel')"
              :okText="$t('common.ok')"
              :cancelText="$t('common.cancel')"
              @confirm="editCancel(record)"
            >
              <a-button type="link" size="small">{{ $t('common.cancel') }}</a-button>
            </a-popconfirm>
          </template>
          <!-- 非编辑状态 -->
          <template v-else>
            <!-- 开启编辑 -->
            <a-button type="link" size="small" @click="edit(record)">{{ $t('common.edit') }}</a-button>
            <a-divider type="vertical" />
            <!-- 删除 -->
            <a-popconfirm
              :title="$t('message.is_confirm_delete')"
              :okText="$t('common.ok')"
              :cancelText="$t('common.cancel')"
              @confirm="onDeleteConfirmOk($api.SYS_MENU, record)"
            >
              <a-button type="link" size="small" :disabled="record.deleting">
                <a-icon type="loading" v-if="record.deleting" />
                {{ $t('common.delete') }}
              </a-button>
            </a-popconfirm>
          </template>
        </span>
      </a-table>
    </div>
    <app-footer :total="total" :showPagination="false">
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
            >{{ $t('common.import') }}</a-upload>
          </a-menu-item>
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
    <info-drawer ref="infoDrawer" :menus="menus" @refresh="getData"></info-drawer>
  </div>
</template>

<script>
import BaseComponent from '@/components/base.component'
import InfoDrawer from './drawer/info'
import { mapState } from 'vuex'
import { date } from '@/pipes'
import { buildTree } from '@/utils'

export default {
  name: 'sys_menu',
  mixins: [BaseComponent],
  components: { InfoDrawer },
  data() {
    return {
      key: 'name',
      menus: [] // 菜单集合（非树形结构数据）
    }
  },
  computed: {
    ...mapState({
      mapOfDict: state => state.common.mapOfDict
    }),
    columns: {
      get() {
        return [
          {
            title: this.$i18n.t('common.dict_code'),
            dataIndex: 'name',
            width: 150
          },
          {
            title: this.$i18n.t('common.menu_name'),
            dataIndex: 'displayName',
            width: 150,
            scopedSlots: { customRender: 'displayName' }
          },
          {
            title: this.$i18n.t('common.menu_icon'),
            dataIndex: 'icon',
            width: 100,
            scopedSlots: { customRender: 'icon' }
          },
          {
            title: this.$i18n.t('common.status'),
            dataIndex: 'statusDesc',
            width: 100,
            align: 'center'
          },
          {
            title: this.$i18n.t('common.modifier'),
            dataIndex: 'modifier',
            width: 150,
            align: 'center'
          },
          {
            title: this.$i18n.t('common.modify_date'),
            dataIndex: 'modifiedDate',
            width: 200,
            align: 'center',
            customRender: value => {
              return date(value)
            }
          },
          {
            title: this.$i18n.t('common.operation'),
            dataIndex: 'operation',
            width: 200,
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
    // 查询
    getData() {
      this.loading = true
      this.$http
        .post(this.$api.SYS_MENU_LIST, {
          levels: [1, 2, 3] // 只查询菜单权限
        })
        .then(({ data }) => {
          this.loading = false
          this.menus = data.map(item => ({ ...item }))
          this.total = data.length
          // 将数据结构转成树形结构
          this.data = buildTree([...data], {
            key: 'name',
            parentKey: 'parentName'
          })
          this.cacheData = this.data.map(item => ({ ...item }))
          this.resize()
        })
        .catch(err => {
          this.loading = false
          console.error(err)
          this.getMockData()
        })
    },
    showInfoDrawer() {
      this.$refs['infoDrawer'].form.resetFields()
      this.$refs['infoDrawer'].visible = true
    },
    // ----- delete -----
    getMockData() {
      this.$http.get(this.$api.MENU_LIST).then(({ data }) => {
        this.data = data
        this.total = this.data.length
        this.cacheData = this.data.map(item => ({ ...item }))
        this.resize()
        this.$message.warning(this.$i18n.t('message.using_mock_data'))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>