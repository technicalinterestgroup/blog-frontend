<template>
  <div class="side-bar" @touchmove.stop.prevent :class="{ open: show }">
    <div class="main-area">
      <div class="top-wrapper" @touchmove.stop>
        <div class="top-area">
          <img src="../../../assets/background.jpg" alt="">
          <div class="site-info">
            <h1 class="site-name">VBlog</h1>
            <h1 class="site-desc">Create your VBlog！</h1>
          </div>
        </div>
        <div class="sidebar-menus" >
          <div class="site-nav">
            <p>
              <iv-icon type="navicon-round"></iv-icon>
              博客导航
            </p>
          </div>
          <ul class="nav-menu">
            <!-- 类别导航 -->
            <li class="nav-dropdown-container" v-for="level1 in articleCategoryList" :key="level1.name">
              <iv-icon :type="level1.ioc"></iv-icon>&nbsp;
              <a class="nav-link" @click="selectMenu(level1.url)">{{level1.name}}<span class="arrow"></span>
              </a>
            </li>
          </ul>
        </div>
        <div class="sidebar-menus" v-if=!userIsLogin>
          <div class="site-nav">
            <p>
              <iv-icon type="log-in"></iv-icon>
              操作
            </p>
          </div>
          <ul class="nav-menu">
            <li class="nav-dropdown-container">
              <iv-icon type="navigate"></iv-icon>&nbsp;
              <a class="nav-link" @click="selectMenu('/login')">登录<span class="arrow"></span>
              </a>
            </li>
            <li class="nav-dropdown-container">
              <iv-icon type="flame"></iv-icon>&nbsp;
              <a class="nav-link" @click="selectMenu('/register')">注册<span class="arrow"></span>
              </a>
            </li>
          </ul>
        </div>
        <div class="sidebar-menus" v-if=userIsLogin>
          <div class="site-nav">
            <img class='avatar' :src="userInfo.photo">
            <p>
              {{userInfo.userName}}
            </p>
          </div>
          <ul class="nav-menu">
            <li class="nav-dropdown-container" v-for="notice in noticeList" :key="notice.authName">
              <iv-icon :type="notice.icon"></iv-icon>&nbsp;
              <a class="nav-link" @click="selectMenu('/'+userInfo.userName+notice.url)">{{notice.authName}}  <font color="red">{{notice.count}} </font><span class="arrow"></span>
              </a>
              <ul class="nav-dropdown">
                <li v-for="notice2 in notice.children" :key="notice2.id">
                  <iv-icon :type="notice2.icon"></iv-icon>
                  <a class="nav-link" @click="selectMenu('/'+userInfo.userName+notice2.url)" >{{ notice2.authName}} <font color="red">{{notice2.count}}</font> </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul class="nav-menu">
            <li class="nav-dropdown-container" v-for="category_level1 in userInfo.authList" :key="category_level1.authName">
              <iv-icon :type="category_level1.icon"></iv-icon>&nbsp;
              <!-- <a class="nav-link" @click="routerUrl(category_level1.url)">{{category_level1.authName}}<span class="arrow"></span> -->
              <a class="nav-link" @click="selectMenu('/'+userInfo.userName+category_level1.url)">{{category_level1.authName}}<span class="arrow"></span>
              </a>
              <ul class="nav-dropdown">
                <li v-for="category_level2 in category_level1.children" :key="category_level2.id">
                  <iv-icon :type="category_level2.icon"></iv-icon>
                  <a class="nav-link" @click="selectMenu('/'+userInfo.userName+category_level1.url+'/'+category_level2.url)" >{{ category_level2.authName}}</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mask" @click.prevent="toggleSideBar"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mixin} from '@/utils'
export default {
  name: 'side-bar',
  data () {
    return {
      show: false,
      showNav: false,
      articleCategoryList: [
        { name: '首页',
          url: '/',
          ioc: 'ios-home-outline'
        },
        { name: '博客',
          url: '/blog',
          ioc: 'ios-bookmarks-outline'
        },
        { name: '问答',
          url: '/ask',
          ioc: 'ios-chatbubbles-outline'
        },
        { name: '资源',
          url: '/resources',
          ioc: 'ios-link-outline'
        },
        { name: '关于',
          url: '/notice/1',
          ioc: 'ios-ribbon-outline'
        }
      ],
      noticeList: [
        {
          url: '/notice',
          icon: 'md-chatboxes',
          authName: '消息通知',
          count: null,
          children: [
            {
              url: '/notice/like',
              icon: 'ios-chatbubbles-outline',
              authName: '点赞通知',
              count: null
            },
            {
              url: '/notice/comment',
              icon: 'ios-chatboxes-outline',
              authName: '评论通知',
              count: null
            }
          ]
        }

      ],
      noticeCount: null
    }
  },
  props: {
    userIsLogin: Boolean,
    userInfo: {
      photo: String,
      userName: String,
      authList: Array
    }

  },
  mixins: [mixin],
  beforeRouteUpdate (to, from, next) {
    next()
  },
  created () {
    this.getNoticeCount()
  },
  methods: {
    rootRouterLink (category) {
      let router = {}
      router.name = category.category_type
      return router
    },
    routerLink (category) {
      let router = {}
      router.name = category.category_type
      router.params = {}
      router.params['id'] = category.id
      return router
    },
    toggleSideBar () {
      this.show = !this.show
      this.showNav = !(this.$route.name === 'article' ||
          this.$route.name === 'book' ||
          this.$route.name === 'book/note' ||
          this.$route.name === 'movie' ||
          this.$route.name === 'album'
      )
    },
    routerUrl (url) {
      if (url === '/logout') {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userInfo')
        this.userIsLoginFunction()
        this.$Message.warning('退出登录')
      } else {
        var urlPath = '/' + this.user + url
        console.log('跳转' + urlPath)
        this.$router.push({path: urlPath})
      }
    },
    selectMenu (url) {
      console.log('url' + url)
      this.$router.push(url)
      // .catch(data => {})
    },
    getNoticeCount () {
      console.log('刷新通知数')
      this.$axios.get('/notice/count', {
      }).then(({data}) => {
        if (data && data.code === '000000') {
          this.noticeList.count = data.data.comentCount + data.data.likeCount
          // this.noticeList.children[0].count = data.data.likeCount
          // this.noticeList.children[1].count = data.data.comentCount
        }
      })
    }
  }
}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "./stylus/sidebar.styl";
  img.avatar
      position relative
      width 20px
      height 20px
      border-radius 50%
</style>
