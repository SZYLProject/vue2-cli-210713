<template>
  <div>
    <div id="variable" class="drag">
      <div style="display:flex">
        <p style="font-size:13px;margin-right:5px">任意变量</p>
        <i style="cursor:pointer" class="el-icon-info"></i>
      </div>
      <div style="margin-top:10px;height:25px">
        <draggable
          :move="onMove"
          :disabled="draggableDisabled"
          animation="1000"
          touchStartThreshold="10px"
          :list="variableList"
          group="variable"
          ghostClass="ghost"
          chosenClass="ghost"
          @change="toChange"
        >
          <el-button
            size="small"
            v-for="(item, index) in variableList"
            :key="index"
            >{{ item.name }}</el-button
          >
        </draggable>
      </div>
    </div>
    <div class="tab-foot">
      <div style="font-size:13px">
        您可拖入<span class="blue">{{ draggableLimitNum }}</span
        >个变量
      </div>
      <div>
        <el-button @click="clearVariables" type="text" icon="el-icon-delete"
          >清空变量</el-button
        >
        <el-button type="primary" size="mini" @click="startAnalysis"
          >开始分析</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable
  },
  data() {
    return {
      draggableDisabled: false, // 是否可拖拽到當前區域
      variableList: [], // 拖拽存储數據
      draggableLimitNum: 2 // 拖拽限时数量
    };
  },
  methods: {
    //move回调方法
    onMove(e, originalEvent) {
      console.log(originalEvent, "originalEvent");
      //不允许停靠
      if (this.variableList.length >= this.draggableLimitNum) return false;
      //不允许拖拽
      if (this.variableList.length < this.draggableLimitNum) return false;
      return true;
    },
    // 拖拽
    toChange(v) {
      console.log(v);
      // if (this.draggableDisabled === true) {
      //   this.$message({
      //     message: "您最多可拖入" + this.draggableLimitNum + "个变量",
      //     type: "error"
      //   });
      // }
      if (this.variableList.length >= this.draggableLimitNum) {
        this.draggableDisabled = true; // 不可拖入
      } else {
        this.draggableDisabled = false;
      }
    },
    // 开始分析
    startAnalysis() {
      this.$emit("startAnalysis", this.variableList);
    },
    // 清空变量
    clearVariables() {
      this.variableList = [];
      this.draggableDisabled = false;
    }
  }
};
</script>
<style scoped lang="scss">
.drag {
  border: 1px solid #e6e6e6;
  margin: 15px 0 5px;
  padding: 10px 15px;
  color: #999999;
}
.tab-foot {
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  color: #999999;
  .blue {
    margin: 0 5px;
    color: #0070f4;
  }
}
</style>
