<template>
  <div class="article-cell">
    <a>
      <iv-row type="flex">
        <iv-col :xs="24" :sm="24" :md="24" :lg="24" :order="textOrderType" style="padding-left: 0;padding-right: 0;">
          <div class="text-wrapper">
             <iv-row>
              <iv-col :xs="20" :sm="20" :md="20" :lg="20">
                <h4 class="title">
                  <a  @click="selectMenu('/'+ask.userName+'/ask/'+ask.id)">{{ask.title}}</a>
                  <span class="special" v-if="ask.state===1" title="已解决">已解决</span>
                </h4>
                <div class="tags">
                  <iv-tag v-if="ask.tagId" :color="ask.tagId | mapTagColor"  type="border" >{{ask.tagCN}}</iv-tag>
                </div>
              </iv-col>
              <iv-col :xs="4" :sm="4" :md="4" :lg="4" >
                <div style="float:right"><span class="special"  title="回答数">
                  回答 {{ask.replyCount}}</span>
                </div>
              </iv-col>
            </iv-row>
             <p class="desc">{{ask.description | textLineBreak(70) }}<a  @click="selectMenu('/'+ask.userName+'/ask/'+article.id)"> 查看更多
              <iv-icon type="arrow-right-b"></iv-icon>
            </a>
            </p>
            <p class="operate_info">
                <span class="publish-time"><a><iv-icon type="ios-create" ></iv-icon>  {{ask.createTime}} 来自</a></span>
                <span class="userName"><a  @click="selectMenu('/'+ask.userName)"><iv-icon type="ios-contact"></iv-icon>  {{ask.userName}}   </a></span>
                <span class="readings" style="float:right"><a ><iv-icon type="ios-eye-outline"></iv-icon> {{ask.readCount}} 浏览</a></span>
            </p>
          </div>
        </iv-col>
      </iv-row>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
import { mixin } from '@/utils'
export default {
  props: {
    ask: {
      Type: Object
    },
    type: ''
  },
  mixins: [mixin],
  methods: {
    selectMenu (url) {
      console.log('url' + url)
      this.$router.push(url)
      // .catch(data => {})
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
            background #FB5145
            cursor pointer
          a
            color $color-typegraphy-title
            cursor pointer
            &:hover
              color $color-typegraphy-title-hover
              text-decoration underline
        span.special
            border-radius $border-radius
            font-size 15px
            font-weight 700
            line-height 30px
            padding 8px 10px
            margin-left 1px
            vertical-align top
            color $default-background-color
            background #81C27E
            cursor pointer
            text-align center
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
          margin-bottom  10px
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
