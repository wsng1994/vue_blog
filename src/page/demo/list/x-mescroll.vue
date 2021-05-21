<template>
  <div ref="mescroll" class="mescroll">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 引入mescroll.min.js和mescroll.min.css
import MeScroll from "./mescroll/mescroll.js";

export default {
  name: "x-mescroll",
  data: function() {
    return {
      mescroll: null,
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null // 路由切换时是否禁止ios回弹
    };
  },
  props: {
    // 上拉
    up: Object,
    // 下拉
    down: Object
  },
  created() {},
  mounted: function() {
    //
    this.mescroll = new MeScroll(this.$refs.mescroll, {
      up: this.up,
      down: this.down
    });
    this.$emit("init", this.mescroll); // init回调mescroll对象
  },
  // 每次进入页面执行
  activated() {},
  methods: {
    beforeRouteEnter() {
      if (this.mescroll) {
        // 滚动到之前列表的位置
        if (this.lastScrollTop) {
          this.mescroll.setScrollTop(this.lastScrollTop);
          setTimeout(() => {
            // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
            this.mescroll.setTopBtnFadeDuration(0); // 设置回到顶部按钮显示时无渐显动画
          }, 16);
        }
        // 恢复到之前设置的isBounce状态
        if (this.lastBounce != null) this.mescroll.setBounce(this.lastBounce);
      }
    },
    beforeRouteLeave() {
      if (this.mescroll) {
        this.lastScrollTop = this.mescroll.getScrollTop(); // 记录当前滚动条的位置
        this.mescroll.hideTopBtn(0); // 隐藏回到顶部按钮,无渐隐动画
        this.lastBounce = this.mescroll.optUp.isBounce; // 记录当前是否禁止ios回弹
        this.mescroll.setBounce(true); // 允许bounce
      }
    }
  }
};
</script>

<style>
@import url("./mescroll/mescroll.css");
</style>
