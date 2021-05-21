<template>
  <div style="min-width: 1024px;width: 100%;height: 100%;background: #fff;">
    <textarea id="lrc_content" name="textfield" cols="70" rows="10" style="display:none;">
            [00:00.550]Poets often use many words
            [00:06.360]to say a simple thing
            [00:12.440]It takes thought and time and rhyme
            [00:17.940]to make a poem sing
            [00:23.940]With music and words I've been playing
            [00:29.870]for you I have written a song
            [00:35.970]To be sure that you know what I'm saying
            [00:41.900]I'll translate as I go along
            [00:48.650]Fly me to the moon
            [00:51.810]and let me play among the stars
            [00:58.160]Won't you let me see
            [01:00.970]what Spring is like on Jupiter and Mars
            [01:09.130]In other words: hold my hand
            [01:14.890]In other words: darlng' kiss me
            [01:20.460]Fill my heart with songs
            [01:23.620]and let me sing forever more
            [01:30.350]Cause you're all I long for
            [01:34.660]all I worship and adore
            [01:41.530]In other words: please be true
            [01:46.920]In other words: I love you
            [02:13.520]In other words: please be true
            [02:24.010]In other words: I love you
            [02:30.800]I love you
        </textarea>
   <component :is="myheaderVeiw"></component>

    <div class="art_music_bg" style="height: 400px; width: 100%; ;position: absolute;top: 75px;">
        <p style="margin-top: 150px;">Endless falling,</p>
        <p >you need music to keep warm.</p>
    </div>
    <div id="myheight" style="height: 475px;"></div>

    <div style=";max-width: 800px;
    padding: 0 10px;
    margin-left: auto;
    margin-right: auto;
    ">
     <div id="myheight1"  style="background-color: #242424; overflow: scroll; margin-top:20px;max-height:180px ; width: 100%;box-shadow: 0 15px 32px rgba(0,0,0,.15)!important;margin-bottom: 25px;">
       <div class="wrap" style="width: calc(100% - 100px); height: 60px; margin-left: 100px;border-bottom:1px solid #888 ;">
         <div class="cld" style="height: 60px;line-height: 60px;width:40% ;color: #858585;">音乐标题</div>
         <div class="cld" style="height: 60px;line-height: 60px;width:20% ;color: #858585;">歌手</div>
         <div class="cld" style="height: 60px;line-height: 60px;width:20% ;color: #858585;">时长</div>
         <div class="cld" style="height: 60px;width:20% ;"></div>
       </div>
       <div  v-for="(item,index) in musicList" style="height:60px ;position: relative;">
         <div class="wrap lbg" :class="{bg_d:index%2==1,bg_s:index%2==0}" style="width: calc(100% - 100px); height: 60px; margin-left: 100px;">
           <div class="cld" style="height: 60px;line-height: 60px;width:40% ;color: #B4B4B4;">{{item.songName}}</div>
           <div class="cld" style="height: 60px;line-height: 60px;width:20% ;color: #858585;">{{item.author}}</div>
           <div class="cld" style="height: 60px;line-height: 60px;width:20% ;color: #515151;">{{item.time}}</div>
           <div class="cld" style="height: 60px;width:20% ;">
             <div class="child_ico ai00"  style="color: white;" @click="play(item,index)">
               <div class="ai001" :id="'bg_'+index">
                 <audio :src="item.songUrl" :id="'musicMp'+index"></audio>
               </div>
             </div>
           </div>
         </div>
        <div class="fm" style="left: 0;top: 0;
        height: 60px;width: 100px;position: absolute;">
          <img :src="item.coverUrl" />
        </div>
       </div>
    </div>
        <div class="wrapindex" ref="lrc_content" style="opacity: 0;">
            <div style="height: 20px;"></div>
            <ul class="childindexCanvas" id="text" style="overflow:scroll;color: #8B8B8B;">
              <template  v-for='(item,index) in medisArray'>
                <!-- <li v-show="lineNo==index+1" v-bind:key="index" style="list-style: none;" >{{item.c}}</li> -->
                <li  v-bind:key="index" style="list-style: none; margin-top:0px;margin-bottom: 15px; font-size: 12px;" >{{item.c}}</li>
              </template>
            </ul>
            <div class="childindexCanvas music_bg">
              <img :src="musicCover" />
            </div>
        </div>

    </div>

  </div>

</template>

<script>
  import myheader from '../../components/header/myheader.vue'

  import { getSongList,getSongLrc } from '@/assets/ajax/rootHttpConfig'

//#292929
export default {
  data () {
    return {
      text: '大人者，不失其赤子之心者也.置身于三教九流之所,仍保苍松翠柏之性;落魄于藏污纳垢之地,亦有霁月清风之心;见浊流而不随,见火热而不附.',
      text1: '层峦耸翠，上出重霄；飞阁流丹，下临无地。鹤汀凫渚，穷岛屿之萦回；桂殿兰宫，即冈峦之体势。披绣闼，俯雕甍，山原旷其盈视，川泽纡其骇瞩。闾阎扑地，钟鸣鼎食之家；舸舰弥津，青雀黄龙之舳。云销雨霁，彩彻区明。落霞与孤鹜齐飞，秋水共长天一色',
      medisArray: [],
      isPlay: false,
      doBofang: true,
      lineNo: 0,
      myheaderVeiw:myheader,
      musicList:[],
      indexAudio:-1,
      musicCover:'',
      medis:'',
      audioflag:-1

    }
  },
  created() {
    //获取歌曲列表
    this.getSongList();

  },
  methods: {
    getSongList () {
        getSongList({
          id:0
        }).then((res) => {
           this.musicList = res.songList
          }
        )
    },

    play: function (item,index) {
      this.audioflag = index;
      console.log("indexAudio"+this.indexAudio+"----index"+index)
      if(this.indexAudio!=index){
        let id = item.id;
        this.getSongLrc(id);
        this.lineNo = 0;
      }

      this.musicCover = item.coverUrl;
      let audioId = 'musicMp'+index;
      let audio = document.getElementById(audioId)
      // let bg = 'bg_'+index;
      // var $bg = document.getElementById(bg);
      let $bg = '#bg_'+index;
      if(audio.paused){
        this.indexAudio = index;
        console.log(this.$refs['lrc_content'])
        this.$refs['lrc_content'].style.opacity = 1;
        audio.play()
        $($bg).addClass('play')
        $($bg).removeClass('bofang')
      }else {
        audio.pause()
        $($bg).addClass('bofang')
        $($bg).removeClass('play')
      }

    },

    getSongLrc: function (id) {
      getSongLrc({
        id:id
      }).then((res) => {
        console.log(id);
         this.medis = res.lyric;
         this.medisArray = [];
         this.createLrc();
        }
      )
    },
    createLrc: function () {

      // var medis = '[00:12.300]椅子相互紧挨着\n[00:18.375]我们彻夜长谈\n[00:24.377]低矮的房屋不算太坏\n[00:30.463]我们互诉衷肠\n[00:38.984]一直是这样 我们就这样度过所有的时光\n[00:44.965]把酒高歌 我们迎接明天\n[00:50.989]一直是这样 我们生活在\n[00:57.028]这尘烟弥漫的天空下 长夜漫漫\n[01:06.179]那儿星辰无光\n[01:12.440]月光照不到城里\n[01:18.482]我们凝视着灯光\n[01:23.494]在浩瀚的星海下歌唱\n[01:42.496]椅子相互紧挨着\n[01:48.587]我们彻夜长谈\n[01:54.515]低矮的房屋\n[01:56.959]不算太坏\n[02:00.431]我们互诉衷肠\n[02:09.014]一直是这样\n[02:11.316]在夜深人静的时候\n[02:14.958]把酒高歌\n[02:17.364]我们迎接明天\n[02:21.024]一直就是这般\n[02:22.691]生活在那炙热的彩云下\n[02:27.306]抹去你我所有的烦恼\n[02:30.423]漫长而孤寂的夜\n[02:36.414]浩瀚的星光难再现\n[02:42.435]我们便是那闪耀的星光 照亮你我的世界\n[02:48.425]你我绽放唯一的光芒\n[02:53.457]希望的高歌 湮没所有的恐惧\n[03:12.335]椅子相互紧挨着\n[03:18.401]整夜你我互诉衷肠\n[03:24.424]低矮的房屋不算太坏\n[03:30.464]我们总会有倾诉的故事\n[03:38.933]一直是这样 一直在收获\n[03:44.938]把酒高歌\n[03:47.392]我们迎接明天\n[03:50.968]一直是这样\n[03:53.353]生活在那炙热的彩云下\n[03:57.367]抹去你我所有的烦恼 漫长而孤寂的夜\n[04:06.460]那儿星辰无光\n[04:12.416]我们便是那闪耀的星光\n[04:13.994]照亮你我的世界\n[04:18.456]所以我们凝视着光\n[04:23.593]希望的高歌 湮没所有的恐惧\n';
     var _medis = '';

      _medis = this.medis.replace(/\./g,':')
      // 用换行符拆分获取到的歌词
      var medises = _medis.split('\n')
      // 遍历medises，并且将时间和文字拆分开，并push进自己定义的数组，形成一个对象数组
      for (var i = 1; i < medises.length; i++) {
        var item = medises[i]

        var t = item.substring(item.indexOf('[') + 1, item.indexOf(']'))
        this.medisArray.push({
          t: (t.split(':')[0] * 60 + parseFloat(t.split(':')[1])).toFixed(3),
          c: item.substring(item.indexOf(']') + 1, item.length)
        })
      }
    },
    lineHeight: function (lineno) {
      var fraction = 0.5
      var topNum = 0
      var ul = $('#text')
      var l1 = document.getElementById('myheight').offsetHeight;
      var l2 = document.getElementById('myheight1').offsetHeight;
      var l =l1+l2;
      var $ul = document.getElementById('text')
      // 令正在唱的那一行高亮显示
      if (lineno > 0) {
        $(ul.find('li').get(topNum + lineno - 1)).removeClass('lineheight')
      }
      var nowline = ul.find('li').get(topNum + lineno)
      $(nowline).addClass('lineheight')
      // 实现文字滚动
      var _scrollTop
      $ul.scrollTop = 0
      //298 0.5 (495,518,541)
      if ($ul.clientHeight * fraction > (nowline.offsetTop-l)) {
        _scrollTop = 0
      } else if ((nowline.offsetTop-l) > ($ul.scrollHeight - $ul.clientHeight * (1 - fraction))) {
        _scrollTop = $ul.scrollHeight - $ul.clientHeight
      } else {
        _scrollTop = (nowline.offsetTop-l) - $ul.clientHeight * fraction
      }
      // 以下声明歌词高亮行固定的基准线位置成为 “A”
      if (((nowline.offsetTop-l) - $ul.scrollTop) >= $ul.clientHeight * fraction) {
        // 如果高亮显示的歌词在A下面，那就将滚动条向下滚动，滚动距离为 当前高亮行距离顶部的距离-滚动条已经卷起的高度-A到可视窗口的距离
        $ul.scrollTop += Math.ceil((nowline.offsetTop-l) - $ul.scrollTop - $ul.clientHeight * fraction)
      } else if (((nowline.offsetTop-l) - $ul.scrollTop) < $ul.clientHeight * fraction && _scrollTop !== 0) {
        // 如果高亮显示的歌词在A上面，那就将滚动条向上滚动，滚动距离为 A到可视窗口的距离-当前高亮行距离顶部的距离-滚动条已经卷起的高度
        $ul.scrollTop -= Math.ceil($ul.clientHeight * fraction - ((nowline.offsetTop-l) - $ul.scrollTop))
      } else if (_scrollTop === 0) {
        $ul.scrollTop = 0
      } else {
        $ul.scrollTop += $(ul.find('li').get(0)).height()
      }
    }
  },
  components: {
    myheader
  },
  mounted () {

  },
  watch : {

    audioflag(value) {
      let _this = this;
      let aid = "musicMp"+value
      let audio = document.getElementById(aid)
      if(audio!=undefined){
        audio.ontimeupdate = function () {
          if (_this.lineNo === _this.medisArray.length - 1 && audio.currentTime.toFixed(3) >= parseFloat(_this.medisArray[_this.lineNo].t)) {
            // console.log('---1---' + _this.lineNo)
            _this.lineHeight(_this.lineNo)
          }
          if(_this.lineNo < _this.medisArray.length - 1){
            if (parseFloat(_this.medisArray[_this.lineNo].t) <= audio.currentTime.toFixed(3) &&
              audio.currentTime.toFixed(3) <= parseFloat(_this.medisArray[_this.lineNo + 1].t)) {
              // console.log('===2===' + _this.lineNo)
              _this.lineHeight(_this.lineNo)
              _this.lineNo++
            }
          }
        }
        audio.addEventListener('ended', function () {
          let $bg = '#bg_'+value;
            $($bg).addClass('bofang')
            $($bg).removeClass('play')
            _this.lineNo = 0
        }, false);
      }
    }
  }

}
</script>
<style>
  @font-face {
    font-family:mk;
      src: url("../../../static/fonts/mk.ttf");
  }

   .lbg:hover {
     background-color: #323232;
   }

   .bg_d {
     background-color: #242424;
   }
   .bg_s {
     background-color: #292929;
   }

  .cld {
    -webkit-box-flex: 1;
    -webkit-box-align: center;
    height: 60px;
    border-bottom:1px solid #888 ;
  }

  .fm img {
    height: 60px;
    width: 100px;
  }

  .music_bg img{
    height: 100%;
    width: 100%;
  }

  .art_music_bg p {
    font-family: mk;
    color: #D0D3D6;
    font-size: 40px;
    font-weight: 500;
    margin: auto;
    /* padding:150px; */
    border: 0;
  }



 .art_music_bg {
    background-size: 100% 130%;
    background-image: url(../../../static/img/background/stars.jpeg);
    background-position: center;
  }


  .lineheight {
    color: #3BD9FF;

  }

.ai00{
  width: 50px;
  height: 60px;
  position: relative;
}

.ai001{
  position: absolute;
  width: 50px;
  height: 60px;
  background-image: url(../../../static/img/music/play.png);
  background-repeat:no-repeat ;
  background-size: 75% 66%;
  background-position: 100% 50%;
  left: 35px;
  z-index:100;
}

.wrapindex {
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    /* margin-top: 15px; */
    width: 100%;
    border-radius: 5px;
    box-shadow: 0 15px 32px rgba(0,0,0,.15)!important;

}
.wrap {
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    /* margin-top: 15px; */
    width: 100%;
    /* border-radius: 10px */
}
.child_ico{
  height: 60px;
  /* border: 1px solid #666; */
  border-radius: 10px;
  -webkit-box-flex: 1;
  -webkit-box-align: center;
  word-break: break-all;
  width: 30%;
  box-sizing: border-box;
}
.ai01{
  /* 上一曲*/
  background-image: url(../../../static/img/music/ai10.png);
  background-repeat:no-repeat ;
   background-size:80% 80%;
  /* background-attachment: fixed; */
}
.bofang{
  /* 上一曲*/
  background-image: url(../../../static/img/music/play.png);
  background-repeat:no-repeat ;
  background-size: 75% 66%;
  background-position: 100% 50%
}
.play{
  /* 上一曲*/
  background-image: url(../../../static/img/music/puse.png);
  background-repeat:no-repeat ;
  background-size: 75% 66%;
  background-position: 100% 50%
}
.ai02{
  /* 上一曲*/
  background-image: url(../../../static/img/music/ai09.png);
  background-repeat:no-repeat ;
  background-size:80% 80%;
  /* background-attachment: fixed; */
}


.childindexCanvas{
  height: 298px;
  /* border: 1px solid #666; */
  border-radius: 10px;
  -webkit-box-flex: 1;
  margin: 10px;
  -webkit-box-align: center;
  word-break: break-all;
  padding: 10px;
  width: 50%;
  box-sizing: border-box;
}

</style>
