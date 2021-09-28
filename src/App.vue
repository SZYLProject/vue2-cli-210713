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
    // 初始化存放当前项目projectId，每个地方部署都需要更换id，由后台告知
    setProjectIdSession("1");
    // 用于切换mock数据，用于断网：0表示使用Mock数据，1表示使用后台数据
    setSessionStore("isMock", "1");
  }
};
</script>

<style lang="scss">
@import "./style/variables";
@import "./style/element-ui";
@import "./style/common";
@import "./style/scrollBar";
</style>
