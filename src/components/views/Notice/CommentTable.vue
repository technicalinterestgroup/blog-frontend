<template>
  <div class="article-cell" >
    <br>
    <div  class="tableList">
       <noticeListCell v-for="notice in data6" :notice="notice" :key="notice.id" @changeView="changeView" :msg="msg"></noticeListCell>
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
import NoticeListCell from './NoticeListCell'
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
      msg: '评论了你博文'
    }
  },
  created () {
    this.getWebsiteList()
  },
  methods: {
    getWebsiteList (param) {
      let params = merge(param, this.pageParam)
      this.$axios.get('/notice/comment/list', {
        params
      }).then(({data}) => {
        if (data.code === '000000') {
          this.data6 = data.data.pageData
          this.totalCount = data.data.totalCount
        } else if (data.code === '000005') {
          this.$Message.warning(data.msg)
        } else if (data.code === '000001') {
          this.$Message.warning('没有匹配数据！')
          this.data6 = []
          this.totalCount = 0
        } else {
          this.$Message.warning(data.msg)
          this.data6 = []
          this.totalCount = 0
        }
      })
    },
    delCategory (id) {
      this.$axios.get('/website/del/' + id)
        .then(({data}) => {
          if (data.code === '000000') {
            this.$Message.success(data.msg)
            this.getWebsiteList()
          } else {
            this.$Message.warning(data.msg)
          }
        })
    },
    remove (data) {
      this.$Modal.confirm({
        title: '提示信息',
        content: '<p>确定删除该通告吗？</p>',
        onOk: () => {
          this.delCategory(data.id)
        },
        onCancel: () => {
          this.getUserInfo()
        }
      })
    },
    changepage (index) {
      this.pageParam.currentPage = index
      this.getWebsiteList(null)
    },
    changeView (param) {
      this.$axios.get('/notice/comment/view/' + param.id, {
      }).then(({data}) => {
        if (data.code === '000000') {
          this.$Message.success(data.msg)
          param.isView = 1
        } else {
          this.$Message.warning(data.msg)
        }
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
