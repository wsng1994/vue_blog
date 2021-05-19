<template>
  <div style="height: 100%; width: 1000px;margin: 0 auto; margin-top: 40px;">
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
    <div class="wrapindex">
        <div class="childindex a">
          <div class="wrapindex x">
              <div class="x1" v-html="text1"></div>
              <div class="x1" style="text-align: left;" v-html="text"></div>
          </div>
        </div>
        <div class="childindex b x" >
          <div class="ui-wsng-temp ui-wsng-bg">
            <viewer :images="imageDatas1" style="width: 100%;text-align: center">
              <template  v-for='(sd,index) in imageDatas1'>
                <div :key="sd.id" style="float: left;width: 20%;margin: 10px">
                  <img style="width: 100%;" :src="sd.url" :key="index" />
                  <!--<div style="text-align:center;color: white;text-decoration: none;" @click="goDetail()">{{sd.desc}}</div>-->
                </div>
              </template>
            </viewer>
          </div>

        </div>
    </div>
    <div class="wrapindex">
        <div class="childindex c x" >
          <div class="wrapindex">
            <ul class="childindexCanvas" id="text" style="overflow: hidden;color: #0000FF;">
              <template  v-for='(item,index) in medisArray'>
                <li v-show="lineNo==index+1" v-bind:key="index" style="list-style: none;" >{{item.c}}</li>
              </template>
            </ul>
            <div class="childindexCanvas">
              <div class="flex1">
                <canvas id="canvas" style="height:140px ;width: 140px; background-color: #333333;border-radius: 70px;"></canvas>
              </div>

              <div class="flex2">
               <div class="wrap">
                 <div class="child_ico ai01"></div>
                 <div class="child_ico ai00"  @click="play">
                   <div class="ai001" v-bind:class="{play:isPlay,bofang:doBofang}">
                     <audio :src="footer.songs" id="musicMp3"></audio>
                   </div>
                 </div>
                 <div class="child_ico ai02" style="margin-right: 0;"></div>
               </div>

              </div>

            </div>

          </div>
        </div>

        <div class="childindex d x" >

        </div>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      text: '大人者，不失其赤子之心者也.置身于三教九流之所,仍保苍松翠柏之性;落魄于藏污纳垢之地,亦有霁月清风之心;见浊流而不随,见火热而不附.',
      text1: '层峦耸翠，上出重霄；飞阁流丹，下临无地。鹤汀凫渚，穷岛屿之萦回；桂殿兰宫，即冈峦之体势。披绣闼，俯雕甍，山原旷其盈视，川泽纡其骇瞩。闾阎扑地，钟鸣鼎食之家；舸舰弥津，青雀黄龙之舳。云销雨霁，彩彻区明。落霞与孤鹜齐飞，秋水共长天一色',
      imageDatas1: [{
        url: '/static/img/testImage/a01.png',
        id: '01'
      },
      {
        url: '/static/img/testImage/a02.png',
        id: '02'
      },
      {
        url: '/static/img/testImage/a03.png',
        id: '03'
      },
      {
        url: '/static/img/testImage/a04.png',
        id: '04'
      },
      {
        url: '/static/img/testImage/a02.png',
        id: '05'
      },
      {
        url: '/static/img/testImage/a03.png',
        id: '06'
      },
      {
        url: '/static/img/testImage/a04.png',
        id: '07'
      },
      {
        url: '/static/img/testImage/a02.png',
        id: '08'
      },
      {
        url: '/static/img/testImage/a03.png',
        id: '09'
      },
      {
        url: '/static/img/testImage/a04.png',
        id: '10'
      }
      ],
      medisArray: [],
      isPlay: false,
      doBofang: true,
      lineNo: 0,
      footer: {
        songs: './static/music/always.mp3'
      }
    }
  },
  methods: {
    play: function () {
      let audio = document.getElementById('musicMp3')
      if (this.isPlay) {
        audio.pause()
        this.isPlay = false
        this.doBofang = true
      } else {
        audio.play()
        this.isPlay = true
        this.doBofang = false
      }
    },
    createLrc: function () {
      
      var medis = document.getElementById('lrc_content').innerText
      // 用换行符拆分获取到的歌词
      var medises = medis.split('\n')
      // 遍历medises，并且将时间和文字拆分开，并push进自己定义的数组，形成一个对象数组
      for (var i = 0; i < medises.length; i++) {
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
      var $ul = document.getElementById('text')
      // 令正在唱的那一行高亮显示
      if (lineno > 0) {
        console.log(ul)
        $(ul.find('li').get(topNum + lineno - 1)).removeClass('lineheight')
      }
      var nowline = ul.find('li').get(topNum + lineno)
      $(nowline).addClass('lineheight')

      // 实现文字滚动
      var _scrollTop
      $ul.scrollTop = 0
      if ($ul.clientHeight * fraction > nowline.offsetTop) {
        _scrollTop = 0
      } else if (nowline.offsetTop > ($ul.scrollHeight - $ul.clientHeight * (1 - fraction))) {
        _scrollTop = $ul.scrollHeight - $ul.clientHeight
      } else {
        _scrollTop = nowline.offsetTop - $ul.clientHeight * fraction
      }

      // 以下声明歌词高亮行固定的基准线位置成为 “A”
      if ((nowline.offsetTop - $ul.scrollTop) >= $ul.clientHeight * fraction) {
        // 如果高亮显示的歌词在A下面，那就将滚动条向下滚动，滚动距离为 当前高亮行距离顶部的距离-滚动条已经卷起的高度-A到可视窗口的距离
        $ul.scrollTop += Math.ceil(nowline.offsetTop - $ul.scrollTop - $ul.clientHeight * fraction)
      } else if ((nowline.offsetTop - $ul.scrollTop) < $ul.clientHeight * fraction && _scrollTop !== 0) {
        // 如果高亮显示的歌词在A上面，那就将滚动条向上滚动，滚动距离为 A到可视窗口的距离-当前高亮行距离顶部的距离-滚动条已经卷起的高度
        $ul.scrollTop -= Math.ceil($ul.clientHeight * fraction - (nowline.offsetTop - $ul.scrollTop))
      } else if (_scrollTop === 0) {
        $ul.scrollTop = 0
      } else {
        $ul.scrollTop += $(ul.find('li').get(0)).height()
      }
    }
  },
  mounted () {
    this.createLrc()
    let _this = this
    this.createLrc()
    // this.changeLrc()
    let audio = document.getElementById('musicMp3')
    audio.ontimeupdate = function () {
      console.log(_this.medisArray[_this.lineNo].t)
      if (_this.lineNo === _this.medisArray.length - 1 && audio.currentTime.toFixed(3) >= parseFloat(_this.medisArray[_this.lineNo].t)) {
        console.log('---1---' + _this.lineNo)
        _this.lineHeight(_this.lineNo)
      }
      if (parseFloat(_this.medisArray[_this.lineNo].t) <= audio.currentTime.toFixed(3) &&
        audio.currentTime.toFixed(3) <= parseFloat(_this.medisArray[_this.lineNo + 1].t)) {
        console.log('===2===' + _this.lineNo)
        _this.lineHeight(_this.lineNo)
        _this.lineNo++
      }
    }
    window.onresize = function () { // 定义窗口大小变更通知事件
      _this.screenHeight = document.documentElement.clientHeight // 窗口高度
    }
    var canvas = document.getElementById('canvas')
    var ctx = canvas.getContext('2d')
    var w = canvas.width = window.innerWidth
    var h = canvas.height = window.innerHeight
    var hue = 217
    var stars = []
    var count = 0
    var maxStars = 1300 // 星星数量

    var canvas2 = document.createElement('canvas')
    var ctx2 = canvas2.getContext('2d')
    canvas2.width = 100
    canvas2.height = 100
    var half = canvas2.width / 2
    var gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half)
    gradient2.addColorStop(0.025, '#CCC')
    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)')
    gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)')
    gradient2.addColorStop(1, 'transparent')

    ctx2.fillStyle = gradient2
    ctx2.beginPath()
    ctx2.arc(half, half, half, 0, Math.PI * 2)
    ctx2.fill()

    // End cache

    function random (min, max) {
      if (arguments.length < 2) {
        max = min
        min = 0
      }

      if (min > max) {
        var hold = max
        max = min
        min = hold
      }

      return Math.floor(Math.random() * (max - min + 1)) + min
    }

    function maxOrbit (x, y) {
      var max = Math.max(x, y)
      var diameter = Math.round(Math.sqrt(max * max + max * max))
      return diameter / 2
      // 星星移动范围，值越大范围越小，
    }

    var Star = function () {
      this.orbitRadius = random(maxOrbit(w, h))
      this.radius = random(60, this.orbitRadius) / 8
      // 星星大小
      this.orbitX = w / 2
      this.orbitY = h / 2
      this.timePassed = random(0, maxStars)
      this.speed = random(this.orbitRadius) / 50000
      // 星星移动速度
      this.alpha = random(2, 10) / 10

      count++
      stars[count] = this
    }

    Star.prototype.draw = function () {
      var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX
      var y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY
      var twinkle = random(10)

      if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05
      } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05
      }

      ctx.globalAlpha = this.alpha
      ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius)
      this.timePassed += this.speed
    }

    for (var i = 0; i < maxStars; i++) {
      /* eslint-disable no-new */
      new Star()
    }

    function animation () {
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 0.5 // 尾巴
      ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)'
      ctx.fillRect(0, 0, w, h)

      ctx.globalCompositeOperation = 'lighter'
      for (var i = 1, l = stars.length; i < l; i++) {
        stars[i].draw()
      };

      window.requestAnimationFrame(animation)
    }

    animation()
  }

}
</script>
<style>

.ai00{
  width: 50px;
  height: 60px;
  position: relative;
}

.ai001{
  position: absolute;
  width: 50px;
  height: 60px;
  background-image: url(../../../static/img/music/bofang.png);
  background-repeat:no-repeat ;
  background-size:90% 80%;
  z-index:100;
}

.wrapindex {
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    /* margin-top: 15px; */
    width: 100%;
    border-radius: 10px
}
.wrap {
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    /* margin-top: 15px; */
    width: 100%;
    border-radius: 10px
}
.child_ico{
  height: 60px;
  /* border: 1px solid #666; */
  border-radius: 10px;
  -webkit-box-flex: 1;
  margin: 10px;
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
  background-image: url(../../../static/img/music/bofang.png);
  background-repeat:no-repeat ;
  background-size:90% 80%;
  /* background-attachment: fixed; */
}
.play{
  /* 上一曲*/
  background-image: url(../../../static/img/music/bofang_2.png);
  background-repeat:no-repeat ;
  background-size:90% 80%;
}
.ai02{
  /* 上一曲*/
  background-image: url(../../../static/img/music/ai09.png);
  background-repeat:no-repeat ;
  background-size:80% 80%;
  /* background-attachment: fixed; */
}
.wrapCanvas{
  height: 100%;
}

 .flex1 {
   margin-top: 15px;
   height: 60%;
   }
 .flex2 {
  height: 40%;
   }
.childindex {
    height: 300px;
    border: 1px solid #666;
    border-radius: 10px;
    -webkit-box-flex: 1;
    margin: 10px;
    -webkit-box-align: center;
    word-break: break-all;
    /* padding: 10px; */
    width: 30%;
    box-sizing: border-box;
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
.x{
  background-color: #666666;
}
.x1{
  color: white;
  min-height: 280px;
  border: 1px solid #666;
  border-radius: 10px;
  -webkit-box-flex: 1;
  margin: 10px;
  -webkit-box-align: center;
  word-break: break-all;
  padding: 10px;
  width: 30%;
  box-sizing: border-box;
}
.x:hover{
  border: 2px solid #666;
  background-color: #3BD9FF;
  transform: scale(1.15);
  z-index: 10;
  border-radius: 10px;
  transition: all 1s;

}

</style>
