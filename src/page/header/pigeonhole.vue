<template>
  <div style="min-width: 1024px;width: 100%;height: 100%;background: white;position: relative;">
	  <component :is="myheaderVeiw"></component>
    <div class="art_bg" style="height: 400px; width: 100%; ;position: absolute;top: 75px;">
        <h1>文章归档</h1>
    </div>
    <div  style="position: absolute;top: 475px;width: 100%;">
      <div class="ui_timer_container">
        <div class="archives-content">
          <div v-for="(sd,index0) in archivesList" >
            <div class="ar-time-font" id="">
              <span class="ar-time">
                <i class="icon-history"></i>
              </span>
              <h3  @click="showList(index0)">{{sd.date}}</h3>
              <!-- v-show="isShow&&timeIndex==index0" -->
              <!-- <div class="b_h" :class="isShow&&isActive==index0?'a_s':''" v-for="(sd,index1) in testList"  style="overflow: hidden;"> -->

                <div v-if="index0!=0" :ref="'showPanel'+index0" v-for="(item,index1) in sd.dateList"  style="overflow: hidden;display: none;">
                  <span class="ar-circle"></span>
                    <div class="arrow-left-ar"></div>
                    <div class="brick">
                      <a @click="goArticles(item.id)">
                        <span class="time"><i class="icon-clock"></i>{{item.w_time}}</span>{{item.summary}}
                      </a>
                    </div>
                </div>
                <div v-if="index0==0" :ref="'showPanel'+index0" v-for="(item,index1) in sd.dateList"  style="overflow: hidden;">
                <span class="ar-circle"></span>
                <div class="arrow-left-ar"></div>
                <div class="brick">
                  <a @click="goArticles(item.id)">
                    <span class="time"><i class="icon-clock"></i>{{item.w_time}}</span>{{item.summary}}
                  </a>
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
import subjectAct from '../../components/subject/subjectAct.vue'
import myheader from '../../components/header/myheader.vue'
import { queryArchives } from '@/assets/ajax/rootHttpConfig'
import Security from "./security/Security.js"
export default {
  data () {
    return {
      text: '大人者，不失其赤子之心者也.置身于三教九流之所,仍保苍松翠柏之性;落魄于藏污纳垢之地,亦有霁月清风之心;见浊流而不随,见火热而不附.',
      testList:[1,2,3,4,5,6,7],
      isShow:false,
      isActive:-1,
      changeFlag:-1,
      myheaderVeiw:myheader,
      archivesList:[]
    }
  },
  methods: {
    //showList
    showList (data) {
      let a = "showPanel" + data;

      let ls = this.$refs[a].length;

      let dis = this.$refs[a][0].style.display;

      if(dis == 'none') {
        for(let i=0;i<ls;i++){
          this.$refs[a][i].style.display = 'block';
        }
      }else{
        for(let i=0;i<ls;i++){
          this.$refs[a][i].style.display = 'none';
        }
      }

      console.log(this.$refs[a][0].style.display)
    },

    //跳转文章页面
    goArticles (id) {
      this.$router.push({path:'/article',query:{postId:id}})
    },

    getArchives() {
      const data = '{"test":"helloworld!"}'
      const key = '3ce10b0c846003541937a08f8c79d8edba407cc21c2c097ea0ed446308c0bc95c70197d0438eec089dbb9dcd4791a90dca743f1840da3264f9bb06b0cbe5d225'
      let result = Security.encrypt(data,key)

      console.log(result)

      // queryArchives({
      //   params:''
      // }).then((res) => {
      //    this.archivesList = res.archives;
      //    console.log(this.archivesList)
      //   }
      // )
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
    myheader
  },
  mounted () {
      this.getArchives();
    },

  destroyed () {
  },

}
</script>
<style scoped>
  @import '../../../static/css/style.css';
  @import '../../../static/css/pigeonhole/pigeonhole.css';

    li {
      list-style: none;
    }
    .c_h {
      display: none;
    }
   /* @font-face {
      font-family:jpx;
      src: url(../../../static/fonts/jpx.ttf);
    } */




</style>
