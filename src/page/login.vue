<template>
  <div id="login_frame" class="ui-wsng-bg">
      <!-- <p id="ui-wsng-margin-t20"><img class="wsng_login_logo" src="../../static/img/login/cat.jpg"></p> -->
      <form class="ui-wsng-margin-t60" method="post" action="login.js">
          <p><label class="label_input">用户名</label><input type="text" id="username" class="text_field"/></p>
          <p><label class="label_input">密码</label><input type="text" id="password" class="text_field"/></p>
          <div id="login_control">
              <input type="button" id="btn_login" value="登录" @click="login();"/>
              <a id="forget_pwd" href="forget_pwd.html">忘记密码？</a>
          </div>
      </form>
  </div>

</template>

<script>
import axios from '@/assets/ajax/http.js'
export default {
  name: 'wsng',

  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      a: 2
    }
  },
  methods: {
    send () {
      axios({
        method: 'post',
        url: 'Login/validateUser.do',
        data: {'account': '10002'}
      }).then(function (res) {
        console.log(res.data)
      })
    },
    login () {
      if (this.a === 2) {
        this.$router.push({
          path: '/page'
        })
      } else {
        console.log(this.a)
      }
    }
  },
  mounted () {
    document.querySelector('body').removeAttribute('class')
    document.querySelector('body').setAttribute('class', 'bg3')
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import '../components/css/component.css';
</style>
<style>
  .bg3 {
    background-color:#AAAAAA;
    background-repeat:no-repeat ;
    background-size:100% 100%;
    background-attachment: fixed;
  }
</style>
