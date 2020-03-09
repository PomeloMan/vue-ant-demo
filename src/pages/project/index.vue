<template>
  <div>
    <app-header
      type="bordered"
      :breadcrumbs="$route.meta.breadcrumbs || []"
      :searchType="'simple'"
      @onSimpleSearch="onSearch"
    >
      <div slot="action-group">
        <a-button type="link" @click="showNewDrawer">{{
          $t('common.new')
        }}</a-button>
      </div>
    </app-header>
    <div id="scrollContainer" class="scroll-wrapper no-footer">
      <a-spin :spinning="loadingData" wrapperClassName="grid-spin">
        <a-row :gutter="24" style="min-height: 200px;">
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
                  >{{ item.name.substring(0, 1) }}</a-avatar
                >
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
      </a-spin>
      <a-back-top :target="scrollWrapper" :visibilityHeight="100"></a-back-top>
    </div>
    <new-drawer ref="newDrawer"></new-drawer>
  </div>
</template>

<script>
import PerfectScrollbar from '@/components/perfect-scrollbar.component.vue'
import NewDrawer from './drawer/new.drawer.vue'
import _ from 'lodash'
export default {
  components: { NewDrawer },
  mixins: [PerfectScrollbar],
  data() {
    return {
      scrollWrapper: () => document.getElementById('scrollContainer'),
      data: [], // 项目列表
      page: 1,
      pageSize: 10,
      loadingData: false // 加载列表
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.initPerfectScrollbar()
  },
  methods: {
    onSearch(values) {
      console.log(values)
      this.page = 1
      this.data = []
      this.getData()
    },
    getData: _.debounce(function() {
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
    }, 500),
    showNewDrawer() {
      this.$refs['newDrawer'].form.resetFields()
      this.$refs['newDrawer'].visible = true
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