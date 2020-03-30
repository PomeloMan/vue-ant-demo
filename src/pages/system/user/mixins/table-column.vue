<script>
export default {
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
            dataIndex: 'roles',
            width: 100,
            align: 'center',
            scopedSlots: { customRender: 'role' }
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
            dataIndex: 'statusDesc',
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
  }
}
</script>