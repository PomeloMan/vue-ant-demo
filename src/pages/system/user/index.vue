<template>
  <div>
    <app-header :breadcrumbs="breadcrumbs" :searchType="'advanced'">
      <div slot="action-group">
        <a-button type="link">{{ $t('common.new') }}</a-button>
        <a-divider type="vertical" />
        <a-button type="link">Link</a-button>
        <a-divider type="vertical" />
      </div>
    </app-header>
    <div class="table-content-wrapper">
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="false"
        :scroll="{ y: tableScrollY }"
      >
      </a-table>
    </div>
    <app-footer
      @onPageChange="onPageChange"
      @onPageSizeChange="onPageSizeChange"
    >
      <div slot="action-group">
        <a-menu mode="horizontal">
          <a-menu-item>Navigation One</a-menu-item>
          <a-dropdown :trigger="['click']" :placement="'topLeft'">
            <li class="ant-menu-item">Navigation Two</li>
            <a-menu slot="overlay">
              <a-menu-item>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://www.alipay.com/"
                  >1st menu item</a
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
import { Table, Divider, Button, Menu, Dropdown } from 'ant-design-vue'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 150
  },
  {
    title: 'Address',
    dataIndex: 'address'
  }
]

const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  })
}

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
    AppHeader: AppHeader,
    AppFooter: AppFooter
  },
  data() {
    return {
      data,
      columns
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped>
</style>
