<template>
  <div>
    <div id="variable" class="drag">
      <div
        class="logArea el-scrollbar"
        v-for="(item, i) in draggableList"
        :key="i"
      >
        <draggable
          class="draggableClass"
          :move="onMove"
          :disabled="item.draggableDisabled"
          animation="1000"
          touchStartThreshold="10px"
          :list="item.variableList"
          group="variable"
          ghostClass="ghost"
          chosenClass="ghost"
          @change="toChange(i)"
        >
          <div style="display:flex;margin-bottom:10px">
            <p style="font-size:13px;margin-right:5px">
              {{ item.explanation }}
            </p>
            <i style="cursor:pointer" class="el-icon-info"></i>
          </div>
          <el-button
            style="margin:10px"
            size="small"
            v-for="(item, index) in item.variableList"
            :key="index"
            >{{ item.value }}</el-button
          >
        </draggable>
      </div>
    </div>
    <div class="tab-foot">
      <div style="font-size:13px">
        <!-- <span v-for="(itemNum, i) in draggableList" :key="i">
          您可拖入<span class="blue">{{ itemNum.draggableLimitNum }}</span
          >个变量,
        </span> -->
        <span>{{ draggablePrompt }}</span>
      </div>
      <div>
        <el-button @click="clearVariables" type="text" icon="el-icon-delete"
          >清空变量</el-button
        >
        <!-- <el-button @click="clearVariables" type="text" icon="el-icon-delete"
          >清空内容</el-button
        > -->
        <el-button type="primary" size="mini" @click="startAnalysis"
          >开始分析</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import { mapState } from "vuex";

export default {
  components: {
    draggable
  },
  data() {
    return {
      draggableList: [],
      draggablePrompt: ""
    };
  },
  props: {
    draggableObj: {
      type: Object,
      default: () => {
        return {
          draggableNum: 2,
          prompt: "您可拖入1个变量，您可拖入2个变量",
          draggableList: [
            { explanation: "任意变量1", draggableNum: 1 },
            { explanation: "任意变量2", draggableNum: 2 }
          ],
          returnGroup: false // true的时候按照分类返回
        };
      }
    }
  },
  computed: {
    ...mapState({
      tabListIndex: state => state.statisticalAnalysis.tabListIndex
    })
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      // for (let index = 0; index < this.draggableNum; index++) {
      //   this.draggableList.push({
      //     draggableDisabled: false, // 是否可拖拽到当前区域,默认false可以拖拽
      //     variableList: [], // 拖拽存储数据
      //     draggableLimitNum: 1 // 拖拽限时数量
      //   });
      // }
      for (let index = 0; index < this.draggableObj.draggableNum; index++) {
        this.draggableList.push({
          draggableDisabled:
            this.draggableObj.draggableList[index].draggableNum <= 0
              ? true
              : false, // 是否可拖拽到当前区域,默认false可以拖拽
          variableList: [], // 拖拽存储数据
          draggableLimitNum:
            this.draggableObj.draggableList[index].draggableNum > 0
              ? this.draggableObj.draggableList[index].draggableNum
              : 0, // 拖拽限时数量
          explanation: this.draggableObj.draggableList[index].explanation
        });
      }
      this.draggablePrompt = this.draggableObj.prompt;
      // this.judge();
    },
    judge() {
      for (let i = 0; i < this.draggableList.length; i++) {
        this.toChange(i);
      }
    },
    //move回调方法
    onMove(e, originalEvent) {
      console.log(originalEvent, "originalEvent");
      //不允许停靠
      // if (this.variableList.length >= this.draggableLimitNum) return false;
      // //不允许拖拽
      // if (this.variableList.length < this.draggableLimitNum) return false;
      return true;
    },

    // 拖拽
    toChange(i) {
      // if (this.draggableDisabled === true) {
      //   this.$message({
      //     message: "您最多可拖入" + this.draggableLimitNum + "个变量",
      //     type: "error"
      //   });
      // }
      if (
        this.draggableList[i].variableList.length >=
        this.draggableList[i].draggableLimitNum
      ) {
        this.draggableList[i].draggableDisabled = true; // 不可拖入
      } else {
        this.draggableList[i].draggableDisabled = false;
      }
    },
    // 开始分析
    startAnalysis() {
      if (!this.draggableObj.returnGroup) {
        const data = this.returnAll();
        this.$emit("startAnalysis", data);
      } else {
        const data = this.returnGroup();
        this.$emit("startAnalysis", data);
      }
    },
    returnAll() {
      const data = [];
      this.draggableList.forEach(el => {
        data.push(...el.variableList);
      });
      console.log(this.draggableList, "draggableList");
      console.log(data, "tata");
      if (data.length === 0) {
        this.$message({ type: "warning", message: "请至少选择一个变量" });
        return;
      }
      return data;
    },
    returnGroup() {
      const data = [];
      this.draggableList.forEach(el => {
        data.push(el.variableList);
      });
      console.log(this.draggableList, "draggableList");
      if (data.length === 0) {
        this.$message({ type: "warning", message: "请至少选择一个变量" });
        return;
      }
      return data;
    },

    // 清空变量
    clearVariables() {
      this.draggableList.forEach(el => {
        el.variableList = [];
        el.draggableDisabled = false;
      });
    }
  }
};
</script>
<style scoped lang="scss">
.drag {
  display: flex;
  justify-content: space-between;
  border: 1px solid #e6e6e6;
  margin: 15px 0 5px;
  // padding: 10px 15px;
  color: #999999;
  .logArea {
    flex: 1;
    overflow: auto;
    height: 100%;
    border-right: 1px solid;
    &:last-of-type {
      border-right: none;
    }
    margin: 10px 15px;
    .draggableClass {
      height: 80px;
      // overflow: scroll;
    }
  }
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
