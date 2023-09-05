<template>
  <div style="width: 100%;height: 100%;  display: -webkit-box;-webkit-box-orient: horizontal;margin: 10px 10px;">
     <div class="ui_nav">
       <ul class="nav">
         <li class="ui_fst_p">
           <span>实验功能</span>
         </li>
         <li class="ui_g ui_grop " @click="changeArrow($event,'picture')">
           <div class="ui_pat_ico ui_g_ico"></div>
           <span>&nbsp;&nbsp;图片上传</span>
           <i class="icon-ctrlr ui_arrow" ></i>
         </li>
         <li class="ui_g ui_grop "  @click="changeArrow($event,'logs')">
           <div class="ui_frd_ico ui_g_ico"></div>
           <span>&nbsp;&nbsp;日志查找</span>
           <i class=" ui_arrow icon-ctrlr"></i>
         </li>
         <li class="ui_g ui_grop " @click="changeArrow($event,'page')">
           <div class="ui_pag_ico ui_g_ico"></div>
           <span>&nbsp;&nbsp;分页查询</span>
           <i class=" ui_arrow icon-ctrlr"></i>
         </li>
       </ul>
     </div>
     <div class="lb_context" style="width: calc( 100% - 245px );background-color:#282C35;height:1000px;" >
       <component :is="mypicture"></component>
       <p v-show="defaultv">hello world</p>
     </div>
   </div>
</template>

<script>
  import picture from '../../components/laboratory/retransform.vue'

export default {
  data () {
    return {
      medisArray: [],
      isRight: true,
      isDown: false,
      mypicture:"",
      defaultv:true
    }
  },
  methods: {
    //箭头切换
    changeArrow: function (e,key) {
      let x = e.currentTarget.getElementsByClassName("icon-ctrlr");
      if(x.length>0){
        let clazz = e.currentTarget.firstElementChild.nextElementSibling.nextElementSibling.getAttribute("class");
        let newClazz = clazz.replace('icon-ctrlr','icon-ctrld')
        // console.log()
        e.currentTarget.firstElementChild.nextElementSibling.nextElementSibling.setAttribute('class',newClazz)
        if(key=='picture'){
          this.mypicture = picture;
          this.defaultv = false;
        }
      }else{
        let clazz = e.currentTarget.firstElementChild.nextElementSibling.nextElementSibling.getAttribute("class");
        let newClazz = clazz.replace('icon-ctrld','icon-ctrlr')
        // console.log()
        e.currentTarget.firstElementChild.nextElementSibling.nextElementSibling.setAttribute('class',newClazz)
        if(key=='picture'){
          this.mypicture = "";
          this.defaultv = true;
        }
      }

    }
  },
  mounted () {

  }



}
</script>
<style>
  @import '../../../static/css/style.css';
  ul {
    padding-inline-start: 0;
  }
  .lb_context p{
    text-align: center;
    padding: 20px;
    font-size: 40px;
    color: white;
  }

   .ui_manage_ico {
     text-align: center;
     margin-left: 21px;
     margin-right: 21px;
     height: 25px;
     width: 25px;
     background-image: url(../../../static/img/bar/manage.png);
     background-repeat:no-repeat ;
     background-size:50% 50%;
     background-position: 50% 50%;
   }

   .ui_articl_ico {
     text-align: center;
     margin-left: 21px;
     margin-right: 21px;
     height: 25px;
     width: 25px;
     background-image: url(../../../static/img/bar/article.png);
     background-repeat:no-repeat ;
     background-size:50% 50%;
     background-position: 50% 50%;
   }

   .ui_remark_ico {
     text-align: center;
     margin-left: 21px;
     margin-right: 21px;
     height: 25px;
     width: 25px;
     background-image: url(../../../static/img/bar/remark.png);
     background-repeat:no-repeat ;
     background-size:50% 50%;
     background-position: 50% 50%;
   }
   .ui_foot_ul {
     margin: 0;
     height: 100%;
     list-style: none;
   }
   .ui_foot_li {
     list-style: none;
     height: 50%;
     font-size: 13px;
     color: #ADB6BB;
   }
  .ui_foot_bar {
    padding: 5px;
    display: -webkit-box;
    -webkit-box-orient:horizontal;
    /* width: 100%; */
  }

  .ui_foot_child {
    list-style: none;
    width: 31%;
    -webkit-box-flex: 1;
    -webkit-box-align: center;
    /* border: 1px solid #3BD9FF; */
    min-height: 50px;
  }
  .ui_nav_footer {
    position: fixed;
    bottom: 0;
    width: 220px;
    height: 60px;
    background-color: white;
  }
  .ui_arrow {
    line-height: 18PX;
    position: absolute;
    right: 25px;
    color: #777;
    font-size: 14PX;
    /* width: 1.28571em; */

  }

  .ui_fst_p {
    margin: 15px 0 10px;
    padding: 0 15px;
    text-align: left;
    font-size: 12px;
    color: #AEB7BC;

  }

  .ui_li_tab {
    text-align: left;
    margin-bottom: 10px;
    margin-top: 15px;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 12px;
    color: #AEB7BC;
  }

  .ui_line {
   margin:10px 0;
   padding:0;
   width:220px;
   height:1px;
   background-color:white;
   overflow:hidden;
    }

  .nav {
    margin-top: 0;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }

  .ui_nav {
    width: 220px;
    height: 1000px;
    /* border: 1px solid #3CD8FF; */
    background-color: grey;
  }

  .ui_name{
    color: #5B666D;
  }


  .ui_introduce{
    width: 96px;
    height: 40px;
    font-size: 12px;
    display: block;
    color: #AEB7BC;
    text-align: center;
    white-space:normal; word-break:break-all;overflow:hidden;
  }


  .ui_trangl {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 4px dashed;
    border-top: 4px solid\9;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    }



 .wrapn_h {
   padding: 15px;
   margin-top: 50px;
   display: -webkit-box;
   -webkit-box-orient:horizontal;
   /* width: 100%; */
   /* position: absolute;
   right: 0; */
   height: 70px;
 }
 .childn_h {
   width: 96px;
   margin-top: 10px;
   /* padding: 15px; */
   /* border-radius: 10px; */
   -webkit-box-flex: 1;
   -webkit-box-align: center;
 }

 .ui_pf {
   height: 60px;
   width: 60px;
   border-radius: 50%;
   border: 1px solid #0000FF;
   background-image: url(../../../static/img/login/profile.jpg);
   background-repeat:no-repeat ;
   background-size:90% 90%;
   background-position: 50% 50%;
 }

 .ui_g {
   padding: 10px 20px;
   line-height: 20px;
   height: 20px;
   font-size: 14px;
   text-align: left;
   color: #A1A7AB;
   position: relative;
   overflow: hidden;
 }

 .ui_g > .ui_g_ico{
   top:-2px;
   filter: drop-shadow(100px 0 #B0DAF2);
   left: -100px;
   position: relative;
 }
 .ui_g_ico {
   bottom: 10px;
   line-height: 40px;
   margin-right: 5px;
   float: left;
   height: 22px;
   width: 22px;

 }
 .ui_fst_ico {
   background-image: url(../../../static/img/bar/fstPage.png);
   background-repeat:no-repeat ;
   background-size:100% 100%;
   background-position: 50% -10%;
 }


 .ui_pat_ico {
   background-image: url(../../../static/img/bar/partition.png);
   background-repeat:no-repeat ;
   background-size:100% 100%;
   background-position: 50% -10%;
 }

 .ui_pag_ico {
   background-image: url(../../../static/img/bar/page.png);
   background-repeat:no-repeat ;
   background-size:70% 70%;
   background-position: 65% 60%;
 }

 .ui_frd_ico {
   background-image: url(../../../static/img/bar/friend.png);
   background-repeat:no-repeat ;
   background-size:100% 100%;
   background-position: 50% -10%;
 }

 .fontello-angle-right{
     content: '\f105';
     font-family: fontello;
     font-style: normal;
     font-weight: 400;
     speak: none;
     display: inline-block;
     text-decoration: inherit;
     width: 1em;
     text-align: center;
     font-variant: normal;
     text-transform: none;
     line-height: 1em;
     -webkit-font-smoothing: antialiased;

 }

 .ui_login {

  background-image: url(../../../static/img/ico/key.png);
  background-repeat:no-repeat ;
  background-size:33% 33%;
  background-position: 50% 50%;
 }

.ui_grop:hover{
  background-color: #D5E4F8;
}


</style>
