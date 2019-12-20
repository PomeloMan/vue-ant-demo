/**
 * 获取目标在树形结构数据中的位置
 * @param {*} data 数组
 * @param {*} target 目标数据
 * @param {*} options { id: 'id' }
 * 
 * @returns number | array
 * 
 * @example
 *  data [{"id":1,"parentId":0,"name":"服装","level":0,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":1,"icon":null,"keywords":"服装","description":null,"children":[{"id":7,"parentId":1,"name":"外套","level":1,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_waitao.png","keywords":"外套","description":null,"visible":true},{"id":8,"parentId":1,"name":"T恤","level":1,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_tshirt.png","keywords":"T恤","description":null,"visible":true},{"id":9,"parentId":1,"name":"休闲裤","level":1,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_xiuxianku.png","keywords":"休闲裤","description":null,"visible":true},{"id":10,"parentId":1,"name":"牛仔裤","level":1,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_niuzaiku.png","keywords":"牛仔裤","description":null,"visible":true},{"id":11,"parentId":1,"name":"衬衫","level":1,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_chenshan.png","keywords":"衬衫","description":null,"visible":true},{"id":29,"parentId":1,"name":"男鞋","level":1,"productCount":0,"productUnit":"","navStatus":0,"showStatus":0,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_xie.png","keywords":"","description":null,"visible":false}],"visible":true},{"id":2,"parentId":0,"name":"手机数码","level":0,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":1,"icon":null,"keywords":"手机数码","description":null,"children":[{"id":19,"parentId":2,"name":"手机通讯","level":1,"productCount":0,"productUnit":"件","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_shouji.png","keywords":"手机通讯","description":null,"visible":true},{"id":30,"parentId":2,"name":"手机配件","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_peijian.png","keywords":"手机配件","description":null,"visible":true},{"id":31,"parentId":2,"name":"摄影摄像","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_sheying.png","keywords":"","description":null,"visible":true},{"id":32,"parentId":2,"name":"影音娱乐","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_yule.png","keywords":"","description":null,"visible":true},{"id":33,"parentId":2,"name":"数码配件","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_yule.png","keywords":"","description":null,"visible":true},{"id":34,"parentId":2,"name":"智能设备","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_zhineng.png","keywords":"","description":null,"visible":true}],"visible":true},{"id":3,"parentId":0,"name":"家用电器","level":0,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":1,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/subject_cate_jiadian.png","keywords":"家用电器","description":null,"children":[{"id":35,"parentId":3,"name":"电视","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":36,"parentId":3,"name":"空调","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":37,"parentId":3,"name":"洗衣机","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":38,"parentId":3,"name":"冰箱","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":39,"parentId":3,"name":"厨卫大电","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":40,"parentId":3,"name":"厨房小电","level":1,"productCount":0,"productUnit":"","navStatus":0,"showStatus":0,"sort":0,"icon":"","keywords":"","description":null,"visible":false},{"id":41,"parentId":3,"name":"生活电器","level":1,"productCount":0,"productUnit":"","navStatus":0,"showStatus":0,"sort":0,"icon":"","keywords":"","description":null,"visible":false},{"id":42,"parentId":3,"name":"个护健康","level":1,"productCount":0,"productUnit":"","navStatus":0,"showStatus":0,"sort":0,"icon":"","keywords":"","description":null,"visible":false}],"visible":true},{"id":4,"parentId":0,"name":"家具家装","level":0,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":1,"icon":null,"keywords":"家具家装","description":null,"children":[{"id":43,"parentId":4,"name":"厨房卫浴","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":44,"parentId":4,"name":"灯饰照明","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":45,"parentId":4,"name":"五金工具","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":46,"parentId":4,"name":"卧室家具","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":47,"parentId":4,"name":"客厅家具","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true}],"visible":true},{"id":5,"parentId":0,"name":"汽车用品","level":0,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":1,"icon":null,"keywords":"汽车用品","description":null,"children":[{"id":48,"parentId":5,"name":"全新整车","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":49,"parentId":5,"name":"车载电器","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":50,"parentId":5,"name":"维修保养","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":51,"parentId":5,"name":"汽车装饰","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true}],"visible":true}]
 *  target {"id":8,"parentId":1,"name":"T恤","level":1,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_tshirt.png","keywords":"T恤","description":null,"visible":false}
 *  options { key: 'id' }
 *  return [0, 1]
 */
export function findIndex(data, target, options = { key: 'id' }) {
  if (data == null || target == null) {
    return -1
  }
  const key = options.key

  let index = data.findIndex(item => item[key] === target[key])
  if (index > -1) {
    return index
  }

  let childIndex = -1
  data.some((item, index) => {
    childIndex = findIndex(item.children, target, options)
    if (childIndex instanceof Array) {
      childIndex.unshift(index)
      return true
    }
    if (childIndex > -1) {
      childIndex = [index, childIndex]
      return true
    }
  })
  return childIndex
}

/**
 * 提取目标数据字段并返回新的数据对象
 * @param {*} data 需要提取字段的数据
 * @param {*} options 需要提取的字段及映射 { alias: { newkey: key } }
 * 
 * @returns obj | array
 * 
 * @example
 *  提取数据 { name, id } 字段，返回 { title, value, key }
 *  data: [{"id":1,"parentId":0,"name":"服装","level":0,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":1,"icon":null,"keywords":"服装","description":null,"children":[{"id":7,"parentId":1,"name":"外套","level":1,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_waitao.png","keywords":"外套","description":null,"visible":true},{"id":8,"parentId":1,"name":"T恤","level":1,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_tshirt.png","keywords":"T恤","description":null,"visible":true},{"id":9,"parentId":1,"name":"休闲裤","level":1,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_xiuxianku.png","keywords":"休闲裤","description":null,"visible":true},{"id":10,"parentId":1,"name":"牛仔裤","level":1,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_niuzaiku.png","keywords":"牛仔裤","description":null,"visible":true},{"id":11,"parentId":1,"name":"衬衫","level":1,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_chenshan.png","keywords":"衬衫","description":null,"visible":true},{"id":29,"parentId":1,"name":"男鞋","level":1,"productCount":0,"productUnit":"","navStatus":0,"showStatus":0,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_xie.png","keywords":"","description":null,"visible":false}],"visible":true},{"id":2,"parentId":0,"name":"手机数码","level":0,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":1,"icon":null,"keywords":"手机数码","description":null,"children":[{"id":19,"parentId":2,"name":"手机通讯","level":1,"productCount":0,"productUnit":"件","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_shouji.png","keywords":"手机通讯","description":null,"visible":true},{"id":30,"parentId":2,"name":"手机配件","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_peijian.png","keywords":"手机配件","description":null,"visible":true},{"id":31,"parentId":2,"name":"摄影摄像","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_sheying.png","keywords":"","description":null,"visible":true},{"id":32,"parentId":2,"name":"影音娱乐","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_yule.png","keywords":"","description":null,"visible":true},{"id":33,"parentId":2,"name":"数码配件","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_yule.png","keywords":"","description":null,"visible":true},{"id":34,"parentId":2,"name":"智能设备","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_zhineng.png","keywords":"","description":null,"visible":true}],"visible":true},{"id":3,"parentId":0,"name":"家用电器","level":0,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":1,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/subject_cate_jiadian.png","keywords":"家用电器","description":null,"children":[{"id":35,"parentId":3,"name":"电视","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":36,"parentId":3,"name":"空调","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":37,"parentId":3,"name":"洗衣机","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":38,"parentId":3,"name":"冰箱","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":39,"parentId":3,"name":"厨卫大电","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":40,"parentId":3,"name":"厨房小电","level":1,"productCount":0,"productUnit":"","navStatus":0,"showStatus":0,"sort":0,"icon":"","keywords":"","description":null,"visible":false},{"id":41,"parentId":3,"name":"生活电器","level":1,"productCount":0,"productUnit":"","navStatus":0,"showStatus":0,"sort":0,"icon":"","keywords":"","description":null,"visible":false},{"id":42,"parentId":3,"name":"个护健康","level":1,"productCount":0,"productUnit":"","navStatus":0,"showStatus":0,"sort":0,"icon":"","keywords":"","description":null,"visible":false}],"visible":true},{"id":4,"parentId":0,"name":"家具家装","level":0,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":1,"icon":null,"keywords":"家具家装","description":null,"children":[{"id":43,"parentId":4,"name":"厨房卫浴","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":44,"parentId":4,"name":"灯饰照明","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":45,"parentId":4,"name":"五金工具","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":46,"parentId":4,"name":"卧室家具","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":47,"parentId":4,"name":"客厅家具","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true}],"visible":true},{"id":5,"parentId":0,"name":"汽车用品","level":0,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":1,"icon":null,"keywords":"汽车用品","description":null,"children":[{"id":48,"parentId":5,"name":"全新整车","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":49,"parentId":5,"name":"车载电器","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":50,"parentId":5,"name":"维修保养","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":51,"parentId":5,"name":"汽车装饰","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true}],"visible":true}]
 *  options: { title: 'name', value: 'id', key: 'id' }
 *  return [{"title":"服装","value":1,"key":1,"children":[{"title":"外套","value":7,"key":7},{"title":"T恤","value":8,"key":8},{"title":"休闲裤","value":9,"key":9},{"title":"牛仔裤","value":10,"key":10},{"title":"衬衫","value":11,"key":11},{"title":"男鞋","value":29,"key":29}]},{"title":"手机数码","value":2,"key":2,"children":[{"title":"手机通讯","value":19,"key":19},{"title":"手机配件","value":30,"key":30},{"title":"摄影摄像","value":31,"key":31},{"title":"影音娱乐","value":32,"key":32},{"title":"数码配件","value":33,"key":33},{"title":"智能设备","value":34,"key":34}]},{"title":"家用电器","value":3,"key":3,"children":[{"title":"电视","value":35,"key":35},{"title":"空调","value":36,"key":36},{"title":"洗衣机","value":37,"key":37},{"title":"冰箱","value":38,"key":38},{"title":"厨卫大电","value":39,"key":39},{"title":"厨房小电","value":40,"key":40},{"title":"生活电器","value":41,"key":41},{"title":"个护健康","value":42,"key":42}]},{"title":"家具家装","value":4,"key":4,"children":[{"title":"厨房卫浴","value":43,"key":43},{"title":"灯饰照明","value":44,"key":44},{"title":"五金工具","value":45,"key":45},{"title":"卧室家具","value":46,"key":46},{"title":"客厅家具","value":47,"key":47}]},{"title":"汽车用品","value":5,"key":5,"children":[{"title":"全新整车","value":48,"key":48},{"title":"车载电器","value":49,"key":49},{"title":"维修保养","value":50,"key":50},{"title":"汽车装饰","value":51,"key":51}]}]
 */
export function extractFields(data, options) {
  if (data instanceof Array) {
    return data.map(item => {
      const obj = extractFields(item, options)
      if (item.children && item.children.length > 0) {
        obj.children = extractFields(item.children, options)
        return obj
      } else {
        return obj
      }
    })
  } else {
    const keys = Object.keys(options.alias)
    const obj = {}
    keys.forEach(key => {
      obj[key] = data[options.alias[key]]
    })
    return obj
  }
}

/**
 * 获取数据所有组合
 * @param {*} array 
 * 
 * @returns array
 * 
 * @example
 *  array: [['红色', '白色'], ['16G', '32G']]
 *  return: ['红色|16G', '红色|32G', '白色|16G', '白色|32G']
 */
export function combineAll(array) {
  let result = []
  const length = array.length
  if (length >= 2) {
    result = combine(array[0], array[1])
    let index = 2
    while (index > length) {
      result = combine(result, array[index])
      index++
    }
    return result
  } else {
    return array
  }
}

/**
 * 合并组合两一维数组
 * @param {*} array1 
 * @param {*} array2 
 * 
 * @returns array
 * 
 * @example
 *  array1: ['红色', '白色']
 *  array2: ['16G', '32G']
 *  return: ['红色|16G', '红色|32G', '白色|16G', '白色|32G']
 */
export function combine(array1, array2) {
  const result = []
  array1.forEach(item1 => {
    array2.forEach(item2 => {
      result.push(`${item1}|${item2}`)
    })
  })
  return result
}