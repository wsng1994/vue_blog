<template>
 <div>
   <div class="site-content" style="background-color: rgba(255, 255, 255, 0.8);">
     <div class="notice" style="margin-top: 20px;">
       <i class="icon-volume-medium"></i>
       <div class="notice-content">
         该博客页面没有采用主题配置，完全用原生Vue开发，样式抄袭了 <a href="https://lixingyong.com/">Takagi</a> 的樱花主题，喜欢的话请移步 Takagi 大佬主页学习。
         该博客无任何盈利需求，纯属爱好。
       </div>
     </div>
     <div class="top-feature">
       <h1 class="fes-title">
         <i class="fa icon-heart"  aria-hidden="true">
         </i>
         <span> START:DASH!!</span>
       </h1>
       <div  class="top-feature-v2">
       		<div  class="the-feature square from_left_and_right">
       				<div class="img">
       					<img src="../../../static/img/artcle/code.png">
       				</div>
       				<div class="info">
       					<h3>
       						<span>编程生活</span>
       					</h3>
       					<p>
       						<span>在编程中寻找快乐</span>
       					</p>
       				</div>
       		</div>
       	</div>
        <div class="top-feature-v2" @click="goMusic()">
        		<div  class="the-feature square from_left_and_right">
        				<div class="img">
        					<img src="../../../static/img/music/music.jpeg">
        				</div>
        				<div class="info">
        					<h3>
        						<span>My music</span>
        					</h3>
        					<p>
        						<span>推荐一些我喜欢的音乐</span>
        					</p>
        				</div>
        		</div>
        	</div>
          <div  class="top-feature-v2" @click="gobooks()">
          		<div  class="the-feature square from_left_and_right">
          				<div class="img">
          					<img src="../../../static/img/artcle/book.jpeg">
          				</div>
          				<div class="info">
          					<h3>
          						<span>读书日志</span>
          					</h3>
          					<p>
          						<span>我的一些读书心得</span>
          					</p>
          				</div>
          		</div>
          	</div>
     </div>
     <div id="primary" class="content-area" >
       <div class="site-main">
         <h1 class="main-title">
         		<i class="fa icon-quill" aria-hidden="true"></i>
         		<span class="i18n" data-iname="home.discovery">发现</span>
         </h1>
         <div v-for="(item,index) in this.articleList" class="post post-list-thumb  post-list-show">
           <div class="act_wrap test_box" v-bind:class="{u_fr:index%2==0,u_fl:index%2==1}" style="width: 55%;height: 300px;">
              <div class="act_img">
              	<img v-bind:src="item.thumbnail">
              </div>
           </div>
           <div class="act_cont_wrap test_box" style="width: 45%;" >
               <div class="ui_post_date" v-bind:class="{u_tl:index%2==0,u_tr:index%2==1}">
                 <i class="icon-clock"></i>
                 <span>&nbsp;发布于 {{item.create_time|formatDate}}&nbsp;</span>
                 <i class="icon-fire"></i>
               </div>
               <div v-bind:class="{u_tl:index%2==0,u_tr:index%2==1}">
               <h3 class="p_title" @click="goBriefsInfo(item.id)"> {{item.title}}</h3>
               </div>
               <div class="ui_act_readinfo" v-bind:class="{u_tl:index%2==0,u_tr:index%2==1}">
                   <i class="icon-eye"></i>
                   <span>{{item.visits}}&nbsp;热度</span>
                   <i class="icon-bubble2"></i>
                   <span>20&nbsp;条评论</span>
                   <i class="icon-github"></i>
                   <span>开源项目</span>
               </div>
               <div class="ui_act_content" >
                   <p v-bind:class="{u_tl:index%2==0,u_tr:index%2==1}">
                     {{item.summary}}
                   </p>
               </div>
               <div class="ui_dt_bt">
                    <div class="ui_dot_c">
                     <i class="i_dot"></i>
                    </div>
               </div>
           </div>

         </div>

         <div class="ui_next_btn" @click="callback(curentPage+1)">
           <p class="ui_next">
             下一页
           </p>
         </div>
       </div>


     </div>


   </div>

 </div>
</template>

<script>

import { getUserInfo,getBriefsInfo} from '@/assets/ajax/rootHttpConfig'
import { formatDate } from '@/assets/utils/filterUtils'

export default {
  data () {
    return {
     scrollTop:0,
     pageSize:5,
     page:0,
     curentPage:1,
     hobbiesList:[
       {title:""},{title:""},{title:""}
     ],
     articleList:[]
    }
  },
  filters:{
    formatDate:formatDate
  },
  created: function () {
      this.curentPage = 1;
      this.callback(1);
   },
  methods: {

    goMusic () {
      this.$router.push({path:'/music'})
    },

    goBriefsInfo (bfs) {
      this.$router.push({path:'/article',query:{postId:bfs}})
    },
    gobooks () {
      this.$router.push({path:'/books'})
    },

    callback: function (page) {


      this.pageNum = page;

      getBriefsInfo({
        pageSize:this.pageSize,pageNum:page
      }).then((res) => {
        this.curentPage = page;

         console.log(res)
         // this.articleList.push.apply(this.articleList,res.acticleBgs);
         this.articleList = [...this.articleList,...res.acticleBgs];
         console.log(this.articleList)
         this.pages = res.pages;
        }
      )

    },


    //监听页面滚动
    scrollHander () {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.$emit('myScroll', this.scrollTop)
    }
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
<style>

  @import '../../../static/css/style.css';




  .u_tr {
    text-align: right;
  }
  .u_tl {
    text-align: left;
  }

  .ui_next:hover {
    color:#fe9600 ;
     border: 1px solid #fe9600;
  }


  .ui_next_btn {
    float: left;
    width: 100%;
    height: 100px;
    position: relative;
    margin: 20px 0 20px;
    opacity: 1;
    overflow: hidden;
  }
  .ui_next {
    line-height: 49px;
    width: 117px;
    height: 49px;
    border: 1px solid #ADADAD;
    position: absolute;
    border-radius: 25px;
    left: calc(50% - 60px);
    color: #ADADAD;
    text-align: center;
  }


  .u_fr {
    float: right;
  }
  .u_fl {
    float: left;
  }



  .ui_dot_c {
    position: absolute;
    overflow: hidden;
  }

  .i_dot:hover {
    background-image: url(../../../static/img/ico/dot_org.png);
  }

  .i_dot {
    display: inline-block;
    width: 30px;
    height: 20px;
    background-image: url(../../../static/img/ico/dot_gra.png);
    vertical-align: middle;
    background-size:cover;
    background-position:45% 50%;
    -moz-background-size:50% 50%;
    background-repeat: no-repeat;
  }

  .ui_dt_bt {
    position: relative;
    padding: 0 30px 0;
    text-align: left;
    font-size: 25px;
    color: #666666;
  }

  .ui_act_content p{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    height: 67.5px;
    overflow: hidden;
    font-size: 15px;

  }

  .ui_act_content {
    position: relative;
    z-index: 50;
    color: rgba(0,0,0,.66);
    padding: 0 30px 0;
    text-align: left;
  }

  .p_title:hover {
    color:#fe9600 ;
  }

  .ui_act_readinfo span {
    margin-left: 20px;
    margin-right: 10px;
  }

  .ui_act_readinfo {
    padding: 0 20px 0 30px;

  }

  .ui_act_readinfo i{
    margin-right: 5px;
    color: #989898;
    font-size: 14px;
    position: absolute;
    margin-top: 1px;
  }

  .ui_act_readinfo {
    color: #888;
    font-size: 12px;
    position: relative;
  }

  .act_cont_wrap  h3{
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-wrap: break-word;
    /* text-align: center; */
    padding: 0 30px;
  }


  .icon-fire:before {
    color: red;
  }

  .ui_post_date span {
    margin-left: 15px;
    margin-right: 4px;
  }

  .ui_post_date {
    transition: background 1s;
    padding: 30px 44px 0px 30px;
    color: #888;
    font-size: 12px;

  }


  .ui_post_date i {

    font-size: 14px;
    position: absolute;
    margin-top: 1px;
  }



  .act_cont_wrap {
    position: relative;
    display: inline-block;
    float: right;
    /* padding-right: 30px; */
    padding-left: 0;
    width: 40%;
    /* margin: 20px 10px 0; */
  }

  .act_wrap {

    overflow: hidden;
  }

  .act_wrap .act_img img{
    width: 400px;
    height: 300px;
    transition: all .35s ease-in-out;
    transform: scale(1.2)

  }

  .act_wrap:hover .act_img img{
    transition: all .35s ease-in-out;
    transform: scale(1.5)
  }


  .test_box {
    /* border: 0.1px solid #0000FF; */
  }

  .post-list-thumb {
    float: left;
    width: 100%;
    height: 300px;
    position: relative;
    margin: 20px 0 20px;
    border-radius: 10px;
    background-color: rgba(255,255,255,0);
    box-shadow: 0 1px 20px -6px rgb(0 0 0 / 50%);
    opacity: 1;
    transition: box-shadow .3s ease;
    overflow: hidden;
  }

  h1.main-title {
      color: #666;
      font-size: 16px;
      font-weight: 400;
      padding-bottom: 5px;
      margin-bottom: 30px;
      border-bottom: 1px dashed #ececec;
  }

  .site-main {
    padding: 40px 0 0;
  }

  .top-feature-v2{
    display: inline-block;
    margin: 3px;
  }

  .top-feature-v2:hover .the-feature.from_left_and_right .info h3 {
    transform: translateX(0%);

  }
  .top-feature-v2:hover .the-feature.from_left_and_right .info p {
    transform: translateX(0%);

  }
  .top-feature-v2:hover .the-feature.from_left_and_right .info {
    visibility: visible;
    opacity: 1;
  }

  .top-feature-v2:hover .the-feature img{
    transition: all .35s ease-in-out;
    transform: scale(1.5);
  }


  .the-feature img {
      height: 160px;
      width: 256px;
      transition: all .35s ease-in-out;
  }


  .the-feature.from_left_and_right .img {
      transition: all .35s ease-in-out;
      transform: scale(1);
  }
  .the-feature.from_left_and_right .info {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      background: #333;
      background: rgba(0,0,0,.6);
      visibility: hidden;
      opacity: 0;
      transition: all .35s ease-in-out;
  }

  .the-feature.from_left_and_right .info h3 {
      text-transform: uppercase;
      color: #fff;
      text-align: center;
      font-size: 17px;
      padding: 10px;
      background: #111;
      margin: 30px 0 0;
      transition: all .35s ease-in-out;
      transform: translateX(-100%);
  }


  .the-feature.from_left_and_right .info p {
      font-style: italic;
      font-size: 12px;
      position: relative;
      color: #bbb;
      padding: 20px;
      text-align: center;
      transition: all .35s .1s linear;
      transform: translateX(100%);
  }

  .the-feature {
    transition: all .35s ease-in-out;
  }

  .the-feature.from_left_and_right {
      position: relative;
      height: 160px;
      width: 256px;
      box-shadow: 1px 1px 3px rgb(0 0 0 / 30%);
      overflow: hidden;
      border-radius: 10px;
  }

  .top-feature {
    width: 100%;
    height: auto;
    margin-top: 55px;
    animation: main .6s;
  }

  @keyframes main{
    0% {
        opacity: 0;
        transform: translateY(50px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
  }

  h1.fes-title, h1.main-title {
      transition: color 1s;
      transition: border 1s;
      color: #666;
      font-size: 16px;
      font-weight: 400;
      padding-bottom: 5px;
      margin-bottom: 30px;
      border-bottom: 1px dashed #ececec;
      text-align: left;
  }



  .notice-content {
    display: initial;
    vertical-align: middle;
  }

  .icon-volume-medium:before {
      content: "\EA27";
      /* font-family: "icomoon" !important; */
      font-size: 18px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      padding-bottom: 10px;
  }

  .notice {
    padding: 20px;
    border: 1px dashed #e6e6e6;
    color: #969696;
    position: relative;
    display: inline-block;
    background: #fbfbfb50;
    border-radius: 10px;
    text-align: left;
  }

  .notice i {
    float: left;
    color: #999;
    font-size: 24px;
    padding-right: 6px;
    vertical-align: middle;
    line-height: 20px;
    height: 25px;
  }


 .site-content {
   max-width: 800px;
   padding: 0 10px;
   margin-left: auto;
   margin-right: auto;
   background-color: transparent!important;
   }


.child_h:hover{

 background-color: #D5E4F8;

}

</style>
