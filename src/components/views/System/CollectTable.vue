<template>
<!-- 收藏列表页面 -->
  <div class="article-cell" >
    <br>
    <div>
     <Tabs @on-click="getCollectionList">
        <TabPane label="博客" icon="md-book" name="1"></TabPane>
        <TabPane label="通告" icon="md-volume-up" name="3"></TabPane>
        <TabPane label="问答" icon="ios-list-box" name="4"></TabPane>
    </Tabs>
    </div>
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
        pageSize: 10,
        type: 1
      },
      totalCount: 0,
      type: 1,
      data6: []
    }
  },
  created () {
    this.getCollectionList(this.type)
  },
  methods: {
    getCollectionList (type) {
      if (type) {
        this.pageParam.type = type
      }
      let params = merge(null, this.pageParam)
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
      this.getCollectionList(null)
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
          type: post.type
        }
      }).then(({data}) => {
        if (data && data.code === '000000') {
          this.$Message.success('取消收藏')
          this.getCollectionList()
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
