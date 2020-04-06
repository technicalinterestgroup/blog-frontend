<template>
  <div class="article-cell" >
    <br>
    <div  class="tableList">
       <noticeListCell v-for="notice in data6" :article="notice" :key="notice.id" @remove="remove"></noticeListCell>
    </div>
    <div style="margin: 10px 10px 10px 10px;overflow: hidden">
        <div style="float: right;margin: 10px 10px 10px 10px;">
          <Page :total="totalCount" :page-size="pageParam.pageSize" @on-change="changepage" show-elevator show-total></Page>
        </div>
    </div>
    <br>
  </div>
</template>

<script type="text/ecmascript-6">
import merge from 'lodash/merge' // 合并对象工具
import NoticeListCell from './CollectListCell'
export default {
  components: {
    'noticeListCell': NoticeListCell
  },
  // name: 'formValidate',
  data () {
    return {
      pageParam: {
        currentPage: 1,
        pageSize: 10
      },
      totalCount: 0,
      queryParam: {},
      data6: [],
      msg: '赞了你的博文'
    }
  },
  created () {
    this.getWebsiteList()
  },
  methods: {
    getWebsiteList (param) {
      let params = merge(param, this.pageParam)
      this.$axios.get('/collection/list', {
        params
      }).then(({data}) => {
        if (data.code === '000000') {
          this.data6 = data.data.pageData
          this.totalCount = data.data.totalCount
        } else if (data.code === '000005') {
          this.$Message.warning(data.msg)
        } else if (data.code === '000001') {
          this.data6 = []
          this.totalCount = 0
        } else {
          this.$Message.warning(data.msg)
          this.data6 = []
          this.totalCount = 0
        }
      })
    },
    changepage (index) {
      this.pageParam.currentPage = index
      this.getWebsiteList(null)
    },
    remove (data) {
      this.$Modal.confirm({
        title: '提示信息',
        content: '<p>确定取消收藏吗？</p>',
        onOk: () => {
          this.delCollectionPost(data)
        },
        onCancel: () => {
        }
      })
    },
    // 取消收藏
    delCollectionPost (post) {
      this.$axios.get('/collection/del/' + post.sourceId, {
        params: {
          type: 1
        }
      }).then(({data}) => {
        if (data && data.code === '000000') {
          this.$Message.success('取消收藏')
          this.getWebsiteList()
        } else if (data && data.code === '000005') {
          this.$Message.warning(data.msg)
        } else {
          this.$Message.warning(data.msg)
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/index.styl";
  .article-cell
    width auto
    margin-bottom 15px
    background-color #fff
    align center
    .opreat
    .tableList
      margin: 10px 10px;
    .footer
      margin: 10px 10px;
</style>
