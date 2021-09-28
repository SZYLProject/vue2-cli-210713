<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { setProjectIdSession } from "@/utils/auth.js";
import { setSessionStore } from "@/utils/mUtils.js";

export default {
  name: "App",
  mounted() {
    // 初始化存放当前项目projectId
    setProjectIdSession("1");
    // 用于切换mock数据，用于断网
    setSessionStore("isMock", "0");
  }
};
</script>

<style lang="scss">
@import "./style/variables";
@import "./style/element-ui";
@import "./style/common";
@import "./style/scrollBar";
</style>
