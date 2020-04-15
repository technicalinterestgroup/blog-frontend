<template>
  <div class="focus-cell">
          <div class="info" v-for="link in linkList" :key="link.userName">
            <iv-row>
              <iv-col :xs="20" :sm="20" :md="20" :lg="20">
                <div class="cell">
                  <div class="avatar">
                  <img @click="selectMenu('/' + link.userName)" :src="link.avatar" alt="">
                  </div>
                  <div class="right">
                      <a @click="selectMenu('/' + link.userName)" target="_blank">
                      <p class="title">{{link.userName}}</p>
                      </a>
                  </div>
                </div>
              </iv-col>
              <iv-col :xs="4" :sm="4" :md="4" :lg="4">
                <iv-button v-if="link.state==1"  @click="confirmFocus(link.userName)" type="error" style="margin-top:10px" ghost>关注</iv-button>
                <iv-button v-if="link.state==2"  @click="confirm(link.userName)" type="success" style="margin-top:10px" ghost>互相关注</iv-button>
              </iv-col>
            </iv-row>
          </div>
      <div style="margin: 10px 10px 10px 10px;overflow: hidden">
        <div style="float: right;margin: 10px 10px 10px 10px;">
          <Page :total="totalCount" :page-size="pageParam.pageSize" @on-change="changepage" show-elevator show-total></Page>
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Panel from '@/components/utils/Panel'
import merge from 'lodash/merge' // 合并对象工具
export default {
  data () {
    return {
      linkList: [],
      pageParam: {
        currentPage: 1,
        pageSize: 10
      },
      totalCount: 0
    }
  },
  created () {
    this.listLink()
  },
  components: {
    'panel': Panel
  },
  methods: {
    listLink () {
      let params = merge(null, this.pageParam)
      this.$axios.get('/focus/fans', {
        params
      }).then(({data}) => {
        if (data && data.code === '000000') {
          this.linkList = data.data.pageData
          this.totalCount = data.data.totalCount
        }
      })
    },
    confirm (userName) {
      this.$Modal.confirm({
        title: '提示信息',
        content: '<p>确定取消关注该用户吗？</p>',
        onOk: () => {
          this.cancleFocus(userName)
        },
        onCancel: () => {
          // this.del(articleId)
        }
      })
    },
    confirmFocus (userName) {
      this.$Modal.confirm({
        title: '提示信息',
        content: '<p>确定关注该用户吗？</p>',
        onOk: () => {
          this.focus(userName)
        },
        onCancel: () => {
          // this.del(articleId)
        }
      })
    },
    focus (userName) {
      this.$axios.get('/focus/save', {
        params: {
          userName: userName
        }
      }).then(({data}) => {
        if (data && data.code === '000000') {
          this.$Message.success('关注成功')
          this.listLink()
        } else {
          this.$Message.console.warn(data.msg)
        }
      })
    },
    cancleFocus (userName) {
      this.$axios.get('/focus/cancel', {
        params: {
          userName: userName
        }
      }).then(({data}) => {
        if (data && data.code === '000000') {
          this.$Message.success('取消关注')
          this.listLink()
        } else {
          this.$Message.console.warn(data.msg)
        }
      })
    },
    selectMenu (url) {
      this.$router.push(url)
      // .catch(data => {})
    },
    changepage (index) {
      this.pageParam.currentPage = index
      this.getCollectionList(null)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl";

  .focus-cell
    width auto
    margin-bottom 15px
    padding 10px 10px
    background-color #fff
    .info
      padding 5px 5px
      margin-bottom 5px
      border 1px solid $color-border
      .cell
        display inline
        .avatar
          float left
          img
            width 50px
            height 50px
            margin 5px 0
            border-radius 15%
        .right
          display inline
          float left
          padding-left 12px
          height 60px
          line-height 60px
          text-align left
          .title
            text-align left
            &.title
              height 50px
              line-height 50px
              font-size 18px
              color $color-main-primary
            &.link
              height 15px
              line-height 15px
              font-weight 100
              font-size 10px
              margin-top 5px
              font-family Arial
</style>
