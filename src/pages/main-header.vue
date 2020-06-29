<template>
  <div class="main-header">
    <div class="left-wrapper">
      <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="collapse" />
    </div>
    <div class="right-wrapper">
      <li class="ant-menu-item">
        <!-- <lottie-web></lottie-web> -->
      </li>

      <!-- 聊天/提醒/待办 -->
      <!-- 聊天 -->
      <a-dropdown :trigger="['click']">
        <li class="ant-menu-item ant-dropdown-link" href="#" @click="loadMessages">
          <a-badge
            count="20"
            :number-style="{
              height: '16px',
              lineHeight: '16px',
              padding: '0 6px',
              backgroundColor: '#a0d911'
            }"
          >
            <a-icon type="message" />
          </a-badge>
        </li>
        <a-menu slot="overlay" class="top-messages">
          <!-- 加载聊天项 -->
          <a-menu-item class="center-x" v-if="loadingMessages" disabled>
            <a-spin :spinning="loadingMessages"></a-spin>
          </a-menu-item>
          <!-- 最新5项聊天项 -->
          <a-menu-item
            v-else
            class="top-message ant-dropdown-menu-item"
            :key="item.id"
            v-for="item in messages"
          >
            <a-avatar :src="item.avatar" />
            <div class="fs-13 top-message-detail">
              <p>
                <span :title="item.from">{{item.from}}</span>
                <span>{{item.createdDate | date('MM-DD HH:mm')}}</span>
              </p>
              <p :title="item.content">{{item.content}}</p>
            </div>
          </a-menu-item>
          <a-menu-divider />
          <!-- 查看全部未读消息 -->
          <a-menu-item class="center-x fs-13">{{ $t('common.view_all') }}</a-menu-item>
        </a-menu>
      </a-dropdown>
      <!-- 提醒 -->
      <a-dropdown :trigger="['click']">
        <li class="ant-menu-item ant-dropdown-link" href="#" @click="loadNotifications">
          <a-badge
            count="10"
            :number-style="{
              height: '16px',
              lineHeight: '16px',
              padding: '0 6px',
              backgroundColor: '#faad14'
            }"
          >
            <a-icon type="bell" />
          </a-badge>
        </li>
        <a-menu slot="overlay" class="top-notifications">
          <!-- 加载提醒项 -->
          <a-menu-item class="center-x" v-if="loadingNotifications" disabled>
            <a-spin :spinning="loadingNotifications"></a-spin>
          </a-menu-item>
          <!-- 最新5项提醒项 -->
          <a-menu-item
            v-else
            class="top-notification ant-dropdown-menu-item"
            :key="item.id"
            v-for="item in notifications"
          >
            <a-icon
              :type="item.type | find(notificationTypes, { keyStr: 'value', returnKeyStr: 'icon'})"
            />
            <span class="fs-13">{{ item.content }}</span>
          </a-menu-item>
          <a-menu-divider />
          <!-- 查看全部 -->
          <a-menu-item class="center-x fs-13">{{ $t('common.view_all') }}</a-menu-item>
        </a-menu>
      </a-dropdown>
      <!-- 待办 -->
      <a-dropdown :trigger="['click']">
        <li class="ant-menu-item ant-dropdown-link" href="#" @click="loadTodos">
          <a-badge
            count="1125"
            :number-style="{
              height: '16px',
              lineHeight: '16px',
              padding: '0 6px',
              backgroundColor: '#fa541c'
            }"
          >
            <a-icon type="flag" />
          </a-badge>
        </li>
        <a-menu slot="overlay" class="top-todos">
          <!-- 加载待办项 -->
          <a-menu-item v-if="loadingTodos" disabled style="text-align: center;">
            <a-spin :spinning="loadingTodos"></a-spin>
          </a-menu-item>
          <!-- 最新5项待办项 -->
          <a-menu-item
            v-else
            class="top-todo ant-dropdown-menu-item"
            :key="item.id"
            v-for="item in todos"
          >
            <p>
              <span class="fs-13">{{item.name}}</span>
              <span class="fs-12">{{item.percent}}%</span>
            </p>
            <!-- 进度条颜色按优先级分色 -->
            <a-progress
              :stroke-color="item.priority | todoStatusOrPriorityColor(todoPriorities)"
              :percent="item.percent"
              :show-info="false"
              size="small"
            />
          </a-menu-item>
          <a-menu-divider />
          <!-- 查看全部 -->
          <a-menu-item class="center-x fs-13">{{ $t('common.view_all') }}</a-menu-item>
        </a-menu>
      </a-dropdown>

      <!-- 语言 -->
      <a-dropdown class :trigger="['click']">
        <li class="ant-menu-item ant-dropdown-link" href="#">
          <span>{{$t('common.locale')}}</span>
          <a-icon type="down" />
        </li>
        <a-menu slot="overlay" class="i18n-menu">
          <a-menu-item :key="item.code" @click="i18n(item.locale)" v-for="item in locales">
            <svg-icon :icon-class="`locale_${item.code}`" class="icon"></svg-icon>
            <span>{{item.name}}</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>

      <!-- 账号 -->
      <a-dropdown class :trigger="['click']">
        <li class="user-info ant-menu-item ant-dropdown-link" href="javascript:;">
          <a-avatar class="user-avatar" icon="user" />
          <span>Admin(超级管理员)</span>
          <a-icon type="down" style="margin:0" />
        </li>
        <a-menu slot="overlay">
          <a-menu-item @click="$router.push({name:'personal'})">{{$t('common.personal_center')}}</a-menu-item>
          <a-menu-item @click="logout()">{{$t('common.logout')}}</a-menu-item>
        </a-menu>
      </a-dropdown>

      <!-- 设置 -->
      <li class="ant-menu-item ant-dropdown-link" href="#" @click="settingDrawerVisible = !settingDrawerVisible">
        <a-icon type="setting" style="margin:0" />
      </li>
    </div>
  </div>
</template>

<script>
import Store from '@/components/mixins/store.js'
import { Menu, Dropdown } from 'ant-design-vue'
import i18n from '@/constants/i18n'
import { mapState } from 'vuex'
import { find } from '@/pipes'

export default {
  name: 'main-header',
  mixins: [Store],
  components: {
    AMenu: Menu,
    AMenuItem: Menu.Item,
    ADropdown: Dropdown
  },
  data() {
    return {
      locales: i18n.locales,
      loadingMessages: false, // 加载消息
      messages: [], // 前5条未读消息
      loadingNotifications: false, // 加载通知
      notifications: [], // 前5条未读通知
      loadingTodos: false, // 加载待办事项
      todos: [] // 前5条新增待办/任务
    }
  },
  computed: {
    ...mapState({
      todoStatus: state => state.ptodo.status,
      todoPriorities: state => state.ptodo.priorities,
      notificationTypes: state => state.pnotification.types
    })
  },
  filters: {
    // 根据状态或优先级获取相应颜色
    todoStatusOrPriorityColor(value, options) {
      const colors = find(value, options, {
        keyStr: 'value',
        returnKeyStr: 'colors'
      })
      if (colors) {
        return {
          '0%': colors[0],
          '100%': colors[1]
        }
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 左边菜单栏收缩
    collapse() {
      this.collapsed = !this.collapsed

      window.less.modifyVars({
        '@primary-color': '#820014'
      })
    },
    // 国际化
    i18n(locale) {
      this.locale = locale // Ant组件国际化
      this.$moment.locale(locale.locale) // 时间组件国际化
      this.$i18n.locale = locale.locale // 国际化
    },
    // 登出
    logout() {
      localStorage.removeItem('oauth2AccessToken')
      localStorage.removeItem('user')
      this.$router.push('/login')
    },
    // 获取消息列表
    loadMessages() {
      this.loadingMessages = true
      this.loadMessagesMockData()
    },
    // 获取未读通知
    loadNotifications() {
      this.loadingNotifications = true
      this.loadNotificationsMockData()
    },
    // 获取待办事项
    loadTodos() {
      this.loadingTodos = true
      this.loadTodosMockData()
    },

    /// ---------- delete
    loadMessagesMockData() {
      this.loadingMessages = true
      this.$http
        .get(this.$api.PERSONAL_MESSAGES)
        .then(({ data }) => {
          this.loadingMessages = false
          this.messages = data
        })
        .catch(() => {
          this.loadingMessages = false
        })
    },
    loadNotificationsMockData() {
      this.loadingNotifications = true
      this.$http
        .get(this.$api.PERSONAL_NOTIFICATIONS)
        .then(({ data }) => {
          this.loadingNotifications = false
          this.notifications = data
        })
        .catch(() => {
          this.loadingNotifications = false
        })
    },
    loadTodosMockData() {
      this.loadingTodos = true
      this.$http
        .get(this.$api.PERSONAL_TASKS)
        .then(({ data }) => {
          this.loadingTodos = false
          this.todos = data
        })
        .catch(() => {
          this.loadingTodos = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .right-wrapper {
    padding: 0 24px;
    display: flex;
    align-items: center;
  }
  .ant-menu-item {
    padding: 0 10px;
  }
}
.trigger {
  font-size: 18px;
  line-height: inherit;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #1890ff;
  }
}
.user-info {
  display: flex;
  align-items: center;
  .user-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }
}
.i18n-menu .icon {
  margin-right: 8px;
}
// 未读消息
.top-messages .top-message {
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .ant-avatar {
    margin-right: 8px;
  }
  > .top-message-detail {
    flex: 1;
    // 发送人消息及日期样式
    > p:first-child {
      display: flex;
      justify-content: space-between;
      width: 180px;
      > span:first-child {
        width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    // 消息内容样式
    > p:last-child {
      width: 180px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
// 前5项通知
.top-notifications .top-notification {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
// 前5项待办/任务
.top-todos .top-todo {
  > p:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > span:first-child {
      width: 160px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .ant-progress {
    width: 200px;
  }
}
</style>
