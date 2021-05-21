<template>
  <div style="min-width: 1024px;width: 100%;height: 100%;background: white;position: relative;">
    <component :is="myheaderVeiw"></component>
    <div class="art_bg" style="height: 400px; width: 100%;margin-top: 75px;">
        <h1>开发日志</h1>
    </div>
    <!-- <div style="height: 475px;"></div>   -->
    <div class="log_content">
      <div v-for="(item,index) in logData" class="log_item_c">
        <span class="log_profile" >
          <img class="log_profile1" src="../../../static/img/login/profile.jpg" />
          <span class="log_bg log_main">
            <div v-html="produnctHtml(item)" class="ui_markdown"></div>
            <p class="log_time">
               <span>
                 <i class="icon-clock"></i>
                 {{item.create_time}}
               </span>
            </p>
          </span>
        </span>
      </div>
      <!-- <div class="log_showMore" style="margin-left: 45%;"> -->
        <h3 v-show="loadMore" style="text-align: center;font-size: 15px;color: #888;" @click="callback(currentPage+1)">显示更多</h3>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>

  import { queryLogbooks } from '@/assets/ajax/rootHttpConfig'
  import myheader from '../../components/header/myheader.vue'
  import marked from 'marked'
  export default {
    data () {
      return {
        logData: [],
        pageSize:10,
        page:0,
        currentPage:1,
        loadMore:false,
        myheaderVeiw:myheader
      }
    },

    created: function () {
        this.currentPage = 1;
        this.callback(1);
     },

    methods: {

      //获取markdown转HTML数据
      produnctHtml (data) {
        return marked(data.content);;
      },

      //日志分页请求
      callback: function (page) {
        this.pageNum = page;
        queryLogbooks({
          pageSize:this.pageSize,pageNum:page
        }).then((res) => {
           this.loadMore = true
           this.currentPage = page;
           // this.articleList.push.apply(this.articleList,res.acticleBgs);
           let totals = res.total;

           this.logData = [...this.logData,...res.logbooks];
           let l = this.logData.length;
           if(l==totals){
             this.currentPage = page-1;
             this.loadMore = false
           }
           this.pages = res.pages;
          }
        )

      }

    },
    components: {
      myheader
    },
    mounted() {
    }
  }

</script>

<style>
  @import url("../../../static/css/style.css");

  .ui_markdown {
    /* transition: all .3s ease 0s; */
  }

  .ui_markdown img {
    width: 300px;
    height: auto;
    /* transition: all .5s ease 0s; */
  }


  .art_bg h1 {
    /* font-family: jpx; */
    color: #D0D3D6;
    font-size: 40px;
    font-weight: 500;
    margin: auto;
    padding:150px;
    border: 0;
  }

  .art_bg {
    background-size: 100% 130%;
    background-image: url(../../../static/img/artcle/trace.jpeg);
    background-position: center;
  }

  .log-1{
    height: 50px;
    width: 100%;
  }

  .log_bg {
        /* background: linear-gradient(180deg,rgba(255, 165, 150, 0.5) 5%,rgba(0, 228, 255, 0.35) 95%) 0% 0% / cover, url(https://cdn.lixingyong.com/2020/07/24/82189222_p0.jpg) 0% 0% / cover; */
  }

  .log_time {
    margin-top: 10px;
    border-top: 1px dashed #fff;
    padding-top: 5px;
    font-size: 12px;
    /* transition: all .5s ease 0s; */
  }

  .log_main {
    margin: 0 0 45px 65px;
    z-index: 1;
    color: #000;
    padding: .8em 1.2em .4em 1.2em;
    /* font-size: 1.2em; */
    font-weight: 300;
    line-height: 1.4;
    position: relative;
    border-radius: 5px;
    transition: all .3s ease 0s;
    box-shadow: 0 1px 2px rgb(0 0 0 / 15%);
    cursor: pointer;
    display: block;
  }

  .log_main:hover{
     transform: translateZ(0) translateY(-5px);
     z-index: 1;
     box-shadow: 0 15px 32px rgba(0,0,0,.15)!important;
     transition: all .3s ease 0s;

  }

  .log_bg::after{
    right: 100%;
    border: solid transparent;
    z-index: -1;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    /* border-right-color: rgba(255, 165, 150, 0.5); */
    border-right-color: white;
    border-width: 10px;
    top: 4px;
  }

  .log_profile {
    text-align: left;
  }

  .ui_markdown p img {
    height: 200px;
    width: 100%;
     border-radius: 0%;
    float:none

  }

  /* .log_profile img {
    height: 48px;
    width: 48px;
    border-radius: 50%;
    float: left;

  } */

  .log_profile1{
    height: 48px;
    width: 48px;
    border-radius: 50%;
    float: left;
  }



  .log_item_c {
    padding: 0;
    margin: 30px 0 0 0;
    display: inline;
    position: relative;
    /* background-color: white; */


  }
  .log_content {
     margin-top: 30px;
     margin-bottom: 20px;
     max-width: 800px;
     padding: 0 10px;
     margin-left: auto;
     margin-right: auto;
     background-color: white;
     text-align: left;
     /* background-color: transparent!important; */
     /* background-color: #545554; */

  }
</style>
