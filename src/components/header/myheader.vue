<template>
  <div  class="ui_n_header1 header_bg1" style="min-width: 1024px;">
    <div class="ui_n_top">
      <div class="ui_author">
       <h2 style="margin: 0;font-family:jpx;">寄余生</h2>
      </div>
    </div>
    <div class="ui_header_panel" >
      <div class="wrap" style="height: 100%;">
        <div class="child" @click="goHomePage"><i class="icon-home3" style=""></i>首页<div class="bt">

        </div></div>
        <div class="child" @click="goPigeonhole"><i class="icon-books" style=""></i>归档<div class="bt">

        </div></div>
        <div class="child childmenu" style="position: relative;" ><i class="icon-menu3" style=""></i>清单<div class="bt">

        </div>

        <div class="ui_c_menu">
          <div style="position: relative;height: 100%;width: 100%;">
            <div class="ui_cm" @click="goMusic"><i class="icon-music ui_cm_c" ></i><p>我的音乐</p></div>
            <div class="ui_cm" @click="goCode"><i class="icon-github ui_cm_c" ></i><p>编程学习</p></div>
            <div class="ui_cm" @click="goBook"><i class="icon-quill ui_cm_c" ></i><p>我的书架</p></div>
          </div>
        </div>

        </div>
        <div class="child" @click="gologbook"><i class="icon-book" style=""></i>日志<div class="bt">

        </div></div>
        <div class="child"><i class="icon-pencil" style=""></i>留言<div class="bt">

        </div></div>
        <div class="child"><i class="icon-lab" style=""></i>实验<div class="bt">

        </div></div>
      </div>
    </div>
    <div class="ui_search_p">
      <div class="ui_img_c">
       <i class="ui_search_img"></i>
      </div>
    </div>
    <div class="ui_profile_p">
       <i class="ui_profile_img"></i>
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {

      }
    },
    methods: {

      goHomePage() {
       console.log(9)
       if (this.$route.path != '/page') { // index表示首页
         this.$router.push({path:'/page'}) // 切换到首页
       }else{
        this.$router.push({path:'/refresh',query:{path:this.$route.fullPath}})
       }
      },
      goPigeonhole() {
        this.$router.push({path:'/pigeonhole'})
      },
      gologbook() {
        this.$router.push({path:'/logbook'})
      },
      goMusic() {
        this.$router.push({path:'/music'})
      },
      goBook() {
        this.$router.push({path:'/books'})
      },
      goCode() {
        alert("暂未开发！")
      }

    },
    components: {
    },
    mounted () {
      },

    destroyed () {
    },

  }
</script>

<style>
  @import '../../../static/css/header/myheader.css';
  @import '../../../static/css/style.css';

  @font-face {
    font-family:jpx;
    src: url(../../../static/fonts/jpx.ttf);
  }

  


</style>
