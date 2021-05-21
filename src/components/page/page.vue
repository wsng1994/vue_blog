<template>

  <div>
    <div class="page-bar"  v-if="pages">
      <ul style="text-align: center;">
      <li v-if="pageNum!=1"><a style="margin-right: -5px;border-right: 0px solid white;" v-bind:class="{ ui_btn_pre:pageNum!=1}" @click="btnClick(pageNum-1)"><</a></li>
      <li v-for="index in indexs" v-bind:class="{ active: pageNum == index}" v-bind:data-id="index">
      <a v-show="pages==1" class="ui_btn_one" v-on:click="btnClick(index)">{{ index }}</a>
      <a v-show="pages>1" v-bind:class="{ ui_btn:index == 1&&pageNum==1,ui_btn_last:pageNum==pages&&index==pages}" v-on:click="btnClick(index)">{{ index }}</a>
      </li>
      <li v-if="pageNum!=pages"><a style="margin-left: -5px; border-left: 0px solid white;" v-bind:class="{ ui_btn_next:pageNum!=pages}" @click="btnClick(pageNum+1)">></a></li>
      <!-- <li><a>共<i>{{pages}}</i>页</a></li> -->
      </ul>
      </div>
      <div style="text-align: center;font-size: 20px;" v-if="pages==0">无记录</div>
      </div>
  </div>
</template>

<script>
  export default {
  props: {
          	pageNum: {
                  type: [String, Number],
                  required: true
              },
              pages: {
                  type: [String, Number],
                  required:true
              },
              callback: {
                 default: function() {
                      return function callback() {
                        console.log(999)
                      }
                  }
              }
          },
          computed: {
              indexs: function() {
                console.log(this.pageNum)
                  var left = 1;
                  var right = this.pages;
                  var ar = [];
                  if (this.pages >= 11) {
                      if (this.pageNum > 5 && this.pageNum < this.pages - 4) {
                          left = this.pageNum - 5;
                          right = this.pageNum + 4
                      } else {
                          if (this.pageNum <= 5) {
                              left = 1;
                              right = 10
                          } else {
                              right = this.pages;
                              left = this.pages -9
                          }
                      }
                  }
                  while (left <= right) {
                      ar.push(left);
                      left ++
                  }
                  return ar
              }
          },
          methods: {
              btnClick:function(page) {
                console.log(page)
                  if (page != this.pageNum) {
                      this.callback(page)
                  }
              }
          }
}
</script>

<style>
  @import '../css/page.css';

  .ui_btn_last {
    border-radius: 0px 6px 6px 0px/0px 6px 6px 0px;
  }
  .ui_btn_one {
    border-radius: 6px;
  }

  .ui_btn_pre {
    font-weight: bold;
    border-radius: 6px 0px 0px 6px/6px 0px 0px 6px;
  }

  .ui_btn_next {
    font-weight: bold;
    border-radius: 0px 6px 6px 0px/0px 6px 6px 0px;
  }

  .ui_btn {
    border-radius: 6px 0px 0px 6px/6px 0px 0px 6px;
    margin-left: 0px;
  }
</style>
