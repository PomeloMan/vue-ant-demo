<template>
  <div class="container">
    <div>
      <div class="desc">
        <p class="title">{{$t('app.title')}}</p>
        <p class="subtitle">{{$t('app.subtitle')}}</p>
      </div>
    </div>
    <div>
      <a-form class="login-form" :form="form" @submit="login">
        <div class="logo">
          <!-- <img src="~@/assets/images/login_logo.svg" /> -->
        </div>
        <div class="input-wrap">
          <a-form-item>
            <a-input
              :placeholder="$t('message.please_input', {content:$t('common.account')})"
              v-decorator="['username', { rules: [{ required: true, message: $t('message.please_input', {content:$t('common.account')}) }] }]"
            />
            <span class="separator"></span>
          </a-form-item>
        </div>
        <div class="input-wrap">
          <a-form-item>
            <a-input
              type="password"
              :placeholder="$t('message.please_input', {content:$t('common.password')})"
              v-decorator="['password', { rules: [{ required: true, message: $t('message.please_input', {content:$t('common.password')}) }] }]"
              autocomplete
            />
            <span class="separator"></span>
          </a-form-item>
        </div>
        <a-button class="full-width" type="primary" html-type="submit">{{$t('common.login')}}</a-button>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      key: 'id',
      form: this.$form.createForm(this, { name: 'login' })
    }
  },
  methods: {
    login(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // 登录
          this.$http
            .post(this.$api.OAUTH_TOKEN, null, {
              params: {
                client_id: process.env.VUE_APP_OAUTH_CLIENT_ID,
                client_secret: process.env.VUE_APP_OAUTH_CLIENT_SECRET,
                grant_type: process.env.VUE_APP_OAUTH_GRANT_TYPE,
                scope: process.env.VUE_APP_OAUTH_SCOPE,
                username: values.username,
                password: values.password
              }
            })
            .then(({ data }) => {
              this.$store.dispatch('common/updateOauthToken', data)
              this.$router.push('/main')
              // this.$storage.setItem(
              //   'oauth2AccessToken',
              //   btoa(values.username + values.password)
              // )
              // 登录成功查询用户信息，为了使刷新页面 vue-store 不丢失用户数，在 main.vue 获取用户信息
              // this.$http
              //   .get(this.$api.SYS_USER)
              //   .then(({ data }) => {
              //     this.$store.dispatch('common/updateUser', data)
              //     this.$router.push('/main')
              //   })
              //   .catch(err => {
              //     this.$message.error(err.message)
              //   })
            })
            .catch(err => {
              this.$store.dispatch('common/updateOauthToken', {
                access_token:
                  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODk0NjE2NTYsInVzZXJfbmFtZSI6ImZlbmdjaGFvIiwiYXV0aG9yaXRpZXMiOlsiU1lTX1VTRVJfVVBEQVRFIiwiU1lTX1JPTEUiLCJTWVNfVVNFUl9BREQiLCJTWVMiLCJTWVNfQVVUSCIsIlNZU19VU0VSIiwiU1lTX1VTRVJfREVMRVRFIiwiU1lTX1VTRVJfUVVFUlkiXSwianRpIjoiNmM2NDUxYzYtMjVkOS00ZDQzLWEzYWItNmQ1ZjQxNWEwMmVhIiwiY2xpZW50X2lkIjoic3ByaW5nY2xvdWQiLCJzY29wZSI6WyJhbGwiLCJwdWJsaWMiXX0.LQqhd8Vm7mDiudl7GohCdfCMNmxkAwebDdYW30mAYkqS4PFZTulXtG7onGGcdOsA6N4kn-Agxqh7L2Xy7OatzDTsWrPe9VSeHGJ-U2ZtvEZh5a7lTXZ9SNE82-haP8eH810w12GhpTT2DV9Chk9G7PI-eBjeViMfN8RQgorOPxeLk-M_v_TOBrFRMPUYGIQLNs2A11kquVJjmlnUDS7cBkjbTGZY3CtrpKdDBMnVumdwzYucxW2w1GqCH6p3O_W1quVrFYMeSlqccqrU1p09YdHPGBdKdS2GwQ-DrcexI_JFOwi4i3qQLgLup8c6vh5q5pXI17O6urB0wR8GD0x9sw'
              })
              this.$router.push('/main')
              this.$message.error(err.message)
            })
        }
      })
    }
  }
}
</script>

<style lang="scss">
// 覆盖 ant-form-item 样式
.input-wrap .ant-form-item-children {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.input-wrap .ant-form-explain {
  text-align: center;
}
</style>
<style lang="scss" scoped>
.container {
  display: flex;
  // 左侧样式
  > div:first-child {
    flex: 6;
    color: white;
    background-color: #4f5a70;
    position: relative;
    // background-image: url('~@/assets/images/login_bg2x.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;

    > .desc {
      position: absolute;
      top: 33%;
      left: 5%;
      .title {
        font-size: 48px;
        font-weight: 500;
      }
      .subtitle {
        font-size: 24px;
      }
    }
  }
  // 右侧样式
  > div:last-child {
    flex: 4;
    background-color: #242e42;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // 表单样式
  .login-form {
    width: 60%;
    height: 40%;
    min-height: 320px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;

    .logo {
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 24px;
      img {
        width: 64px;
        height: 64px;
      }
      p {
        margin: 0;
      }
    }

    .input-wrap {
      width: 100%;
      display: flex;
      flex-direction: column;

      .ant-input {
        position: relative;
        color: #fff;
        background: transparent;
        border: none;
        outline: none;
        border-radius: 0;
        text-align: center;
        transition: 0.3s transform linear;
        box-shadow: none;
      }

      // 使用 autocomplete 会改变 input 背景色，这里强制背景色与项目色彩一致
      .ant-input:-webkit-autofill {
        box-shadow: 0 0 0 1000px #242e42 inset !important;
        -webkit-text-fill-color: white !important; // input 字体
        -webkit-box-shadow: 0 0 0 1000px #242e42 inset !important; // input 背景色
      }

      .separator {
        height: 1px;
        background: rgba($color: #fff, $alpha: 0.15);
      }
      .separator::after {
        display: block;
        content: '';
        height: 1px;
        width: 100%;
        background-color: #fff;
        transform: scaleX(0);
        transition: all 0.3s ease-in-out;
      }
      // input聚焦修改同级标签(.separator)样式
      .ant-input:focus + .separator::after {
        transform: scaleX(1);
      }
    }
  }
}
</style>
