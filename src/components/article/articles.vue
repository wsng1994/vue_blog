<template>
  <div style="min-width: 1024px;width: 100%;height: 100%;background: white;position: relative;">
    <component :is="myheaderVeiw"></component>
    <div class="art_bg" style="height: 400px; width: 100%; ;position: relative;top: 75px;">
        <img style="width: 100%;height: 400px;" :src="this.url" >
        <div class="ui_art_ins">
          <div class="ui_art_ins_c" style="font-size: 32px;color: white;">
             &nbsp{{this.title}}
          </div>
          <div class="ui_art_ins_c" style="padding-top: 20px;">
               <i class="ui_profile_img1"></i><span style="margin-left: 10px;color: white;font-size: 14px;">寄余生</span>
               <span class="ui_bull">·</span><span>{{this.creatTime |formatDate}}</span><span class="ui_bull">·</span><span>{{this.readTimes}}次阅读</span>
          </div>

        </div>
    </div>
    <div class="" style="position: absolute;top: 475px ;width: 100%;">
      <div id="article" style=";max-width: 800px;
    padding: 0 10px;
    margin-left: auto;
    margin-right: auto;
    background-color: transparent!important;">

          <div v-html="arts" class="ui_markdown" style="text-align: left;"></div>

          <div style="width: 100%;border-top: 1px dashed #888;margin-top:100px">
            文章到此结束
          </div>
          <div style="width: 100%;margin-top: 50px;">
            <component :is="commentsVeiw" :pid="this.pid"></component>
          </div>
      </div>
    </div>


  </div>
</template>

<script>
  import myheader from '../../components/header/myheader.vue'
  import comments from '../../components/article/comments'
  import marked from 'marked'
  import hljs from "highlight.js"; // 引入 highlight.js
  // import "highlight.js/styles/monokai-sublime.css";
  import { getArticleInfo } from '@/assets/ajax/rootHttpConfig'

  import { formatDate } from '@/assets/utils/filterUtils'

  export default {
    data () {
      return {
        myheaderVeiw:myheader,
        commentsVeiw:comments,
        arts:'',
        creatTime:'',
        readTimes:0,
        title:'',
        url:'',
        pid:'',
        a:''
      }
    },
    created() {
      this.addArt();
    },
    methods: {

      addHighLight (code) {
        var rendererMD = new marked.Renderer();
            marked.setOptions({
              renderer: rendererMD,
              highlight: function(code) {
                return hljs.highlightAuto(code).value;
              },
              pedantic: false,
              gfm: true,
              tables: true,
              breaks: false,
              sanitize: false,
              smartLists: true,
              smartypants: false,
              xhtml: false
            });
            this.arts = marked(code);// 将markdown内容解析

      },


      addArt () {

        //后面跳转路径多时加上该判断
        // let pa = this.$route.query.bfs

        this.a = this.$route.query.bfs;

        console.log(this.a);
        if(this.a!=null&&this.a!=undefined){
          this.creatTime = this.a.create_time;
          this.title = this.a.title;
          this.readTimes = this.a.visits
          this.url = this.a.thumbnail
          this.pid = ""+this.a.id
          this.addHighLight(this.a.original_content)
          // this.arts = marked();
        }else {
          let id = this.$route.query.postId
          this.pid = ""+id;
          this.queryArticle(id)
        }

      },

      //根据Id查询文章
      queryArticle (postId) {
        getArticleInfo({
          id:''+postId
        }).then((res) => {
           console.log(res)
           let artInfo = res.articleInfo;
           this.creatTime = artInfo.create_time;
           this.title = artInfo.title;
           this.readTimes = artInfo.visits
           this.url = artInfo.thumbnail
           this.addHighLight(artInfo.original_content)
           // this.arts = marked(artInfo.original_content);

          }
        )
      },



      //goHomePage
      goHomePage() {
       console.log(9)
       if (this.$route.path != '/page') { // index表示首页
         this.$router.push({path:'/page'}) // 切换到首页
       }else{
        this.$router.push({path:'/refresh',query:{path:this.$route.fullPath}})
       }
      }


    },
    components: {
      myheader,
      comments
    },

    filters:{
      formatDate:formatDate
    },
    mounted () {
         // this.addArt();
      },

    destroyed () {
    },

  }
</script>

<style>
  @import '../../../static/css/header/myheader.css';
  @import "../../../static/css/markdown/styles/darcula.css";



  .ui_art_ins_c span{
    color: white;
    font-size: 14px;
    font-weight: bold;
  }

  .ui_bull{
    margin: 0 5px;
  }

  .ui_markdown p img {
    height: 300px;
    width: 100%;
  }

  .ui_art_ins {
    position: absolute;width: 100%;top: auto;
    bottom: 30px;
  }

  .ui_art_ins_c {
    padding: 0 10px;max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
  }

  .ui_profile_img1 {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    background-image: url(../../../static/img/login/profile.jpg);
    background-repeat:no-repeat ;
    background-size:cover;
    background-position: 50% 50%;
    vertical-align: middle;
    display: inline-block;
  }

  .art_bg {
    /* background-size: 100% 130%;
    background-image: url(../../../static/img/artcle/trace.jpeg);
    background-position: center; */
  }
</style>
