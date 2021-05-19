<template>

  <mescroll ref="mescroll" :up="mescrollUp"  @init="mescrollInit">
     <div v-for="item in list" :key="item.id">
        {{ item.id }}
      </div>
  </mescroll>

</template>

<script>
  import mescroll from "./x-mescroll.vue";
  export default {
    components: {
      mescroll:mescroll
    },
    data:function () {
      return {
        list : [],
        length:10,
        pageSize:10,
        totolSize:100,
        map:{},
        page:{},
        ispush:false,
        mescrollUp:{
          callback:this.upPage
        }
      }
    },
    methods:{
      //初始化方法
      mescrollInit:function(mescroll){

      },
      //下拉刷新触发
      upPage:function(page,mescroll){
        var _this = this;
        setTimeout(function () { // 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
          page.num = 1;
          page.size = 10;
          _this.getList();
          mescroll.endSuccess(_this.list.length)
        }, 1000)

      },
      getListDatas :function(){
        list = [{"id":1},{"id":2},{"id":3},{"id":4},{"id":5},{"id":6},{"id":7},{"id":8},{"id":9},{"id":10}]
      },
      getList:function(){
        var start = this.list.length+1;
        for(var i=start;i<start+10;i++){
          var map = {};
          map.id = i;
          this.list.push(map);
        }
      }

    },
    watch:{
      list:{
          handler(newName,oldName){
            let _this = this;
            // if(_this.ispush){
            //   _this.getList()
            // }

          },
          deep:true,
        immediate:true
      },
      }
    // },
    // mounted: {
    //   this.list = this.getListDatas();
    // }
    // ...
  }
</script>

<style>
</style>
