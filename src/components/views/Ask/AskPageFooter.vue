<template>
  <div class="article-page-footer">
    <panel :title="'全部回答'">
      </panel>
      <replyAdd></replyAdd>
  </div>
</template>

<script type="text/ecmascript-6">
import LicenseTag from '@/components/views/LicenseTag'
import Panel from '@/components/utils/Panel'
import ReplyAdd from './ReplyAdd'
export default {
  components: {
    'license-tag': LicenseTag,
    'panel': Panel,
    'replyAdd': ReplyAdd
  },
  props: {
    articleId: String
  }
}
</script>
