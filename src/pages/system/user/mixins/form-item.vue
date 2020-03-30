<script>
export default {
  computed: {
    formItem: {
      get() {
        return [
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
    }
  }
}
</script>