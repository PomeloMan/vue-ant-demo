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
 *  options: {alias: { title: 'name', value: 'id', key: 'id' }}
 *  return [{"title":"服装","value":1,"key":1,"children":[{"title":"外套","value":7,"key":7},{"title":"T恤","value":8,"key":8},{"title":"休闲裤","value":9,"key":9},{"title":"牛仔裤","value":10,"key":10},{"title":"衬衫","value":11,"key":11},{"title":"男鞋","value":29,"key":29}]},{"title":"手机数码","value":2,"key":2,"children":[{"title":"手机通讯","value":19,"key":19},{"title":"手机配件","value":30,"key":30},{"title":"摄影摄像","value":31,"key":31},{"title":"影音娱乐","value":32,"key":32},{"title":"数码配件","value":33,"key":33},{"title":"智能设备","value":34,"key":34}]},{"title":"家用电器","value":3,"key":3,"children":[{"title":"电视","value":35,"key":35},{"title":"空调","value":36,"key":36},{"title":"洗衣机","value":37,"key":37},{"title":"冰箱","value":38,"key":38},{"title":"厨卫大电","value":39,"key":39},{"title":"厨房小电","value":40,"key":40},{"title":"生活电器","value":41,"key":41},{"title":"个护健康","value":42,"key":42}]},{"title":"家具家装","value":4,"key":4,"children":[{"title":"厨房卫浴","value":43,"key":43},{"title":"灯饰照明","value":44,"key":44},{"title":"五金工具","value":45,"key":45},{"title":"卧室家具","value":46,"key":46},{"title":"客厅家具","value":47,"key":47}]},{"title":"汽车用品","value":5,"key":5,"children":[{"title":"全新整车","value":48,"key":48},{"title":"车载电器","value":49,"key":49},{"title":"维修保养","value":50,"key":50},{"title":"汽车装饰","value":51,"key":51}]}]
 */
export function extractFields(data, options) {
  if (!data) {
    return data
  }
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
 *  return: ['红色*16G', '红色*32G', '白色*16G', '白色*32G']
 * 注：
 *  array: [['红色', '白色']]
 *  return: [['红色', '白色']]
 */
export function combineAll(array) {
  let result = []
  const length = array.length
  if (length >= 2) {
    result = combine(array[0], array[1])
    let index = 2
    while (index < length) {
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
 *  return: ['红色*16G', '红色*32G', '白色*16G', '白色*32G']
 */
export function combine(array1, array2) {
  const result = []
  array1.forEach(item1 => {
    array2.forEach(item2 => {
      result.push(`${item1}*${item2}`)
    })
  })
  return result
}

/**
 * 验证手机号码
 */
export function verifyPhoneNumber(val) {
  return /^1[3456789]\d{9}$/.test(val)
}
/**
 * 验证座机号码
 */
export function checkLandline(number) {
  return /^((0\d{2,3}))(\d{7,8})(-(\d{3,}))?$/.test(number);
}

/**
 * 检验正整数
 * @param {*} value
 * @param {*} type
 *  0：匹配正整数
 *  1：匹配负整数
 *  2：匹配整数
 *  3：匹配非负整数（正整数 + 0）
 *  4：匹配非正整数（负整数 + 0）
 *  5：匹配小数位不超过2位的小数
 */
export function checkNumber(value, type = 0) {
  switch (type) {
    case 0:
      return /(^[1-9]\d*$)/.test(value); // 正整数
    case 1:
      return /(^-[1-9]\d*$)/.test(value); // 负整数
    case 2:
      return /(^-?[1-9]\d*$)/.test(value); // 整数
    case 3:
      return /(^[1-9]\d*|0$)/.test(value); // 非负整数（正整数 + 0）
    case 4:
      return /(^-[1-9]\d*|0$)/.test(value); // 非正整数（负整数 + 0）
    case 5:
      return /(^-?\d+(\.\d{1,2})?$)/.test(value); // 小数位不超过2位
    // return /(^\d{1,9}(\.\d{1,2})?$)/.test(value); // 整数位不超过9位，小数位不超过2位的非负数
    // return /(^\d{1,9}?$)/ 9位非负整数
    default:
      return false
  }
}

/**
 * 将集合构建成父子关系树形数据结构
 * @param {*} list 
 * @param {*} options 
 */
export function buildTree(list, options = { key: 'id', parentKey: 'parentId' }) {
  const temp = {};
  const tree = [];
  const key = options.key
  const pKey = options.parentKey
  for (let i in list) {
    temp[list[i][key]] = list[i];
  }
  for (let i in temp) {
    if (temp[i][pKey] && temp[i][pKey] != 0) {
      if (temp[temp[i][pKey]]) {
        if (!temp[temp[i][pKey]].children) {
          temp[temp[i][pKey]].children = [];
        }
        temp[temp[i][pKey]].children.push(temp[i]);
      }
    } else {
      tree.push(temp[i]);
    }
  }
  return tree;
}

/**
 * 敏感词过滤
 * @param {*} content 内容
 * @param {*} options 敏感词（需要被替换的内容集合）
 */
export function replace(content, options) {
  var showContent = content;
  // 正则表达式
  // \d 匹配数字 
  for (var i = 0; i < options.length; i++) {
    // 创建一个正则表达式
    var r = new RegExp(options[i], "ig");
    var star = "";
    var index = 0;
    while (index < options[i].length) {
      star += "*";
      index++;
    }
    showContent = showContent.replace(r, star);
    // showContent.replace(options[i], "*");
  }
  return showContent;
}

/**
 * 获取图片
 * @param {*} img 图片数据
 * @param {*} callback 图片回调 回调参数为转换后的 Base64 url
 * 
 * @example
 *  getBase64(info.file.originFileObj, imageUrl => {
 *    this.imageUrl = imageUrl;
 *    this.loading = false;
 *  });
 */
export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

/**
 * 获取 video 元素第一帧图片，存在跨域问题
 * @param {*} video video元素 <video>
 * @param {*} scale 长宽比例
 */
export function captureImage(video, scale) {
  var canvas = document.createElement("canvas")
  canvas.width = video.videoWidth * scale
  canvas.height = video.videoHeight * scale
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)

  var img = document.createElement("img")
  img.src = canvas.toDataURL("image/png")
  return img
}

/**
 * 处理数据下载
 * @param {*} data 二进制数据
 * @param {*} options 默认excel格式
 */
export function handleBlobData(filename, data, options = { type: 'application/vnd.ms-excel' }) {
  const blob = new Blob([data], options)
  //对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
  //IE10以上支持blob但是依然不支持download
  if ('download' in document.createElement('a')) {
    const link = document.createElement('a')
    link.download = filename
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    document.body.appendChild(link)
    link.click()
    URL.revokeObjectURL(link.href) // 释放url
    document.body.removeChild(link) // 释放标签
  } else {
    window.navigator.msSaveBlob(blob, filename)
  }
}

/**
 * 文本替换
 * @param {*} value 需要格式的文本，格式从{1}开始，如 hello,{1}
 * 
 * @example
 * value(arguments[0]): hello,{1}
 * arguments[1]: world
 * return: hello,world
 */
export function stringFormat(value) {
  let v = value
  let i = arguments.length
  while (i--) {
    v = v.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i])
  }
  return v;
}

/**
 * 将数字转成36位(0~9A~Z)字符串
 * @param {*} num 十进制数字
 * @param {*} len 返回字符串长度，长度不足用 0 补足
 * 
 * @example
 * num: 10
 * return: 00A
 */
export function toString36(num, len = 3) {
  let _num = Number(num)
  if (!isNaN(_num)) {
    _num = _num.toString(36)
    while (_num.length < len) {
      _num = '0' + _num
    }
    return _num
  }
  return num
}

/**
 * 获取2日期间的所有日期集合
 * @param {*} start 
 * @param {*} end 
 * 
 * @example
 * start: moment('2020-06-01')
 * end: moment('2020-06-05')
 * 
 * return ['20200601', '20200602', '20200603', '20200604', '20200605']
 */
export function getDateBetween(start, end, format = 'YYYYMMDD') {
  const dates = []
  let _start = Number(start.format(format))
  let _end = Number(end.format(format))
  while (_start <= _end) {
    dates.push(_start.toString())
    _start++
  }
  return dates
}