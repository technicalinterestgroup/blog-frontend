<template>
  <!-- 个人中心正文内容 -->
  <div class="my-account">
    <iv-menu :theme="theme3" :active-name="activeName" style="width:190px">
        <iv-menu-group title="账号设置">
            <iv-menu-item v-for="auth in authList" :key="auth.url" :name="auth.authName" @click.native="jump2Page(auth.url)">
                <iv-icon :type="auth.icon" ></iv-icon>
                {{auth.authName}}
            </iv-menu-item>
            <!-- <iv-menu-item key="2" name='email' @click.native="jump2Page('email')">
                <iv-icon type="chatbubbles" ></iv-icon>
                修改邮箱
            </iv-menu-item> -->
            <!-- <router-link :to="{name:'userinfo'}">
            <iv-menu-item key="3" name='3'>
                <iv-icon type="chatbubbles" ></iv-icon>
                我的分类
            </iv-menu-item>
            </router-link>
            <iv-menu-item key="4" name='4'>
                <iv-icon type="chatbubbles" ></iv-icon>
                我的关注
            </iv-menu-item>
            <iv-menu-item key="5" name='5'>
                <iv-icon type="chatbubbles" ></iv-icon>
                我的粉丝
            </iv-menu-item> -->
        </iv-menu-group>
    </iv-menu>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {

  },
  data () {
    return {
      theme3: 'light',
      authList: [],
      activeName: ''
    }
  },
  created () {
    this.userIsLoginFunction()
  },
  methods: {
    jump2Page (path) {
      this.$router.push({
        name: path
      })
    },
    userIsLoginFunction () {
      if (localStorage.getItem('accessToken') && localStorage.getItem('userInfo')) {
        console.log('已经登录')
        var jsonObj = JSON.parse(localStorage.getItem('userInfo'))
        jsonObj.authList.forEach(item => {
          if (item.authName === '账号设置') {
            this.authList = item.children
            this.activeName = this.authList[0].authName
          }
        })
      } else {
        console.log('没有登录用户')
        this.userIsLogin = false
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .my-account
    width auto
    @media only screen and (max-width: 768px)
      margin 5px 5px 10px 5px
    @media screen and (min-width: 768px)
      margin 10px 10px 20px 10px
    @media screen and (min-width: 992px)
      margin 15px 35px 50px 35px
    @media screen and (min-width: 1200px)
      width 1200px
      margin 15px auto 0
      margin-bottom 50px
</style>
