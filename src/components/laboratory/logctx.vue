<template>
  <div style=" min-width: 1024px;width: 100%;height: 100%;background: white;position: relative;position: fixed;">
  <!-- <div style="background: white;width: 100%;height: 100%;"> -->
    <component :is="myheaderVeiw"></component>

     <!-- <div class="search" style="height: 13.125rem;background-color: #777777;"> -->
     <!--  <input style="margin-top: 130px; height: 2.5rem;" v-model="key" placeholder="请输入查询条件"><span class="tc" @click="exclog">查询</span>
      </div> -->

      <!-- <div class="text" v-show="this.show==1" style="padding: 20px 15px 0;height: 70%;overflow: scroll;" > -->
        <!-- <p>{{this.logs}}</p> -->
        <!-- <textarea data-dojo-attach-point="txtViewForm" style="font-ize: 15px; width: 100%;height: 100%"  readonly="readonly">{{logs}}</textarea> -->
        <!-- <div style="color:#3F3F3F"  v-html=" this.logs"> </div> -->
      <!-- </div> -->

      <div class="check">
        <div class="ch" >
          <input type="checkbox" id="box" @click="testCheck" style="position: absolute;
    left: 8px;
    z-index: 999;
    opacity: 0;
    width: 25px;
    height: 25p"/>
          <img class="image" src="../../../static/img/ico/unchecked.png" style="width: 25px; margin-left: 10px;float: left;"/>
        </div>
         <div style="padding-left: 45px;" >测试勾选</div>

      </div>

      <div style="width: 100%;height: 100%;display: flex;justify-content: center;
            align-items: center;">
          <div style="width: 327px;height:238px;background-color: black; display: flex;justify-content: center;
            align-items: center;">


          <div style="background-color: #FAFAFA;width: 263px;height:84px;border-radius: 1px;">
            <div style="font-size: 12px;margin-left: 12px; position: relative;margin-right: 12px;">
              <div style="position: absolute;left: 0;top: 20px;">转移金额</div><div style="position: absolute;right: 0;top: 20px;">120000.00<span>元</span></div>
              <div style="position: absolute;left: 0;top: 50px;">转移利息</div><div style="position: absolute;right: 0;top: 50px;">120.00<span>元</span></div>

            </div>

          </div>
        </div>
      </div>





    <!-- <div style="margin-top: 200px;" class="a">
      <span>温馨提示</span> <span class="b" id="showText" @click="change()">展开</span><div id="showAng" class="trangleUp"></div>
    </div> -->


  </div>
</template>

<script>
  import { queryExcLog } from '@/assets/ajax/rootHttpConfig'
  import myheader from '../../components/header/myheader.vue'
  export default {
    data () {
      return {
            read:true,
            myheaderVeiw:myheader,
            testlist:[1,2,3,4,5,6,7,7,7],
            clickHouseList:[],
            pageSize:1000,
            page:0,
            curentPage:1,
            angFlag:0,
            logs:"",
            show:0,
            key:""
            }
    },

    created: function () {
        this.currentPage = 1;
        this.callback(1);
     },

    methods: {


      Irefresh:function (){
        this.$router.push({path:'/refresh',query:{path:this.$route.fullPath}})
      },

      testCheck: function () {
         var k = document.getElementById("box").checked;
         var url = document.getElementsByClassName("image")[0].src;
         console.log(url)
         if(k){
           document.getElementsByClassName("image")[0].setAttribute("src","../../../static/img/ico/checked.png")
           // attr("src","../../../static/img/ico/checked.png")
         }else{
           document.getElementsByClassName("image")[0].setAttribute("src","../../../static/img/ico/unchecked.png")
         }
         console.log()
      },


      exclog: function () {
        console.log(this.key)
        queryExcLog({
          keywords:this.key,

        }).then((res) => {

           var content = res.result;
           // content = content.replace(/'\n'/g, '<br/>'); //IE9、FF、chrome
           // content = content.replace(/\n/g, '<br/>'); //IE7-8
                   // content = content.replace(/\s/g, ' '); //空格处理
          // console.log(content)
          this.logs=content;
          this.show=1;
          }
        )
      },

      //日志分页请求
      callback: function (page) {
  //       this.pageNum = page;

  //       queryClickHouseData({
  //         pageSize:this.pageSize,pageNum:page
  //       }).then((res) => {
  //         this.curentPage = page;

  //          console.log(res)
  //          // this.articleList.push.apply(this.articleList,res.acticleBgs);
  //          this.clickHouseList = [...this.clickHouseList,...res.list];
  //          this.pages = res.pages;
  //         }
  //       )
      },
      //测试十六进制转换生僻字问题
      toFUnicode: function (str){
        console.log(str)
        debugger;
        var out, i, len, c;
            var char2, char3;

            out = "";
            len = str.length;
            i = 0;
            while(i < len) {
        		 c = str.charCodeAt(i++);
        		 switch(c >> 4)
        		 {
        		   case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        			 out += str.charAt(i-1);
        			 break;
        		   case 12: case 13:
        			 char2 = str.charCodeAt(i++);
        			 out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        			 break;
        		   case 14:
        			 char2 = str.charCodeAt(i++);
        			 char3 = str.charCodeAt(i++);
        			 out += String.fromCharCode(((c & 0x0F) << 12) |
        				((char2 & 0x3F) << 6) |
        				((char3 & 0x3F) << 0));
        			 break;
        		 }
            }

            return out;

      },


      encodeUnicode: function(str) {
        var res = [];
        for (var i = 0; i < str.length; i++) {
            res[i] = ( "00" + str.charCodeAt(i).toString(16) ).slice(-4);
        }
        return "\\u" + res.join("\\u");
      }
,

    },
    components: {
      myheader
    },
    mounted() {


    },
    watch:{

    }
  }

</script>

<style>
  .search input{
    margin-left: 20px;
    margin-top: 30px;
    float: left;
  }
  .tc {
    margin-left: 15px;
    color: white;
  }
  .tc:hover{
    color: #000FFF;
  }
  ## 勾选框测试

  .check {
    margin-top: 100px;
    height: 100px;
  }
  .ch {
    margin-top: 100px;
    width: 100%;
  }

  .trangleDown {
    position: absolute;
    top:8px;
    right:0;
    width:0;
    height:0;
    border-left:5px solid transparent;
    border-right:5px solid transparent;
    border-top:5px solid #000000;
  }





</style>
