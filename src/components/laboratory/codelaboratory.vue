<template>
  <div style=" min-width: 1024px;width: 100%;height: 100%;background: white;position: relative;position: fixed;">
  <!-- <div style="background: white;width: 100%;height: 100%;"> -->
    <component :is="myheaderVeiw"></component>
    <div style="margin-top: 100px;">
      <component :is="mynavigation"></component>
    </div>

  </div>
</template>

<script>
   import myheader from '../../components/header/myheader.vue'
   import navigation from '../../components/bar/navigation.vue'

   export default {
     data () {
       return {
         myheaderVeiw:myheader,
         mynavigation:navigation
         }


     },

     created: function () {

      },

     methods: {
       getImgInfo:function(file){
          console.log(file)
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
