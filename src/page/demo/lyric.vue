<template>
  <div>
     <div class="lyric-wrapper" ref="lyricList" :data="currentLyric && currentLyric.lines">
       <div>
        <div class="lyric">
         <p :key="index" v-for="(line,index) in currentLyric.lines" ref="lyricLine"
             :class="{'current':currentLineNum===index}"
             class="text">{{line.txt}}</p>
        </div>
      </div>
     </div>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'
import Lyric from 'lyric-parser'
export default {
  data () {
    return {
      currentLyric: {
        lines: []
      },
      currentLineNum: 1,
      base: 'W3RpOua8lOWRmF0KW2FyOuiWm+S5i+iwpl0KW2FsOue7heWjq10KW2J5Ol0KW29mZnNldDowXQpbMDA6MDAuNTZd5ryU5ZGYIC0g6Jab5LmL6LCmClswMDowMi40Ml3or43vvJrolpvkuYvosKYKWzAwOjAzLjk5Xeabsu+8muiWm+S5i+iwpgpbMDA6MDUuMzhd57yW5puy77ya6YOR5LyfL+W8oOWuneWuhwpbMDA6MDcuNDVd5Yi25L2c5Lq677ya6LW16Iux5L+KClswMDowOS4wOV3lkIjlo7DvvJrotbXoi7Hkv4oKWzAwOjEwLjQ4XeW9lemfs+W4iO+8mueOi+aZk+a1twpbMDA6MTEuNzRdClswMDoxMi4zNF3mt7fpn7PluIjvvJrpso3plJAKWzAwOjEzLjg4XeavjeW4puWkhOeQhuW3peeoi+W4iO+8mumyjemUkApbMDA6MTYuMTBdClswMDoyMS4yNV3nroDljZXngrkKWzAwOjIyLjIxXQpbMDA6MjUuMTZd6K+06K+d55qE5pa55byP566A5Y2V54K5ClswMDoyOC4yN10KWzAwOjMwLjIyXemAkui/m+eahOaDhee7quivt+ecgeeVpQpbMDA6MzMuNTdd5L2g5Y+I5LiN5piv5Liq5ryU5ZGYClswMDozNi4yN13liKvorr7orqHpgqPkupvmg4XoioIKWzAwOjM5LjA4XQpbMDA6NDIuMjBd5rKh5oSP6KeBClswMDo0My43NF0KWzAwOjQ2LjE3XeaIkeWPquaDs+eci+eci+S9oOaAjuS5iOWchgpbMDA6NDkuNDddClswMDo1MS43NF3kvaDpmr7ov4fnmoTlpKrooajpnaIKWzAwOjU0LjYwXeWDj+ayoeWkqei1i+eahOa8lOWRmApbMDA6NTcuMjFd6KeC5LyX5LiA55y86IO955yL6KeBClswMDo1OS42OF0KWzAxOjAyLjQ2XeivpemFjeWQiOS9oOa8lOWHuueahOaIkea8lOinhuiAjOS4jeingQpbMDE6MDcuMDJdClswMTowNy41Nl3lnKjpgLzkuIDkuKrmnIDniLHkvaDnmoTkurrljbPlhbTooajmvJQKWzAxOjEyLjE5XQpbMDE6MTIuODZd5LuA5LmI5pe25YCZ5oiR5Lus5byA5aeL5pS26LW35LqG5bqV57',
      lyric: '[00:00:01] 这是一个测试 [00:00:03] 这是一个测试1 [00:00:06] 这是一个测试2'
    }
  },
  methods: {
    getLyric: function () {
      // 调用项目中获取歌词的api，获取到的是使用js-base64转了格式后的歌词（如图2）
      // this.currentSong.getLyric().then((lyric) => {
      // 新建Lyric-parser歌词对象
      this.lyric = Base64.decode(this.base)
      this.currentLyric = new Lyric(this.lyric, this.handleLyric)
      this.currentLyric.play()
      console.log(this.currentLyric)
      // 如果当前歌曲为播放状态，调用歌词对象的播放方法，播放歌词（滚动需结合better-scroll）
      //   if (this.playing) {
      //     this.currentLyric.play()
      //   }
      // })
    }
    // handleLyric: function ({lineNum, txt}) {
    //   this.currentLineNum = lineNum
    //   // 若当前行大于5,开始滚动,以保歌词显示于中间位置
    //   if (lineNum > 5) {
    //     let lineEl = this.$refs.lyricLine[lineNum - 5]
    //     // 结合better-scroll，滚动歌词
    //     this.$refs.lyricList.scrollToElement(lineEl, 1000)
    //   } else {
    //     this.$refs.lyricList.scrollToElement(0, 0, 1000)
    //   }
    // }
  },
  mounted () {
    this.getLyric()
  }

}
</script>

<style>
  div{
      position: relative;
      overfllow:hidden;
     /* height:200px;*/
  }
  ul{
      position:absolute;
  }
</style>
