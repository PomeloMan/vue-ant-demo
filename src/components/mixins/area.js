/**
 * 将中国省市区数据转化为 Ant Cascader 数据结构
 */
import areas from '@/constants/area'
export default {
  data() {
    return {
      areas: []
    }
  },
  created() {
    this.areas = []
    // 省
    const provinces = areas['86']
    Object.keys(provinces).forEach(pkey => {
      const province = {
        value: pkey,
        label: provinces[pkey],
        parent: '86'
      }
      this.areas.push(province)
      // 市
      const cities = areas[pkey]
      if (cities) {
        if (!province.children) {
          province.children = []
        }
        Object.keys(cities).forEach(ckey => {
          const city = {
            value: ckey,
            label: cities[ckey],
            parent: pkey
          }
          province.children.push(city)
          // 区/县
          const districts = areas[ckey]
          if (districts) {
            if (!city.children) {
              city.children = []
            }
            Object.keys(districts).forEach(dkey => {
              const district = {
                value: dkey,
                label: districts[dkey],
                parent: ckey
              }
              city.children.push(district)
            })
          }
        })
      }
    })
  },
  methods: {
    // <a-cascader :show-search="{ filter }">
    filter(inputValue, path) {
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    }
  },
}