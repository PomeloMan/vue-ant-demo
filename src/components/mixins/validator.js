import { checkNumber } from '@/utils'
export default {
  data() {
    return {
      maxValue: 10000000,
      minValue: -10000000
    }
  },
  methods: {
    sequenceValidator(rule, val, callback) {
      if (val) {
        if (!checkNumber(val, 2)) {
          callback(this.$t('message.value_must_be_integer'))
        }
        if (val > this.maxValue) {
          callback(this.$t('message.value_must_less', { val: this.maxValue }))
        }
        if (val < this.minValue) {
          callback(this.$t('message.value_must_greater', { val: this.minValue }))
        }
      }
      callback()
    }
  }
}