export class User {
  username // 账号
  displayName // 昵称
  email // 邮箱
  gender // 性别
  avatar // 头像
  createdDate // 创建时间
  roles // 角色
  authorities // 权限
  status // 状态
  statusCode // 状态码
  statusDesc // 状态描述

  constructor(user = {}) {
    this.username = user.username
    this.displayName = user.displayName
    this.email = user.email
    this.gender = user.gender
    this.avatar = user.avatar
    this.createdDate = user.createdDate
    this.roles = user.roles
    this.authorities = user.authorities
    this.status = user.status
    this.statusCode = user.statusCode
    this.statusDesc = user.statusDesc
  }
}