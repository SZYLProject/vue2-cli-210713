<template>
  <div class="home rflex">
    <div
      class="menu_right wflex el-scrollbar"
      ref="menu_right"
      :style="{ left: 0 + 'px', height: homeeight }"
    >
      <div class="menu_content" ref="menu_content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      homeeight: 0
    };
  },
  computed: {},

  created() {
    this.bodyHeight();
  },
  mounted() {},
  methods: {
    // 获取页面高度
    bodyHeight() {
      const height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      this.homeeight = height;
    }
  },
  watch: {}
};
</script>
<style scoped lang="scss">
.home {
  .menu_right {
    overflow: auto;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    background: #ffffff;
    .menu_content {
      position: relative;
      margin-top: 0px;
      width: 100%;
      background: #f0f2f5;
    }
  }
}
</style>
