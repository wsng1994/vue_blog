<template>
  <div class="comments_content">
    <div  class="con_ct">
      <h3 class="cmt_tit" >
        <span class="cmt_main" >Comments |</span>
        <span class="cmt_count">{{count}}&nbsp;条评论</span>
      </h3>
      <div style="width: 100%;">
          <textarea class="ui_ipt_bg cmt_txt" v-model="content1" type="text" placeholder="小舟从此逝,江海寄余生 ...">
          </textarea>
          <h3 style="font-size: 14px;color:#313131;">支持emoji 后面再处理</h3>
      </div>
      <div class="ui_vstInf">
          <div class="ui_profile_p_c">
             <i class="ui_profile_img_c"></i>
          </div>
        <div class="vst_child nc" style="margin-left: 70px;">
          <input placeholder="*昵称" type="text"  v-model="nc1" />
        </div>
        <div class="vst_child dzyj">
          <input placeholder="*电子邮件" type="text"  v-model="dzyj1"/>
        </div>
        <div class="vst_child">
          <input placeholder="个人站点" type="text"  v-model="webUrl1" />
        </div>
      </div>
      <div style="text-align: right;margin-top: 10px;margin-bottom: 14px;">
        <button class="bt_t" @click="setComments(0,-1)">提交</button>
      </div>
    </div>

    <div v-for="(item,index) in comments" class="comments_list" style="width: 100%; ">
      <div class="comments_it" style="width: 100%;float: right;margin-bottom: 50px;">
        <div class="cmt_box" style="width: 100%;">
          <div class="cmt_pro" style="float: left; margin-left: 5px;margin-top: 10px;">
            <img src="../../../static/img/artcle/nerv.jpeg"/>
          </div>
          <div  style="margin-left: 55px;text-align: left;">
            <p style="margin-top: 0;margin-bottom: 0;font-size: 24px;color: #00A7E0; font-family:jpx;">{{item.parentInfo.author}}</p>
            <p class="p_span" style="margin-top: 5px;font-size: 12px;color:#657786">发布于 {{item.parentInfo.update_time}}
            <span class="reply" @click="showComment(index)" >replay</span></p>

          </div>
          <div style="width: 100%;margin-left: 5px;text-align: left;">
            <p style="font-size: 16px;margin-top: 0;margin-bottom: 0;">{{item.parentInfo.content}}</p>
          </div>
          <div style="width: 100%;margin-top: 30px;border-top: .618px solid #bcbabe;"></div>
        </div>

        <div  class="con_ct" :ref="'showPanel'+index"  style="display: none;">
          <div class="comment_box" style="margin-bottom: 5px; margin-top: 10px;background: #f4f6f8;width: 75px;
    font-weight: bolder;
    border-radius: 3px;
    padding: 12px 25px;
    font-size: 12px;
    color: #454545;" @click="CancelReply(index)">
           Cancel Reply
          </div>
          <div style="width: 100%;">
              <textarea class="ui_ipt_bg cmt_txt" v-model="content" type="text" placeholder="小舟从此逝,江海寄余生 ...">
              </textarea>
              <h3 style="font-size: 14px;color:#313131;">支持emoji 后面再处理</h3>
          </div>
          <div class="ui_vstInf">
              <div class="ui_profile_p_c">
                 <i class="ui_profile_img_c"></i>
              </div>
            <div class="vst_child nc" style="margin-left: 70px;">
              <input placeholder="*昵称" type="text"  v-model="nc" />
            </div>
            <div class="vst_child dzyj">
              <input placeholder="*电子邮件" type="text"  v-model="dzyj"/>
            </div>
            <div class="vst_child">
              <input placeholder="个人站点" type="text"  v-model="webUrl" />
            </div>
          </div>
          <div style="text-align: right;margin-top: 10px;margin-bottom: 14px;">
            <button class="bt_t" @click="setComments(item.id,CancelReply(index))">提交</button>
          </div>
        </div>

      </div>
      <div v-if="item.childInfo" style="margin-left: 40px;">
        <div v-for="(item0,index0) in item.childInfo" class="comments_it"  style="width: 100%;float: right;margin-bottom: 50px;">
          <div class="cmt_box" style="width: 100%;">
            <div class="cmt_pro" style="float: left; margin-left: 5px;margin-top: 10px;">
              <img src="../../../static/img/artcle/nerv.jpeg"/>
            </div>
            <div  style="margin-left: 55px;text-align: left;">
              <p style="margin-top: 0;margin-bottom: 0;font-size: 24px;color: #00A7E0; font-family:jpx;">{{item0.author}}</p>
              <p class="p_span" style="margin-top: 5px;font-size: 12px;color:#657786">发布于 {{item0.update_time}}
               <span class="reply" @click="showCommentC(index0)" >replay</span></p>
            </div>
          </div>
          <div style="width: 100%;margin-left: 5px;text-align: left;">
            <p v-if="item0.backTo" style="font-size: 16px;margin-top: 0;margin-bottom: 0;"><a style="color: #00A7E0;font-size: 18px;margin-right: 10px;">@{{item0.backTo}}</a>{{item0.content}}</p>
            <p v-else style="font-size: 16px;margin-top: 0;margin-bottom: 0;">{{item0.content}}</p>
          </div>
          <div style="width: 100%;margin-top: 30px;border-top: .618px solid #bcbabe;"></div>

        <div  class="con_ct" :ref="'showPanelC'+index0"  style="display: none;">
              <div class="comment_box" style="margin-bottom: 5px; margin-top: 10px;background: #f4f6f8;width: 75px;
        font-weight: bolder;
        border-radius: 3px;
        padding: 12px 25px;
        font-size: 12px;
        color: #454545;" @click="CancelReplyc(index0)">
               Cancel Reply
              </div>
              <div style="width: 100%;">
                  <textarea class="ui_ipt_bg cmt_txt" v-model="content" type="text" placeholder="小舟从此逝,江海寄余生 ...">
                  </textarea>
                  <h3 style="font-size: 14px;color:#313131;">支持emoji 后面再处理</h3>
              </div>
              <div class="ui_vstInf">
                  <div class="ui_profile_p_c">
                     <i class="ui_profile_img_c"></i>
                  </div>
                <div class="vst_child nc" style="margin-left: 70px;">
                  <input placeholder="*昵称" type="text"  v-model="nc" />
                </div>
                <div class="vst_child dzyj">
                  <input placeholder="*电子邮件" type="text"  v-model="dzyj"/>
                </div>
                <div class="vst_child">
                  <input placeholder="个人站点" type="text"  v-model="webUrl" />
                </div>
              </div>
              <div style="text-align: right;margin-top: 10px;margin-bottom: 14px;">
                <button class="bt_t" @click="setComments(item0.parent_id,CancelReplyc(index0))">提交</button>
              </div>
            </div>

        </div>


      </div>

    </div>
    <div style="width: 100%;height: 300px;">
    </div>
  </div>
</template>

<script>
  import { queryComments,setComments } from '@/assets/ajax/rootHttpConfig'

  import { formatDate } from '@/assets/utils/filterUtils'

  export default {
    data () {
      return {
        arts:'',
        comments:[],
        nc:'',
        dzyj:'',
        content:'',
        webUrl:'',
        count:0,
        nc1:'',
        dzyj1:'',
        content1:'',
        webUrl1:'',

      }

    },
    props:{
        pid: String
      },
    methods: {

      showComment (index) {
        let b = "showPanel" + index;
        console.log(index)
        this.$refs[b][0].style.display = 'block';
      },
      CancelReply(index){
        let b = "showPanel" + index;
        console.log(this.$refs[b][0])
        // let a = "showPanel" + index;
        this.$refs[b][0].style.display = 'none';
      },

      showCommentC (index) {
        let b = "showPanelC" + index;
        console.log(index)
        this.$refs[b][0].style.display = 'block';
      },
      CancelReplyc(index){
        let b = "showPanelC" + index;
        console.log(this.$refs[b][0])
        // let a = "showPanel" + index;
        this.$refs[b][0].style.display = 'none';
      },

      //根据Id查询文章
      queryArticleCmt () {
        queryComments({
          id:''+ this.pid
        }).then((res) => {
          this.comments = res.commentsList;
          this.count = res.count;
          }
        )
      },
      //提交评论
      setComments (data,callback) {

        const cfg = {};
        if(data==0){
          if(this.nc1==''||this.dzyj1==''||this.content1==''){
            alert("请输入必要信息"+data);
            return;
          }
          cfg.nc = this.nc1
          cfg.dzyj = this.dzyj1
          cfg.content = this.content1
          cfg.postId = this.pid
          cfg.pid = ""+data
          cfg.webUrl = this.webUrl1
        }else{
          if(this.nc==''||this.dzyj==''||this.content==''){
            alert("请输入必要信息"+data);
            return;
          }
          cfg.nc = this.nc
          cfg.dzyj = this.dzyj
          cfg.content = this.content
          cfg.postId = this.pid
          cfg.pid = ""+data
          cfg.webUrl = this.webUrl
        }


        setComments({
          cfg:cfg
        }).then((res) => {
          // this.comments = res.commentsList;
          const status = res.status;
            if(status==200){
              // alert("评论提交成功");
              this.clearParam();
              this.queryArticleCmt();
            }
          }
        )
      },
      clearParam () {
       this.nc = '';
        this.dzyj = '';
        this.content = '';
        this.webUrl = '';
        this.nc1= '';
         this.dzyj1 = '';
         this.content1 = '';
         this.webUrl1 = '';
      }

    },
    components: {
    },
    created() {
       this.queryArticleCmt();
    },

    filters:{
      formatDate:formatDate
    },
    mounted () {

      },

    destroyed () {
    },

  }
</script>

<style>
  @import '../../../static/css/comments/comments.css';

  @font-face {
    font-family:jpx;
    src: url(../../../static/fonts/jpx.ttf);
  }



</style>
