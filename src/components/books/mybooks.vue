<template>
  <div class="i_bg" style="width: 100%;height: 100%;background: white;position: relative;">
    <component :is="myheaderVeiw"></component>

    <div class="i_memo "  style="width: 90%;position: relative;margin-top: 120px;text-align: right;margin-right: auto;margin-left: auto;">
      <div class="i_memo_ct" style="width: 200px;height: 80px;position: absolute;right: 0;">
         <p v-if="read" @click="showMarkDown"> The pen to you <i class="icon-quill"></i></p>
         <p v-else style="font-size: 24px;"> <span class="cmt" @click="showMarkDown">Commit</span>
         <span class="cmt" @click="Irefresh">&nbsp;Back</span></p>
      </div>

    </div>
    <div class="markdown-ct md">
      <div class="i_name" style="text-align: left;">
        <input type="text"  placeholder="请输入书名······"  />
        <input type="text"  style="width: 400px;margin-left: 20px;" placeholder="请输入简介······"  />
      </div>
      <p style="text-align: left;font-size: 14px;color: #999;">注：markdown中的插入的第一张图片设为封面图片，没有则使用默认封面</p>
      <component :is="markdownView" @eventMarkdown="getMarkdownData($event)"></component>
    </div>

        <div id="magazine" class="i_b sidebar markdown-data" >
          <div v-for="(item, index) in allPages" >
            <div>
              <footer v-if="item.page > 1 && item.page < allPages.length-2" class="current-page">
                <div v-if="item.page % 2 == 0" class="even-numbers">
                  {{ item.page -1}}
                </div>
                <div v-else class="odd-number">{{ item.page -1}}</div>
              </footer>
              <div class="book_content" >
                <div class="i_books"
                :class="{i_radius1:index%2==1,i_radius0:index%2==0,
                i_books_bg0:index==0||index==allPages.length-1,
                i_books_bg1:index>0&&index<allPages.length-1&&index%2==0,
                i_books_bg2:index>0&&index<allPages.length-1&&index%2==1
                }"
                >

                  <div class="i_book_cv" v-if="index==0">
                    <h1>Books I like to read</h1>
                    <p style="margin-top: 150px;"> &nbsp;&nbsp;&nbsp;&nbsp;Missing many years ago, in the network and mobile phone has not yet been popularized, sitting in the house carefully reading "how the steel is tempered" of their own.</p>

                    <div class="i_author" style="font-family:mk;color: #888; margin-right: 20px;text-align: right;">--------------------Sean&nbsp;&nbsp;<i class="icon-quill"></i></div>
                    <div class="go_read" style="">
                      read it
                    </div>
                 </div>

                  <div class="i_book_cv" v-if="(index!=allPages.length-2&&index>2&&index!=allPages.length-1)&&index!=0">
                  <div v-if="index%2==0">
                    <div v-html="produnctHtml()" class="i_markdown"></div>
                    <div class="go_read" style="">
                      read it
                    </div>
                  </div>
                  <div class="i_catalogue i_book_ct" v-if="index%2==1">
                    <img src="../../../static/img/book/steel.jpeg" />
                    <h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;人最宝贵的是生命，生命对人来说只有一次。人的一生应当这样度过∶当回忆往事的时候，他不会因为虚度年华而悔恨，也不会因为碌碌无为而羞愧。</h5>
                  </div>
                  </div>
                  <div class="i_catalogue i_book_ct" v-if="index==1">
                    <img src="../../../static/img/book/bookMoon.jpeg" />
                    <h4> 吹灭读书灯 一身都是月</h4>
                  </div>
                  <div class="i_catalogue i_book_ct" v-if="index==2">
                    <h1>目录</h1>
                    <div v-for="(item, index) in allPages" style="margin-left: 150px;margin-top: 25px;">
                      <div>《第一本书》<span>···········································</span>1</div>
                    </div>
                    <div class="go_read" style="">
                      read it
                    </div>
                  </div>

                  <div class="i_book_cv" v-if="index==allPages.length-2">
                    <h1>POSTSCRIPT :</h1>
                    <p style="font-size: 14px;"> &nbsp;&nbsp;&nbsp;&nbsp;回想起很多年前，虽然那时的物质资源没有现在丰富，信息也十分闭塞，但是自己却能无忧无虑，对未来充满信心和向往，对于书本更是能静下心来，读得津津有味。而现在，虽然物质资源更加丰富，我却再也不是曾经那个无忧无虑并对未来充满信心的自己。现在重拾书本，祈求着它能使我躁动不安的心灵得以平静、找回真正的自我。</p>
                    <div class="go_read" style="">
                      fin
                    </div>
                  </div>
                  <div class="i_book_cv" v-if="index==allPages.length-1">
                    <h2>Thank you for reading</h2>

                    <p style="margin:20px 0 20px 130px ;color: #3e3d3e;font-weight: bold;">《Do not go gentle into that good night》</p>
                    <p> Do not go gentle into that good night,</p>
                    <p>Old age should burn and rave at close of day</p>
                    <p>Rage, rage against the dying of the light.</p>
                    <p>Though wise men at their end know dark is right,</p>
                    <p>Because their words had forked no lightning they</p>
                    <p>Do not go gentle into that good night.</p>
                    <p>Good men, the last wave by,</p>
                    <p>crying how bright Their frail deeds might have danced in a green bay,</p>
                    <p>Rage, rage against the dying of the light.</p>
                    <p>Wild men who caught and sang the sun in flight,</p>
                    <p>And learn, too late, they grieved it on its way,</p>
                    <p>Do not go gentle into that good night.</p>
                    <p>Grave men, near death, </p>
                    <p>who see with blinding sight Blind eyes could blaze like 4)meteors and be gay,</p>
                    <p>Rage, rage against the dying of the light.</p>
                    <p>And you, my father, there on the sad height,Curse, bless,</p>
                    <p>me now with your fierce tears, I pray.</p>
                    <p>Do not go gentle into that good night.</p>
                    <p> Rage, rage against the dying of the light.</p>
                    <div class="go_read" @click="Irefresh" style="">
                      organize books
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>




  </div>
</template>

<script>
  import turn from '@/assets/utils/turn.js'

  import { queryLogbooks,uploadBooksInfo } from '@/assets/ajax/rootHttpConfig'
  import myheader from '../../components/header/myheader.vue'
  import marked from 'marked'
  import markdown from '../markdown/markdown.vue'
  export default {
    data () {
      return {
            read:true,
            isSelectFile: false,
            imgUrl: "",
            myheaderVeiw:myheader,
            markdownView:markdown,
            value: "",
            page: 1,
            orgWidth:620,
            screenWidth:document.body.clientWidth,
            allPages: [
              {
                page: 0,
                name: "aa"
              },
              {
                page: 1,
                name: "aa"
              },
              {
                page: 2,
                name: "aa"
              },
              {
                page: 3,
                name: "aa"
              },
              {
                page: 4,
                name: "aa"
              },
              {
                page: 5,
                name: "aa"
              },
              {
                page: 6,
                name: "aa"
              },
              {
                page: 7,
                name: "aa"
              }
            ],
            markdownData:''
          };
    },

    created: function () {
        this.currentPage = 1;
        this.callback(1);
     },

    methods: {

      getMarkdownData (data) {
        console.log(data)
        this.markdownData = data;
      },

      showMarkDown () {
         if(this.read){
           const sidebarElement = document.querySelector('.sidebar');
           const sd = document.querySelector('.md');
           sidebarElement.style.setProperty('--left-pos', '-2000px');
           sd.style.setProperty('--i-margin', '100px');
           this.read = false
         }else {
           //判断提交
           //books信息非空判断
           uploadBooksInfo({
             params:this.markdownData
           }).then((res) => {
             this.Irefresh();
             }
           )

         }
      },

      //获取markdown转HTML数据
      produnctHtml () {
        var data = '<h5 id=\"文章排版测试\">文章排版测试</h5>\n<blockquote>\n<p>如何排版markdown</p>\n</blockquote>\n<ol>\n<li>“ 人应该抓紧每一分钟，去做最充实的事。”保尔.柯察金用他青春时代的经历对这句话作了最好的诠释。他的青春他的时间大部分都献给了他热衷的事业，为此贫穷、苦难、病痛、自责都没能夺去他的生命，而生活却使他拥有了充实于壮美。</li>\n<li>十二岁因为往神父的复活节面团里撒烟灰被神父从学校开除，后来又在车站食堂做了两年的底层工人，在车站食堂这一段时间保尔窥见了生活的最深处最底层，这些经历也为后来他参加革命做了铺垫。虽然这些情节早已熟记于心，但是现在又重新翻阅却有着太多和以前不同的感悟。</li>\n<li>保尔的年龄和我相近但他的心智却比我成熟太多。他身上有着太多的光辉和特性值得我学习，面对士兵的严刑拷打宁愿牺牲自己也不出卖朋友；面对选择时有准确的分析判断能力；对于爱情有正确的观念；为了热爱的事业甘愿投入所有精力和生命……这些特性里随便拿一项放到另一个人身上就能成就不平凡的人，可是在保尔身上却又显得是那么普通，就如同慢慢夜空觉得它是那么平凡但仔细观察那些散发出微弱光芒的星辰每一颗都无法替代都值得珍惜。</li>\n<li>保尔虽然是用笔在纸上描写出来的人物，文字构成了他的一生，但他却是那么的鲜活完整，他的整个生命和全部精力都已献给了世界上最壮丽的事业，读书的过程就是从旁观者的角度观察他，学习他身上优秀的品质，不断学习才能在以后回首往事的时候，才不会因为虚度年华而悔恨，也不会因庸庸碌碌而羞愧。</li>\n<li>其实对于这部作品我现在的记忆也只剩下保尔和冬妮娅初遇时的情景，但是生活并不是童话。充满着挫折与遗憾，对此能保持本心坚定的走下去，能在以后<em>回首往事的时候，才不会因为虚度年华而悔恨，也不会因庸庸碌碌而羞愧</em>。这样的一生也算是无憾了。</li>\n</ol>\n';
        return marked(data);
      },

      Irefresh:function (){
        this.$router.push({path:'/refresh',query:{path:this.$route.fullPath}})
      },

      //日志分页请求
      callback: function (page) {
        this.pageNum = page;
      }

    },
    components: {
      myheader,
      markdown
    },
    mounted() {

      let that = this;
      window.addEventListener('resize', function() {
      return (() => {
      window.screenWidth= document.body.clientWidth;
      that.screenWidth= window.screenWidth;
      })();
      });

      let self = this;
      $("#magazine").turn("page");
      this.$nextTick(() => {
        $("#magazine").turn({
          display: "double",
          elevation: 50,
          duration: 100,
          gradients: true,
          autoCenter: true,
          acceleration: true,
          gradients: !$.isTouch,
          page: self.page,
          width: 1240,
          when: {
            turned: function(e, page, pages) {
              //当前页
              console.log("Current view: ", $(this).turn("view"));
              if($(this).turn("view")[1]==0) {
                let mgwd =  (self.screenWidth-1240)/2 + 310;
                let mg = mgwd + 'px';
                const sidebarElement = document.querySelector('.sidebar');
                console.log(sidebarElement)
                sidebarElement.style.setProperty('--left-pos', mg);
              }else if($(this).turn("view")[0]==0){
                let mgwd =  (self.screenWidth-1240)/2 - 310;
                let mg = mgwd + 'px';
                const sidebarElement = document.querySelector('.sidebar');
                console.log(sidebarElement)
               sidebarElement.style.setProperty('--left-pos', mg);
              }else {
                let mgwd =  (self.screenWidth-1240)/2;
                let mg = mgwd + 'px';
                const sidebarElement = document.querySelector('.sidebar');
                console.log(sidebarElement)
                sidebarElement.style.setProperty('--left-pos', mg);
              }
              //总页数
              console.log(
                "#magazine has " + $("#magazine").turn("pages") + " pages"
              );
              // $("#magazine").turn("hasPage", 13);
              // $("#magazine").turn("pages", 5);
            }
          }
        });
      });
    },
    watch:{
      screenWidth(){
        let _this = this;
        _this.screenWidth = document.body.clientWidth;
      }
    }
  }

</script>

<style>
  @import url("../../../static/css/style.css");
  @import '../../../static/css/books/books.css';


  @font-face {
    font-family:ttbold;
      src: url("../../../static/fonts/titlebold.ttf");
  }
  @font-face {
    font-family:mk;
      src: url("../../../static/fonts/mk.ttf");
  }
  @font-face {
    font-family:jpx;
      src: url("../../../static/fonts/jpx.ttf");
  }
  @font-face {
    font-family:whz;
      src: url("../../../static/fonts/whz.ttf");
  }





</style>
