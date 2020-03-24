<template>
  <div>
    <app-header
      type="bordered"
      :breadcrumbs="$route.meta.breadcrumbs || []"
      :searchType="'simple'"
      @onSimpleSearch="onSearch"
    >
      <div slot="action-group">
        <a-button type="link" @click="showNewDrawer">{{ $t('common.new') }}</a-button>
      </div>
    </app-header>
    <div class="scroll-wrapper no-footer" style="padding: 0;">
      <a-spin :spinning="loadingData" wrapperClassName="grid-spin">
        <div id="scrollContainer" style="padding: 16px 16px 24px;">
          <a-row :gutter="24" style="height: calc(100% + 1px);">
            <a-col :span="10" :key="item.id" v-for="item in data">
              <a-card
                class="project-card"
                :bordered="false"
                :bodyStyle="{
                padding: '20px',
                height: '100%',
                display: 'flex'
              }"
              >
                <div class="project-logo">
                  <!-- <img :src="item.imageUrl" v-if="item.imageUrl" /> -->
                  <a-avatar
                    shape="square"
                    :size="48"
                    :src="item.imageUrl"
                    :style="{
                    backgroundColor: '#00a2ae',
                    verticalAlign: 'middle'
                  }"
                  >{{ item.name.substring(0, 1) }}</a-avatar>
                </div>
                <div class="project-details">
                  <div class="project-name fw-600 fs-16">{{ item.name }}</div>
                  <div class="project-description">{{ item.description }}</div>
                  <div class="project-links">
                    <a-tooltip :title="$t('common.overview')">
                      <a href="javascript:;">
                        <a-icon type="project" />
                      </a>
                    </a-tooltip>
                  </div>
                </div>
              </a-card>
            </a-col>
          </a-row>
          <a-back-top :target="scrollWrapper" :visibilityHeight="100"></a-back-top>
        </div>
      </a-spin>
    </div>
    <add-drawer ref="addDrawer"></add-drawer>
  </div>
</template>

<script>
import PerfectScrollbar from '@/components/plugins/perfect-scrollbar.vue'
import AddDrawer from './drawer/add.vue'
import _ from 'lodash'
export default {
  components: { AddDrawer },
  mixins: [PerfectScrollbar],
  data() {
    return {
      scrollWrapper: () => document.getElementById('scrollContainer'),
      data: [], // 项目列表
      page: 1,
      pageSize: 10,
      loadingData: false, // 加载列表
      searchKeyword: ''
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.initPerfectScrollbar()
  },
  methods: {
    onSearch: _.debounce(
      function(values) {
        this.page = 1
        this.data = []
        this.searchKeyword = values
        this.$nextTick(() => {
          this.perfectScrollbar.update() // 更新滚动条
          this.scrollContainer.scrollTop = 0
          this.getData()
        })
      },
      500,
      { leading: true, trailing: false } // leading 延迟前执行，trailing 延迟后执行),
    ),
    getData: _.debounce(
      function() {
        this.loadingData = true
        this.$http
          .get(this.$api.PROJECT_PAGE)
          .then(({ data }) => {
            this.loadingData = false
            this.data = [...this.data, ...data]
          })
          .catch(err => {
            this.loadingData = false
            this.$message.error(err.message)
          })
      },
      500,
      { leading: true, trailing: false } // leading 延迟前执行，trailing 延迟后执行
    ),
    showAddDrawer() {
      this.$refs['addDrawer'].form.resetFields()
      this.$refs['addDrawer'].visible = true
    },
    onScrollbarYReachEnd() {
      this.page++
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
.project-card {
  height: 200px;
  margin-bottom: 24px;
  .project-logo {
    width: 48px;
    height: 48px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .project-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    overflow: hidden;
    position: relative;

    .project-name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 8px;
    }
    .project-description {
      line-height: 20px;
      max-height: 80px;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
    .project-links {
      position: absolute;
      bottom: 0;
      right: 0;
      .anticon {
        font-size: 24px;
        cursor: pointer;
      }
    }
  }
}
</style>