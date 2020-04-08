<template>
  <div class="article-list-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
          <ask-carousel></ask-carousel>
          <div class="layout-left">
          <br>
          <askListCell  v-for="ask in askList" :ask="ask" :key="ask.id"></askListCell>
          <browse-more @browseMore="browseMore" :noMoreData="noMoreData"  ref="browseMore"></browse-more>
          <br>
        </div>
      </iv-col>
      <iv-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <iv-button @click="selectMenu('question')" style="width:100%;margin-bottom:10px;background-color:#1586C2;color :#FFFFFF;font-weight: bold;">我要提问</iv-button>
           <br>
          <new-ask></new-ask>
           <br>
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
import AskListCell from '@/components/views/Ask/AskListCell'
import BrowseMore from '@/components/views/BrowseMore'
import {DefaultFilterList} from '@/common/js/const'
import NewAsk from '@/components/views/NewAsk'
import AskCarousel from '@/components/views/Carousel/AskCarousel'
import merge from 'lodash/merge' // 合并对象工具
export default {
  components: {
    'askListCell': AskListCell,
    'browse-more': BrowseMore,
    'new-ask': NewAsk,
    'ask-carousel': AskCarousel
  },
  data () {
    return {
      askList: [],
      pageParam: {
        currentPage: 1,
        pageSize: 10
      },
      menuParams: {
        nweTime: true
      },
      noMoreData: false,
      defaultFilterList: DefaultFilterList
    }
  },
  created () {
    this.listArticle(this.menuParams)
  },
  methods: {
    listArticle (param) {
      let params = merge(param, this.pageParam)
      this.$axios.get('/view/ask/list', {
        params
      }).then(({data}) => {
        if (data && data.code === '000000') {
          if (data.data.pageCount <= data.data.currentPage) {
            this.noMoreData = true
          } else {
            this.noMoreData = false
          }
          this.askList = data.data.pageData
        } else if (data.code === '000001') {
          // 没有数据
          this.askList = []
          this.noMoreData = true
        } else if (data.code === '000101') {
          // 用户不存在
          this.askList = []
          this.$Message.warning(data.msg)
          this.$router.replace({path: '/'})
        } else {
          this.askList = []
          this.$Message.warning(data.msg)
        }
      })
    },
    filterByMenu (params) {
      console.log('刷新值')
      this.resetCurrentPage()
      this.menuParams = params
      this.listArticle(this.menuParams)
    },
    resetCurrentPage () {
      this.currentPage = 1
      this.pageParam.currentPage = 1
    },
    browseMore (param) {
      this.pageParam.currentPage++
      let params = merge(this.menuParams, this.pageParam)
      this.$axios.get('/view/article/list', {
        params
      }).then(({data}) => {
        if (data && data.code === '000000') {
          if (data.data.pageCount <= data.data.currentPage) {
            this.noMoreData = true
          } else {
            this.noMoreData = false
          }
          this.askList = this.askList.concat(data.data.pageData)
        } else if (data.code === '000001') {
          // 没有数据
          this.noMoreData = true
        } else if (data.code === '000101') {
          // 用户不存在
          this.$Message.warning(data.msg)
          this.$router.replace({path: '/'})
        } else {
          this.$Message.warning(data.msg)
        }
      }).then(response => {
        this.$refs.browseMore.stopLoading()
      }).catch(error => {
        this.$refs.browseMore.stopLoading()
        console.log(error)
      })
    },
    selectMenu (url) {
      this.$router.push('/' + url)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .article-list-content
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
    .layout-left
      background-color #fff
      margin-top 10px
      padding 0
      @media only screen and (max-width: 768px)
        margin-top 10px
        padding 0
      @media screen and (min-width: 768px)
        margin-top 10px
        padding 0
      @media screen and (min-width: 992px)
        margin-top 10px
        padding 0 10px
      @media screen and (min-width: 1200px)
        margin-top 10px
        padding 0 10px
    .layout-right
      padding 0
      @media only screen and (max-width: 768px)
        padding 0
      @media screen and (min-width: 768px)
        padding 0
      @media screen and (min-width: 992px)
        padding 0 10px
      @media screen and (min-width: 1200px)
        padding 0 10px
</style>
