<template>
  <div class="article-list-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
          <div class="layout-left">
          <br>
          <iv-form :model="article" labiv-width="80px" :rules="rules" ref="articleForm">
             <iv-form-item prop="title">
             <iv-input placeholder="输入问题标题" v-model="article.title"  clearable></iv-input>
            </iv-form-item>
            <iv-form-item  prop="content" style="height:auto">
              <mavon-editor  style="min-height: 400px" ref=md v-model="article.content" @imgAdd="imgAdd" @change="mavonChangeHandle" :toolbars="markdown.toolbars"></mavon-editor>
            </iv-form-item>
            <iv-form-item label="标签" prop="tagId">
            <Select
              style="width: 40%"
              v-model="article.tagId" >
              <Option
                v-for="item in tagList"
                  :key="item.id"
                :label="item.name"
                :value="item.id">
                {{ item.name }}
              </Option>
            </Select>
          </iv-form-item>
            <iv-form-item>
              <iv-button type="primary" @click="saveArticle()">保存</iv-button>
              <iv-button @click="cancel()">重置</iv-button>
            </iv-form-item>
          </iv-form>
          <br>
        </div>
      </iv-col>
      <iv-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
           <br>
          <new-article></new-article>
           <br>
          <recommend></recommend>
           <br>
          <hot-read></hot-read>
           <br>
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
import Recommend from '@/components/views/Recommend'
import TagWall from '@/components/views/TagWall'
import BrowseMore from '@/components/views/BrowseMore'
import HotRead from '@/components/views/HotRead'
import NewArticle from '@/components/views/NewArticle'
import MavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import marked from 'marked'
export default {
  components: {
    'recommend': Recommend,
    'tag-wall': TagWall,
    'browse-more': BrowseMore,
    'hot-read': HotRead,
    'new-article': NewArticle,
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
          underline: false, // 下划线
          strikethrough: false, // 中划线
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
      article: {},
      tagList: [],
      rules: {
        title: [
          {required: true, message: '标题不能为空', trigger: 'change'}
        ],
        content: [
          {required: true, message: '问题描述不能为空', trigger: 'change'}
        ]
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$axios.get('/category/tag/dic', {
      }).then(({data}) => {
        if (data && data.code === '000000') {
          // this.categoryOptions = treeDataTranslate(data.categoryList)
          this.tagList = data.data
        }
      })
    },
    // 保存文章
    saveArticle () {
      this.$refs['articleForm'].validate((valid) => {
        if (valid) {
          this.$axios.post('/ask/new', this.article)
            .then(({data}) => {
              if (data.code === '000000') {
                this.article = {}
                this.$Message.success('问题发布成功')
                this.$router.push({path: '/' + this.userName + '/ask/' + data.data})
              } else {
                this.$Message.error(data.msg)
              }
            })
        } else {
          return false
        }
      })
    },
    cancel () {
      this.article = {}
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
