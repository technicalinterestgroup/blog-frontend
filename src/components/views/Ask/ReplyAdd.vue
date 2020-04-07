  <template>
  <div class="article">
    <iv-form :model="article" labiv-width="80px" :rules="rules" ref="articleForm">
      <iv-form-item  prop="content" style="height:auto">
        <mavon-editor  style="min-height: 250px" ref=md v-model="article.content" @imgAdd="imgAdd" @change="mavonChangeHandle" :toolbars="markdown.toolbars"></mavon-editor>
      </iv-form-item>
      <iv-form-item>
        <iv-button type="primary" @click="saveArticle()">保存</iv-button>
        <iv-button >重置</iv-button>
      </iv-form-item>
    </iv-form>
  </div>
</template>

<script type="text/ecmascript-6">
import MavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// import { treeDataTranslate } from '@/utils'
import marked from 'marked'
export default {
  components: {
    'mavon-editor': MavonEditor.mavonEditor
  },
  data () {
    return {
      markdown: {
        codeStyle: 'atom-one-dark',
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: false, // 有序列表
          ul: false, // 无序列表
          link: false, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: false, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: false, // 帮助
          /* 1.3.5 */
          undo: false, // 上一步
          redo: false, // 下一步
          trash: false, // 清空
          save: false, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true // 预览
        }
      },
      article: {
        askId: null
      },
      // coverTypeList: this.getSysParamArr('ARTICLE_COVER_TYPE'),
      coverTypeList: [],
      url: '',
      file: [],
      tagList: [],
      tagListSelect: [],
      tagListNew: [],
      categoryList: [],
      categoryListSelect: '选择内容',
      categoryOptions: [],
      categoryOptionsSelect: [],
      categoryListTreeProps: {
        label: 'name',
        children: 'children',
        value: 'id'
      },
      userName: this.$route.params.userName,
      articleId: this.$route.query.articleId,
      rules: {
        title: {required: true, message: '输入文章标题', trigger: 'change'},
        description: [
          {required: true, message: '输入文章描述', trigger: 'change'},
          { type: 'string', max: 50, message: '不能超出50字', trigger: 'change' }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    // 保存文章
    saveArticle () {
      this.$refs['articleForm'].validate((valid) => {
        if (valid) {
          // 转化categoryId
          // this.article.categoryId = this.categoryOptionsSelect.join(',')
          this.$axios.post('/article/new', this.article)
            .then(({data}) => {
              if (data.code === '000000') {
                this.article = {}
                this.$Message.success('保存博文成功')
                this.$router.push({path: '/' + this.userName + '/article/' + data.data})
              } else {
                this.$Message.error(data.msg)
              }
            })
        } else {
          return false
        }
      })
    },
    // 文章内容图片上传
    imgAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      let formData = new FormData()
      formData.append('file', $file)
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      } // 添加请求头
      this.$axios.post('/file/img/upload', formData, config)
        .then(({data}) => {
          if (data.code === '000000') {
            this.$refs.md.$img2Url(pos, data.data)
          } else {
            this.$Message.warning(data.msg)
          }
        })
    },
    mavonChangeHandle (context, render) {
      this.article.contentFormat = marked(context)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/index.styl";
  .article
    width auto
    height auto
    padding:10px 10px 10px 10px;
    margin-bottom 15px
    background-color #fff
    .editor
      height 100px
</style>
