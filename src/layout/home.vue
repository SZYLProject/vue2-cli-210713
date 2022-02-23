<template>
  <div class="home rflex">
    <left-menu v-if="menuIsTrue"></left-menu>
    <div
      class="menu_right wflex el-scrollbar"
      ref="menu_right"
      :style="{ left: sidebar.width + 'px', height: homeeight }"
    >
      <!-- <head-nav></head-nav> -->
      <div class="menu_content" ref="menu_content">
        <bread v-if="menuIsTrue"></bread>
        <router-view></router-view
        ><!--页面渲染入口-->
      </div>
      <!-- <footerNav></footerNav> -->
      <backTop v-if="menuIsTrue" :ele="$refs.menu_right"></backTop>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

// import HeadNav from "./headNav.vue";
import LeftMenu from "./leftMenu.vue";
import Bread from "./bread.vue";
// import FooterNav from "./footerNav.vue";
import backTop from "@/components/backTop";

export default {
  name: "home",
  data() {
    return {
      homeeight: 0
    };
  },
  computed: {
    ...mapGetters(["sidebar", "menuIsTrue"])
  },
  components: {
    // HeadNav,
    LeftMenu,
    Bread,
    // FooterNav,
    backTop
  },
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
