<template>
  <div class="szyl-el-table">
    <el-table
      v-if="isRefresh"
      ref="refTable"
      :data="tableList"
      :height="height"
      :max-height="maxHeight"
      @selection-change="selectionChangeF"
      @select="select"
      @select-all="selectAll"
      @header-dragend="headerDragendF"
      :span-method="spanMethod"
      :row-key="rowKey"
      border
      :stripe="stripe"
      tooltip-effect="dark"
      v-bind="$attrs"
    >
      <template v-for="colConfig in colConfigs">
        <slot v-if="colConfig.slot" :name="colConfig.slot"></slot>
        <el-table-column
          v-else-if="colConfig.type !== 'selection'"
          v-bind="colConfig"
          :key="colConfig.prop"
        >
          <template #header>
            <SzylTableCell
              v-if="colConfig.headerRenderer"
              :renderer="h => colConfig.headerRenderer(h)"
            ></SzylTableCell>
            <span
              v-else-if="colConfig.headerFormatter"
              v-html="colConfig.headerFormatter()"
            ></span>
            <span v-else>{{ colConfig.label }}</span>
            <span class="szyl-el-table__sortBox" v-if="colConfig.sort">
              <i
                @click="setSort(colConfig.prop, 0)"
                class="szyl-el-table__sort szyl-el-table__asc"
                :style="{
                  borderBottomColor:
                    tempObj[colConfig.prop].sort === 0 ? '#1F9B83' : '#c0c4cc'
                }"
              ></i>
              <i
                @click="setSort(colConfig.prop, 1)"
                class="szyl-el-table__sort szyl-el-table__desc"
                :style="{
                  borderTopColor:
                    tempObj[colConfig.prop].sort === 1 ? '#1F9B83' : '#c0c4cc'
                }"
              ></i>
            </span>
          </template>
          <template v-slot="scope">
            <a
              v-if="colConfig.link"
              @click="itemClick(scope.row, colConfig.prop)"
            >
              {{ scope.row[colConfig.prop] }}
            </a>
            <template v-else-if="colConfig.formatter">
              <span
                v-html="
                  colConfig.formatter(
                    scope.row[colConfig.prop],
                    scope.row,
                    colConfig.prop,
                    scope
                  )
                "
              ></span>
            </template>
            <SzylTableCell
              v-else-if="colConfig.renderer"
              :renderer="h => colConfig.renderer(h, scope)"
            ></SzylTableCell>
            <template v-else-if="colConfig.rowSlot">
              <div>
                <slot :scope="scope"></slot>
              </div>
            </template>
            <template v-else
              >{{
                scope.row[colConfig.prop] === undefined ||
                scope.row[colConfig.prop] === null ||
                scope.row[colConfig.prop] === ""
                  ? "-"
                  : scope.row[colConfig.prop]
              }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          v-bind="colConfig"
          :key="colConfig.prop"
        ></el-table-column>
      </template>
      <template v-slot:empty>
        <img src="@/assets/images/empty.png" alt="" class="table-empty" />
      </template>
    </el-table>
  </div>
</template>
<script>
import SzylTableCell from "./tableCell.vue";

export default {
  components: {
    SzylTableCell
  },
  props: {
    stripe: {
      type: Boolean,
      default: false
    },
    colConfigs: {
      type: Array,
      default: () => []
    },
    tableList: {
      type: Array,
      default() {
        return [];
      }
    },
    height: Number,
    maxHeight: Number,
    rowKey: Function,
    spanMethod: Function
  },
  data() {
    return {
      refTable: this.$refs.refTable,
      isRefresh: true,
      tempObj: {},
      searchData: {
        filter: [], //列过滤条件集合
        sort: [] //列排序条件集合
      }
    };
  },
  watch: {
    tableList(val) {
      console.log(val);
    },
    headerDragendF(val) {
      console.log(val);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    /* 初始化排序信息 */

    init() {
      for (var i = this.colConfigs.length - 1; i >= 0; i--) {
        if (this.colConfigs[i].prop) {
          this.tempObj[this.colConfigs[i].prop] = {
            sort: ""
          };
        }
      }
    },
    //表头设置排序  0升序 1降序

    setSort(prop, val) {
      if (!this.tempObj[prop]) {
        this.tempObj[prop] = { sort: val };
      } else {
        this.tempObj[prop].sort = val;
      }
      let i = this.arrHasItme(this.searchData.sort, prop);
      if (i > -1) {
        this.searchData.sort[i].sort = val;
      } else {
        this.searchData.sort.push({
          prop: prop,
          sort: val
        });
      }
      this.$emit("filterData", this.searchData);
      this.goToRefresh();
    },
    goToRefresh() {
      this.isRefresh = false;
      // 在组件移除后，重新渲染组件
      // nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.isRefresh = true;
      });
    },

    //判断数组是否存在改元素
    arrHasItme(arr, prop) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].prop == prop) {
          return i;
        }
      }
      return -1;
    },
    //表格元素点击事件
    itemClick(data, prop) {
      this.$emit("itemClick", { data: data, prop: prop });
    },
    //选中行变化时
    selectionChangeF(val) {
      this.$emit("selection-change", val);
    },
    // selectAll
    selectAll(all) {
      this.$emit("select-all", all);
    },
    select(selecteds, row) {
      this.$emit("select", selecteds, row);
    },
    //当拖动表头改变了列的宽度的时候会触发该事件
    headerDragendF() {
      this.$nextTick(() => {
        this.refTable.value.doLayout();
      });
    },
    // 清空clearSelection
    clearSelection() {
      this.refTable.value.clearSelection();
    },
    // 返选
    toggleRowSelection(row, status) {
      this.refTable.value.toggleRowSelection(row, status);
    }
  }
};
</script>

<style lang="scss">
.szyl-el-table .el-table__row a {
  color: $main-color;
  cursor: pointer;
}

.szyl-el-table .el-table__row a.szyl-el-table__btn {
  text-decoration: none;
  padding: 0 5px;
}

.szyl-el-table .el-table th,
.szyl-el-table .el-table thead.is-group th {
  background: $thead-bg;
  font-size: $thead-fs;
  font-weight: $thead-fw;
  color: $thead-color;
  height: $thead-h;
}

.szyl-el-table .el-table--small th {
  padding: 0;
}

.szyl-el-table .el-table td {
  font-size: 12px;
  padding: 7px 0;
  font-weight: normal;
  color: #666;
}

.szyl-el-table .el-table .cell {
  line-height: 24px;
}

.szyl-el-table__sortBox {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 22px;
  width: 24px;
  vertical-align: middle;
  cursor: pointer;
  overflow: initial;
  position: relative;
}

.szyl-el-table__sort {
  width: 0;
  height: 0;
  border: 6px solid transparent;
  position: absolute;
  left: 7px;
}

.szyl-el-table__sort.szyl-el-table__asc {
  border-bottom-color: #c0c4cc;
  top: -3px;
}

.szyl-el-table__sort.szyl-el-table__desc {
  border-top-color: #c0c4cc;
  bottom: -1px;
}

.szyl-el-table .el-table .szyl-el-table__history td {
  color: #999;
}

.szyl-el-table .el-table .szyl-el-table__pre__cancel td {
  color: #999;
}
.szyl-el-table .el-table__empty-block {
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  padding-right: 100%;
}

.table-empty {
  width: 99px;
  height: 72px;
  padding: 110px 0;
}
</style>
