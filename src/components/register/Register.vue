<template>
<div class="home-content">
  <div class="login">
    <div class="login-con">
      <iv-card  icon="log-in" title="欢迎注册" :bordered="false">
        <div class="form-con">
          <register-form @on-success-valid="handleSubmit"></register-form>
        </div>
      </iv-card >
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import registerForm from '@/components/register/Register-form' // 驼峰命名法
export default {
  data () {
    return {
      userToken: '',
      userInfo: '',
      userName: '',
      passWord: '',
      email: '',
      img: '',
      token: '',
      modal1: false
    }
  },
  components: {
    registerForm
  },
  methods: {
    handleSubmit ({username, password, email, img, token}) {
      this.$axios.post('/view/user/new', {
        userName: username,
        passWord: password,
        email: email,
        img: img,
        token: token
      }).then(({data}) => {
        if (data && data.code === '000000') {
          this.loading()
        } else {
          this.$Message.warning(data.msg)
        }
      }).catch((error) => {
        this.$Message.error(error.response.data.msg)
      })
    },
    loading () {
      const msg = this.$Message.loading('注册成功，调整到登录页面...', 0)
      setTimeout(msg, 2000)
      this.$router.replace({path: '/login'})
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .home-content
    width 100vh,
    height 100%
    .login
      height 100vh;
      background-image  url('../../assets/login.png');
      background-size cover;
      background-position center;
      -webkit-font-smoothing antialiased ;// 这个属性可以使页面上的字体抗锯齿,使用后字体看起来会更清晰舒服
      font-weight 300;
      .login-con
        position absolute;
        right 160px;
        top 26em;
        transform translateY(-60%);
        width 300px;
        @media only screen and (max-width: 768px)
          right 20%;
        @media screen and (min-width: 768px)
          right 20%;
        @media screen and (min-width: 992px)
          right 20%;
        @media screen and (min-width: 1200px)
          right 20%;
        .header
          font-size 16px;
          font-weight 300;
          text-align center;
          padding 30px 0;
        .form-con
          padding 10px 0 0
        .login-tip
          font-size 10px;
          text-align center;
          color #fff

</style>
