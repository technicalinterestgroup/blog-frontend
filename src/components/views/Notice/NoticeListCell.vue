<template>
  <div class="article-cell">
    <a @click="changeView(notice)">
      <iv-row type="flex">
        <iv-col :xs="16" :sm="18" :md="18" :lg="20" style="padding-left: 0;padding-right: 0;">
          <div class="text-wrapper">
            <iv-row>
              <iv-col span='3'>
               <iv-badge v-if="!notice.isView" status="error"  size="5px"/>
               <iv-badge v-if="notice.isView" status="default"  size="5px"/>
                <iv-tag v-if="notice.typeCN" size="medium"  type="border" >{{notice.typeCN}}</iv-tag>
              </iv-col>
              <iv-col>
                <p class="desc"><a @click="selectMenu('/'+notice.userName)">{{notice.userName}}
                </a>
                {{msg}}
                </p>
             </iv-col>
            </iv-row>
            <h5 class="title">
              <a @click="selectMenu('/'+notice.sourceUserName+'/article/'+notice.sourceId)">{{notice.title}}</a>
            </h5>
          </div>
        </iv-col>
        <iv-col :xs="8" :sm="6" :md="6" :lg="4">
          <div calss="text-wrapper" style="padding:20px 20px 0 20px;text-align:right">
            <!-- <a @click="del(notice.id)"><iv-icon type="ios-trash-outline"></iv-icon>
            </a> -->
            <br>
            <a>
             <p style="line-height:30px">{{notice.createTime}}
            </p></a>
          </div>
        </iv-col>
      </iv-row>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    notice: {
      Type: Object
    },
    type: '',
    msg: ''
  },
  computed: {
  },
  methods: {
    selectMenu (url) {
      console.log('url' + url)
      let routeData = this.$router.resolve(url)
      window.open(routeData.href, '_blank')
    },
    changeView (param) {
      this.$emit('changeView', param)
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
          font-size 15px
          font-weight bold
          line-height 30px
          a
            color $color-typegraphy-title
            cursor pointer
            &:hover
              color $color-typegraphy-title-hover
              text-decoration underline
        .desc
          text-align left
          color #666
          font-size 14px
          line-height 26px
          font-weight 200
          a
            color $color-main-primary
            font-weight 500
            cursor pointer
            &:hover
              text-decoration underline
</style>
