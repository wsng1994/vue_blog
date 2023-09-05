<template>
  <div style="min-width: 1024px;width: 100%;height: 100%;background: transparent;position: relative;">
    <div id="head" class="ui_n_header" v-bind:class="{header_bg:this.scrollTop>10}" style="min-width: 1024px;">
      <div class="ui_n_top">
        <div class="ui_author">
         <h2 style="margin: 0;font-family:jpx;">寄余生</h2>
        </div>
      </div>
      <div class="ui_header_panel1" v-bind:class="{scroll_header:this.scrollTop>10}">
        <div class="wrap" style="height: 100%;">
          <div class="child" @click="goHomePage"><i class="icon-home3" style=""></i>首页<div class="bt">

          </div></div>
          <div class="child" @click="goPigeonhole"><i class="icon-books" style=""></i>归档<div class="bt">

          </div></div>
          <div class="child childmenu1" style="position: relative;"><i class="icon-menu3" style=""></i>清单<div class="bt">

          </div>
          <div class="ui_c_menu1">
            <div style="position: relative;height: 100%;width: 100%;">
              <div class="ui_cm1" @click="goMusic"><i class="icon-music ui_cm_c1" ></i><p>我的音乐</p></div>
              <div class="ui_cm1" @click="goCode"><i class="icon-github ui_cm_c1" ></i><p>编程学习</p></div>
              <div class="ui_cm1" @click="goBook"><i class="icon-quill ui_cm_c1" ></i><p>我的书架</p></div>
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
    <div class="ui_main_act" style="position: absolute;top: 43%;">
      <!-- <div  class="title_panel">
       <div class="ui_anm_font amn_font hv" >Hi,Cooper!</div>
      </div> -->
      <ul class="title_panel">
        <li class="ui_anm_font hv" data-text="New world!">
          New world!
        </li>
        <li class="header_info">
          <p>
            <i class="fa icon-quotes-left"></i>
            僕だけが目の前のIsland，まだ届かなそうで怖いんだもうey
            <i class="fa icon-quotes-right"></i>
          </p>
          <!-- <div class="share_list" >
            <li ><i class="icon-ctrl2"></i></li>
            <li >QQ</li>
            <li >GIT</li>
            <li >BIL</li>
            <li >NTES</li>
            <li >JIAN</li>
            <li >ZH</li>
            <li >CSDN</li>
            <li ><i class="icon-ctrl1"></i></li>
          </div> -->
        </li>
      </ul>
    </div>
    <div class="ui_down" style="position: absolute;bottom: 50px;}" @click="changeScroll">
    <div class="headertop-down faa-float animated">
      <span>
        <i class="fa fa-chevron-down icon-ctrld" aria-hidden="true"></i>
      </span>
    </div>
    </div>
    <div ref="page" class="site wrapper" style="height: 50px;width: 100%;">
      <component :is="subjectView" ></component>
    </div>
    <!-- 用作特殊锚点 -->
    <div ref="hhhh" class="hhhh">999</div>
  </div>
</template>

<script>
import subjectAct from '../../components/subject/subjectAct.vue'
export default {
  data () {
    return {
      text: '大人者，不失其赤子之心者也.置身于三教九流之所,仍保苍松翠柏之性;落魄于藏污纳垢之地,亦有霁月清风之心;见浊流而不随,见火热而不附.',
      subjectView:'subjectAct',
      scrollTop:0,
      isShow:false,
    }
  },
  methods: {

    //goHomePage

    goHomePage() {
     console.log(9)
     if (this.$route.path != '/page') { // index表示首页
       this.$router.push({path:'/page'}) // 切换到首页
     }else{
      this.$router.push({path:'/refresh',query:{path:this.$route.fullPath}})
     }
    },
    gologbook() {
      this.$router.push({path:'/logbook'})
    },
    goPigeonhole() {
      this.$router.push({path:'/pigeonhole'})
    },
    goMusic() {
      this.$router.push({path:'/music'})
    },
    goBook() {
      this.$router.push({path:'/books'})
    },
    goCode() {
      this.$router.push({path:'/codeLaboratory'})
    },
    //监听页面滚动
    scrollHander () {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.$emit('myScroll', this.scrollTop)
    },
    play: function () {
      let audio = document.getElementById('musicMp3')
      if (this.isPlay) {
        audio.pause()
        this.isPlay = false
        this.doBofang = true
      } else {
        audio.play()
        this.isPlay = true
        this.doBofang = false
      }
    },
    changeScroll:function() {
      this.scrollTop = document.documentElement.clientHeight;

      this.$refs.hhhh.scrollIntoView({ behavior: "smooth" });

      console.log(this.scrollTop)
    }

  },
  components: {
    subjectAct
  },
  mounted () {
     let  _this = this
     	// this.throttleLoad = throttle(() =>{
     	// 	_this.scrollHander()
     	// },200)
     	window.addEventListener('scroll', this.scrollHander)
    },

  destroyed () {
  	window.removeEventListener('scroll',this.scrollHander)
  },

}
</script>
<style scoped>
  @import '../../../static/css/style.css';
  @import '../../../static/css/homepage/homePage.css';

  @font-face {
    font-family:jpx;
    src: url(../../../static/fonts/jpx.ttf);
  }

  /* @font-face {
    font-family:icomoon;
    src: url(../../../static/fonts/icomoon.ttf);
  } */





</style>
