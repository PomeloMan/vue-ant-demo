<template>
  <div class="app-footer">
    <slot name="action-group">
      <div></div>
    </slot>
    <template v-if="showPagination">
      <a-pagination
        size="small"
        @change="onPageChange"
        @showSizeChange="onPageSizeChange"
        :showTotal="showTotal"
        :current="current"
        :total="total"
        showSizeChanger
        showQuickJumper
      />
    </template>
    <template v-else>
      <slot name="pagination">
        <span style="padding: 0 20px;">{{ $t('common.total_number', { num: total }) }}</span>
      </slot>
    </template>
  </div>
</template>

<script>
import { Pagination } from 'ant-design-vue'
export default {
  name: 'app-footer',
  components: {
    APagination: Pagination
  },
  props: {
    total: Number,
    current: Number,
    showPagination: {
      type: Boolean,
      default: true
    },
    showSizeChanger: Boolean,
    showQuickJumper: Boolean,
    pageSizeOptions: {
      type: Array,
      default: function() {
        return ['10', '25', '50', '100']
      }
    }
  },
  methods: {
    onPageChange: function(page, pageSize) {
      this.$emit('onPageChange', page, pageSize)
    },
    onPageSizeChange: function(current, size) {
      this.$emit('onPageSizeChange', current, size)
    },
    showTotal(total, range) {
      return this.$t('common.page_show_total', {
        from: range[0],
        to: range[1],
        total: total
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-footer {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-top: 1px solid #e8e8e8;
  background-color: white;
  position: absolute;
  bottom: 0;
  width: 100%;
  // box-shadow: 0 -2px 4px rgba($color: #000000, $alpha: 0.2);
}
</style>
