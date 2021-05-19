<template>
  <div>
    <div id="h_center1">
            <span>当前播放：</span>
            <span>大鱼海棠</span>
            <div v-bind:class="{play:isPlay,bofang:doBofang}">
              <audio id="now_music" src="../../../static/music/fly.mp3" ></audio>
            </div>
            <img src="../../../static/img/music/bofang.png" @click="play"/>

        </div>
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

      <ul id="text" style="overflow: hidden;" ref="text">
        <template v-for='(item,index) in medisArray'>
            <li  v-bind:key="index" style="list-style: none;" >{{item.c}}</li>
        </template>

      </ul>
  </div>

</template>

<script>
export default {
  name: 'irlytest',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      medisArray: [],
      isPlay: false,
      doBofang: true,
      lineNo: 0,
      footer: {
        songs: './static/music/abc.mp3'
      }
    }
  },
  methods: {
    play: function () {
      let audio = document.getElementById('now_music')
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
    },
    changeLrc: function () {
      let _this = this
      var i = 1
      setInterval(function () {
        console.log(i)
        i = i + 1
        _this.lineHeight(i)
      }, 500)
    }

  },
  mounted () {
    let _this = this
    this.createLrc()
    // this.changeLrc()
    let audio = document.getElementById('now_music')
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
  }

}

</script>

<style>
  .lineheight{
    color: #FF0000;
  }
</style>
