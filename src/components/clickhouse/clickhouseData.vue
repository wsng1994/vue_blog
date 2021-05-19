<template>
  <div style=" min-width: 1024px;width: 100%;height: 100%;background: white;position: relative;position: fixed;">
    <!-- <component :is="myheaderVeiw"></component> -->
    <div style="margin-top: 200px;position: relative; overflow: scroll;;max-width: 1200px;margin-left: auto;margin-right: auto;background-color: #2F2F2F!important;">
      <div style="height: 45px; background-color: gray;width: 100%; ">
        <div class="wrap_c1"  >
          <div class="child_c">#</div>
          <div class="child_c">CounterID</div>
          <div class="child_c">StartDate</div>
          <div class="child_c">Sign</div>
          <div class="child_c">IsNew</div>
          <div class="child_c">VisitID</div>
          <div class="child_c">UserID</div>
          <div class="child_c">StartTime</div>
          <div class="child_c">Duration</div>
        </div>
      </div>
      <div  style=" margin-top: 45px; height: 300px;max-width: 1200px;">
        <div v-for="(item,index) in clickHouseList" class="wrap_c" >
          <div class="child_c">{{index}}</div>
          <div class="child_c">{{item.id}}</div>
          <div class="child_c">{{item.dateTime}}</div>
          <div class="child_c">{{item.Sign}}</div>
          <div class="child_c">{{item.IsNew}}</div>
          <div class="child_c">{{item.VisitID}}</div>
          <div class="child_c">{{item.UserID}}</div>
          <div class="child_c">{{item.StartTime}}</div>
          <div class="child_c">{{item.Duration}}</div>
        </div>
        <div style="text-align: center;font-size: 22px;color: white;" >
          <p @click="callback(curentPage+1)">加载更多</p>
          </div>
      </div>

    </div>

  </div>

</template>

<script>
  import { queryLogbooks,queryClickHouseData } from '@/assets/ajax/rootHttpConfig'
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

      //日志分页请求
      callback: function (page) {
        this.pageNum = page;

        queryClickHouseData({
          pageSize:this.pageSize,pageNum:page
        }).then((res) => {
          this.curentPage = page;

           console.log(res)
           // this.articleList.push.apply(this.articleList,res.acticleBgs);
           this.clickHouseList = [...this.clickHouseList,...res.list];
           this.pages = res.pages;
          }
        )
      }

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
 @import '../../../static/css/header/myheader.css';


 .wrap_c1 {
   display: -webkit-box;
   -webkit-box-orient: horizontal;
   /* margin-top: 15px; */
   width: 100%;
 }

 .wrap_c1 .child_c {
   background-color: gray;
 }

 .wrap_c {
   display: -webkit-box;
   -webkit-box-orient: horizontal;
   /* margin-top: 15px; */
   width: 100%;
 }

 .child_c {
   -webkit-box-flex: 1;
   -webkit-box-align: center;
   height: 45px;
   border-bottom:1px solid #888 ;
   min-width: 200px;
   color: white;
   text-align: center;
   line-height: 45px;
 }
</style>
