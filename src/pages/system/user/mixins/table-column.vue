<script>
export default {
  data() {
    return {
      editableColumns: [
        {
          slot: 'displayName',
          align: 'center'
        },
        {
          slot: 'email',
          align: 'center'
        }
      ]
    }
  },
  computed: {
    columns: {
      get() {
        const $this = this
        return [
          {
            title: this.$i18n.t('common.avatar'),
            dataIndex: 'avatar',
            width: 80,
            align: 'center',
            scopedSlots: { customRender: 'avatar' }
          },
          {
            title: this.$i18n.t('common.account'),
            dataIndex: 'username',
            width: 120,
            align: 'center'
          },
          {
            title: this.$i18n.t('common.nick_name'),
            dataIndex: 'displayName',
            width: 120,
            align: 'center',
            scopedSlots: { customRender: 'displayName' }
          },
          {
            title: this.$i18n.t('common.role_name'),
            dataIndex: 'roles',
            width: 120,
            align: 'center',
            scopedSlots: { customRender: 'role' }
          },
          {
            title: this.$i18n.t('common.email'),
            dataIndex: 'email',
            width: 180,
            align: 'center',
            scopedSlots: { customRender: 'email' }
          },
          {
            title: this.$i18n.t('common.status'),
            dataIndex: 'statusDesc',
            width: 80,
            align: 'center'
          },
          {
            title: this.$i18n.t('common.create_time'),
            dataIndex: 'createdDate',
            width: 120,
            align: 'center',
            customRender: function(date) {
              return $this.$moment(date).format('LL')
            }
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