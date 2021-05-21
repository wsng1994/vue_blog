<template>
  <div style=" min-width: 1024px;width: 100%;height: 100%;background: white;position: relative;position: fixed;">
    <component :is="myheaderVeiw"></component>

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
</style>
