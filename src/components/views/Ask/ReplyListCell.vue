<template>
  <div class="article-cell">
    <a>
      <iv-row type="flex">
        <iv-col :xs="24" :sm="24" :md="24" :lg="24"  style="padding-left: 0;padding-right: 0;">
          <div class="text-wrapper">
            <div class="tags">
              <iv-tag v-if="article.state===0" :color="article.state | mapTagColor"  type="border" ><a @click="adoption(article)">采纳</a></iv-tag>
              <iv-tag v-if="article.state===1" :color="article.state | mapTagColor"  type="border" >已采纳</iv-tag>
            </div>
            <div class="desc">
            <ask-page-content>
              <article id="article-main-page"  slot="content" ref="article"
                      v-html="article.contentFormat">
              </article>
            </ask-page-content>
             </div>
             <p class="operate_info">
                    <span class="userName"><a  @click="selectMenu('/'+article.userName)"><iv-icon type="ios-contact"></iv-icon>  {{article.userName}}</a></span>
                    <span class="publish-time"><a><iv-icon type="ios-create"></iv-icon>{{article.createTime}} </a></span>
                    <span class="likes" v-if=!article.vLike><a @click="likePost(article)"><iv-icon type="ios-thumbs-up"></iv-icon> {{article.likeCount}} 点赞</a></span>
                    <span class="likes" v-if=article.vLike><a ><iv-icon type="ios-thumbs-up" color="#F78F8F"></iv-icon> {{article.likeCount}} 已赞</a></span>
              </p>
              <br>
          </div>
        </iv-col>
      </iv-row>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
import { mixin } from '@/utils'
import AskPageContent from './AskPageContent'
export default {
  components: {
    'ask-page-content': AskPageContent
  },
  props: {
    article: {
      Type: Object
    }
  },
  mixins: [mixin],
  methods: {
    selectMenu (url) {
      console.log('url' + url)
      this.$router.push(url)
    },
    adoption (article) {
      // 查询文章详情
      this.$axios.get('reply/adoption', {
        params: {
          id: article.id
        }
      }).then(({data}) => {
        if (data && data.code === '000000') {
          this.$Message.success('采纳成功')
          article.state = 1
        } else {
          this.$Message.error(data.msg)
        }
      })
    },
    // 点赞
    likePost (post) {
      this.$axios.get('/like/new/' + post.id, {
        params: {
          type: 4
        }
      }).then(({data}) => {
        if (data && data.code === '000000') {
          this.$Message.success(data.msg)
          post.likeCount += 1
          post.vLike = true
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
    margin-bottom 15px
    > a
      display block
      cursor default
      border 1px solid $color-border
      &:hover
        border 1px solid $color-border-hover
        box-shadow 2px 2px 3px $color-border
      .text-wrapper
        padding 20px 20px 0 20px
        text-align left
        @media only screen and (max-width: 768px)
          padding 15px 15px 0 15px
        .title
          font-size 23px
          font-weight 100
          line-height 27px
          span.special
            border-radius $border-radius
            font-size 12px
            font-weight 100
            padding 3px 5px
            margin-left 1px
            vertical-align top
            color $default-background-color
            background #FF3030
            cursor pointer
          a
            color $color-typegraphy-title
            cursor pointer
            &:hover
              color $color-typegraphy-title-hover
              text-decoration underline
        .info
          margin-top 10px
          font-size 14px
          line-height 18px
          font-weight 200
          a
            color: #777
            cursor pointer
            &:hover
              color $color-main-primary
              text-decoration underline
          .publish-time
            margin-left 20px
        .line
          width 50px
          margin-top 30px
          border-1px(rgba(7, 17, 27, 0.4))
          &::after
            margin-bottom 15px
        .tags
          /*cursor: pointer;*/
          margin: 8px 0
        .desc
          color #666
          font-size 14px
          line-height 20px
          font-weight 200
          a
            color $color-main-primary
            font-weight 500
            cursor pointer
            &:hover
              text-decoration underline
        .operate_info
          margin-top 10px
          font-size 14px
          line-height 18px
          font-weight 200
          span
            margin-right 8px
            + span
              margin-left 8px
            a
              cursor pointer
              &:hover
                color $color-main-primary
                text-decoration underline
        .operate_info_1
          text-align right
          font-size 14px
          margin 15px 0
          @media only screen and (max-width: 768px)
            text-align left
          span
            margin-right 8px
            + span
              margin-left 8px
            a
              cursor pointer
              &:hover
                color $color-main-primary
      .img-wrapper
        padding-bottom: 85%
        width: 100%
        height: 0
        overflow hidden
        &.big-image
          padding-bottom 26%
        img
          width 100%
</style>
