<template>


    <div style="text-align: center;margin-top: 40%;">
      <div style=" margin: 20px;color: white;"> 点击上传图片 </div>
      <!-- 下面注释内容为上传图片和展示图片墙内容后续优化 -->
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :http-request="params=>uploadFile(params)"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <!-- 展示上传成功展示本地照片墙 -->
      <!-- <div style="float: left;margin: 5px;" v-for="(item, index) in fileList" >
        <img style="width: 400px;height: 300px" :src="item.url" alt="">
      </div> -->
  </div>
</template>

<script>
  import { uploadFiles } from '@/assets/ajax/rootHttpConfig'
  import axios from 'axios'

  export default {
    data () {
      return {
        token: localStorage.getItem('token'),
        dialogImageUrl: '',
        dialogVisible: false,
        read:true,
        fileList: []
        }
    },

    created: function () {
        this.currentPage = 1;
        this.callback(1);
     },

    methods: {
      getImgInfo:function(file){
         console.log(file)
      },

      uploadFile:function (params) {

       let param = new FormData(); //创建form对象
               param.append('file',params.file);//通过append向form对象添加数据

       console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
       let config = {
         headers:{'Content-Type':'multipart/form-data'} //这里是重点，需要和后台沟通好请求头，Content-Type不一定是这个值
       }; //添加请求头
       axios.post('http://localhost:8081/blog/upload',param,config)
         .then(response=>{
           let fileInfo = {};
           fileInfo.url = response.file;
           this.fileList.push(fileInfo);
         })

      },
      //触发删除操作，这里可以有两种处理方式
      //1.删除本地list中缓存的图片
      //2.发接口删除远程数据并同步本地数据
      handleRemove: function (file, fileList) {
           console.log(file, fileList);
      },

      handlePictureCardPreview : function (file){
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
      },

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
      },


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
  }
  .tc {
    margin-left: 15px;
    color: white;
  }
  .tc:hover{
    color: #000FFF;
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
