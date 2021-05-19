<template>
    <div class="ab clear">
      <div class="ad" style="" @click="changeStart">
        <audio  id="musicMp3">
          <source src="../../../static/music/abc.mp3">
          </source>
        </audio>
      </div>
    </div>

</template>

<script>
export default{
  data () {
    return {
      footer: {
        songs: './static/music/abc.mp3'
      }
    }
  },
  methods: {
    changeStart () {
      // event.stopPropagation();//防止冒泡
      let audio = document.getElementById('musicMp3')
      if (audio.paused) {
        // $('.btn-audio').css({'background':'url(images/voice_play.png) no-repeat center bottom','background-size':'cover'});
        audio.play()
        console.log('播放')
      } else {
        // $('.btn-audio').css({'background':'url(images/voice_stop.png) no-repeat center bottom','background-size':'cover'});
        audio.pause()
        console.log('暂停')
      }
    }
  },
  mounted () {
    // document.getElementById('musicMp3').pause()
  }
}

</script>

<style>
.ab{
  position: relative;
  height: 100px;
  width: 500px;
  border: 2px solid #0000FF;
  margin: auto;

}
.ad {
      position: absolute;
      height: 100px;
      width: 100px;
      z-index:10000;
      background-image: url(../../../static/img/music/bofang.png);
      background-size:cover;
      margin-left: 50%;

}
</style>
