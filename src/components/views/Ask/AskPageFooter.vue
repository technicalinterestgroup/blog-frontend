<template>
  <div class="article-page-footer">
    <panel :title="'全部回答'">
      </panel>
      <ask-page-content v-for="reply in replys" :key="reply.id">
            <article id="article-main-page" class="typo container" slot="content" ref="article"
                     v-html="reply.contentFormat">
            </article>
       </ask-page-content>
      <replyAdd></replyAdd>
  </div>
</template>

<script type="text/ecmascript-6">
import LicenseTag from '@/components/views/LicenseTag'
import Panel from '@/components/utils/Panel'
import AskPageContent from '@/components/views/Ask/AskPageContent'
import ReplyAdd from './ReplyAdd'
export default {
  components: {
    'license-tag': LicenseTag,
    'panel': Panel,
    'replyAdd': ReplyAdd,
    'ask-page-content': AskPageContent
  },
  props: {
    askId: String
  },
  data () {
    return {
      replys: []
    }
  },
  created: function () {
    this.getReplys(this.askId)
  },
  methods: {
    getReplys (askId) {
      // 查询文章详情
      this.$axios.get('view/ask/' + askId + '/replys', {
      }).then(({data}) => {
        if (data && data.code === '000000') {
          this.replys = data.data
          // 更新目录、高亮代码
          // this.$nextTick(function () {
          //   this.addCodeLineNumber()
          //   this.refreshDiectory()
          //   this.refreshMobileDirectory()
          //   document.title = this.article.title + ' | VBlog 创建你自己的博客'
          // })
        }
      })
    }
  }
}
</script>
