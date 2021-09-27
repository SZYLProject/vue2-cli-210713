<template>
  <div class="left-drag">
    <div class="search">
      <!-- <el-input
        size="small"
        v-model="searchVariableValue"
        placeholder="搜索变量"
      >
        <i class="el-input__icon el-icon-search" slot="suffix">
        </i>
      </el-input> -->
      <el-autocomplete
        class="inline-input"
        v-model="searchVariableValue"
        :fetch-suggestions="querySearch"
        placeholder="搜索变量"
        :trigger-on-focus="false"
        @select="handleSelect"
        clearable
      >
        <i class="el-input__icon el-icon-search" slot="suffix">
          <!-- @click="handleIconClick(index)" -->
        </i>
      </el-autocomplete>
    </div>
    <div class="variable-lists">
      <p style="font-size:12px">
        共<span class="totle">{{ leftDraggableList.length }}</span
        >个样本
      </p>
      <div class="list-title"><span>变量列表</span><span>填充率(%)</span></div>
      <el-scrollbar style="height: 620px" ref="scroll">
        <div class="lists">
          <draggable
            :group="{ name: 'variable', pull: 'clone', put: false }"
            v-model="leftDraggableList"
            :clone="cloneElement"
          >
            <transition-group type="transition">
              <div
                class="leftDraggableListItem"
                v-for="(item, index) in leftDraggableList"
                :key="index"
              >
                <div class="leftDraggableListButton">
                  <div style="display:flex;margin-right:10px">
                    <img class="variable" :src="variable" alt="111" />
                  </div>
                  <div>{{ item.value }}</div>
                </div>
                <div>
                  {{ item.fillRate }}
                </div>
              </div>
            </transition-group>
          </draggable>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
// 导入draggable组件
import draggable from "vuedraggable";
import { mapState } from "vuex";
import variable from "@/assets/StatisticalAnalysis/variable.png";
export default {
  name: "LeftDrag",
  components: { draggable },
  data() {
    return {
      searchVariableValue: "",
      variable: variable
    };
  },
  computed: {
    ...mapState({
      leftDraggableList: state => state.statisticalAnalysis.leftDraggableList
    })
  },
  methods: {
    start() {
      // 修改调用此方法
      this.$store.dispatch("setLeftDraggableList");
    },
    // 拖拽可修改元素：重置对象属性
    cloneElement(clone) {
      console.log(clone, "clone");
      return {
        ...clone
      };
    },
    querySearch(queryString, callback) {
      if (queryString === "") {
        return;
      }
      //  const params = {
      //   keyword: queryString,
      //   disease_name: localStorage.getItem("disease_name"),
      //   // disease_name: 'HC',
      //   pageNum: 1,
      //   pageSize: 40
      // };
      // diease360.literature(params).then(res => {
      //   const data = res.data.data.list.map(item => {
      //     return {
      //       value: item.title
      //     };
      //   });
      //   callback(data);
      // });
      callback(this.leftDraggableList);
    },
    handleSelect(item) {
      console.log(item);
      this.searchVariableValue = item.value;
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.left-drag {
  background: #ffffff;
  .search {
    padding: 8px 20px;
    // border-bottom: 1px solid #e6e6e6;
  }
  .variable-lists {
    padding: 10px 20px;
    .totle {
      margin: 0 5px;
      color: #0070f4;
    }
    .list-title {
      font-size: 13px;
      display: flex;
      justify-content: space-between;
      color: #999999;
      margin: 10px 0 0;
    }
    .lists {
      .leftDraggableListItem {
        cursor: pointer;
        font-size: 12px;
        display: flex;
        // justify-content: space-between;
        line-height: 35px;
        margin: 10px 0;
        .leftDraggableListButton {
          display: flex;
          align-items: center;
          text-align: center;
          border: 1px dashed #e6e6e6;
          width: 100px;
          overflow: hidden;
          padding: 0 5px;
          margin-right: 10px;
          .iconfont {
            color: #0070f4;
            margin-right: 5px;
          }
          .variable {
            width: 18px;
            height: auto;
            // height: 20px;
          }
        }
      }
    }
  }
}
.ghost {
  opacity: 0;
  height: 0;
}
.el-icon-search:before {
  color: #0070f4;
}
// /deep/.el-scrollbar__wrap {
//   margin-top: 18px;
// }
// }
</style>
