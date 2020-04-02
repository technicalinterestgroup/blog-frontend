<template>
  <div class="index-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
       <div class="layout-left">
       <div style="text-align:center">
         <br>
         <h1>功能开发中，敬请期待！</h1>
          <br>
         <h5>功能开发中，敬请期待！</h5>
          <br>
       </div>
        </div>
      </iv-col>
      <iv-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <br>
          <about></about>
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>
<script>
import AboutWeb from '@/components/views/AboutWeb'
export default {
  name: 'Dashboard',
  components: {
    'about': AboutWeb
  },
  data () {
    return {
    }
  },
  created: function () {
  },
  watch: {
  },
  methods: {
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .index-content
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
    .layout-left
      background-color #fff
      padding 0
      @media only screen and (max-width: 768px)
        padding 0
      @media screen and (min-width: 768px)
        padding 0
      @media screen and (min-width: 992px)
        padding 0 10px
      @media screen and (min-width: 1200px)
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
