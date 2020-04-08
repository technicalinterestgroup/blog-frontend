<template>
  <div class="article-page-footer">
     <panel :title="'添加回答'">
      </panel>
      <replyAdd @refreshlist="getReplys"></replyAdd>

    <panel :title="'全部回答 '+replys.length">
      </panel>
       <br>
       <replyrListCell v-for="reply in replys" :key="reply.id" :article="reply">
       </replyrListCell>
       <br>
  </div>
</template>

<script type="text/ecmascript-6">
import LicenseTag from '@/components/views/LicenseTag'
import Panel from '@/components/utils/Panel'
import ReplyAdd from './ReplyAdd'
import ReplyListCell from './ReplyListCell'
export default {
  components: {
    'license-tag': LicenseTag,
    'panel': Panel,
    'replyAdd': ReplyAdd,
    'replyrListCell': ReplyListCell
  },
  props: {
    askId: String
  },
  data () {
    return {
      userName: null,
      replys: []
    }
  },
  created: function () {
    this.getUserName()
    this.getReplys(this.askId)
  },
  methods: {
    getReplys (askId) {
      // 查询文章详情
      this.$axios.get('view/ask/' + askId + '/replys', {
        params: {
          userName: this.userName
        }
      }).then(({data}) => {
        if (data && data.code === '000000') {
          this.replys = data.data
        }
      })
    },
    getUserName () {
      if (localStorage.getItem('accessToken') && localStorage.getItem('userInfo')) {
        var jsonObj = JSON.parse(localStorage.getItem('userInfo'))
        this.userName = jsonObj.userName
      }
    }
  }
}
</script>
