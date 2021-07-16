<template>
  <div class="fillcontain">
    <div class="searchArea">el-table使用：二次封装table</div>

    <YzlElTable
      :colConfigs="colConfigs"
      :tableList="tableData"
      :height="450"
      @filterData="filterData"
      @selection-change="selectionChange"
      class="table_container"
    >
      <template v-slot:index>
        <el-table-column width="55" label="序号" type="index"></el-table-column>
      </template>
      <template v-slot:checkboxs>
        <el-table-column type="selection" width="55"></el-table-column>
      </template>
      <template v-slot:radio>
        <el-table-column width="55" label="单选" v-slot="scope">
          <el-radio
            :label="scope.row.id"
            v-model="modelRadio"
            @change="getSelectValues(scope.index_, scope.row)"
            >&nbsp;
          </el-radio>
        </el-table-column>
      </template>
      <template v-slot:operation>
        <el-table-column label="操作" fixed="right">
          <el-button type="primary" size="mini">删除</el-button>
        </el-table-column>
      </template>
    </YzlElTable>
    <!-- 表头合并 -->
    <div class="searchArea">el-table使用：二次封装table-表头合并</div>
    <YzlElTable
      :colConfigs="colConfigs1"
      :tableList="tableData"
      :height="450"
      @filterData="filterData"
      class="table_container"
    >
      <template v-slot:MultiLevelHeader>
        <el-table-column label="一级表头">
          <el-table-column prop="date" label="日期" min-width="120">
          </el-table-column>
          <el-table-column label="二级表头">
            <el-table-column prop="name" label="市区" min-width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" min-width="300">
            </el-table-column>
            <el-table-column prop="age" label="年龄" min-width="120">
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </template>
      <template v-slot:operation>
        <el-table-column label="操作" fixed="right">
          <el-button type="primary" size="mini">删除</el-button>
        </el-table-column>
      </template>
    </YzlElTable>
    <!-- 单元格列合并 -->
    <div class="searchArea">el-table使用：二次封装table-单元格列合并</div>
    <YzlElTable
      :colConfigs="colConfigs2"
      :tableList="tableData"
      :height="450"
      @filterData="filterData"
      class="table_container"
      :span-method="objectSpanMethod"
    >
      <template v-slot:operation>
        <el-table-column label="操作" fixed="right">
          <el-button type="primary" size="mini">删除</el-button>
        </el-table-column>
      </template>
    </YzlElTable>
    <!-- 单元格行合并 -->
    <div class="searchArea">el-table使用：二次封装table-单元格行合并</div>
    <YzlElTable
      :colConfigs="colConfigs2"
      :tableList="tableData"
      :height="450"
      @filterData="filterData"
      class="table_container"
      :span-method="arraySpanMethod"
    >
      <template v-slot:operation>
        <el-table-column label="操作" fixed="right">
          <el-button type="primary" size="mini">删除</el-button>
        </el-table-column>
      </template>
    </YzlElTable>
    <!-- 分页 -->
    <YzlPagination
      Postion="right"
      v-bind="pageInfo"
      @change="pageChange"
    ></YzlPagination>
    <!-- <pre>
            <code>{{sourceCode}}</code>
        </pre> -->
  </div>
</template>

<script>
import setSourceCode from "./data/setSourceCode.js";
// import YzlElTable from "../../components/tableCom/tableCom.vue";
import YzlElTable from "@/components/tableCom/tableCom.vue";

import YzlPagination from "../../components/PaginationCom/index.vue";
// import { Message } from "element-plus";
import { Message } from "element-ui";

export default {
  name: "tableComs",
  components: {
    YzlElTable,
    YzlPagination
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2016-05-01",
          name: "李大胖",
          address: "上海市普陀区金沙江路 1518 弄",
          age: "32"
        },
        {
          id: 2,
          date: "2016-05-01",
          name: "李大胖",
          address: "上海市普陀区金沙江路 1517 弄",
          age: "12"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          age: "92"
        },
        {
          id: 4,
          date: "2016-05-02",
          name: "王小虎",
          address: "御芝林御芝林御芝林",
          age: "62"
        },
        {
          id: 5,
          date: "2016-05-02",
          name: "王小虎",
          address: "御芝林御芝林御芝林",
          age: "42"
        },
        {
          id: 1,
          date: "2016-05-01",
          name: "李大胖",
          address: "上海市普陀区金沙江路 1518 弄",
          age: "32"
        },
        {
          id: 2,
          date: "2016-05-01",
          name: "李大胖",
          address: "上海市普陀区金沙江路 1517 弄",
          age: "12"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          age: "92"
        },
        {
          id: 4,
          date: "2016-05-02",
          name: "王小虎",
          address: "御芝林御芝林御芝林",
          age: "62"
        },
        {
          id: 5,
          date: "2016-05-02",
          name: "王小虎",
          address: "御芝林御芝林御芝林",
          age: "42"
        }
      ],
      colConfigs: [
        {
          slot: "index"
        },
        {
          slot: "checkboxs"
        },
        {
          slot: "radio"
        },
        {
          prop: "date",
          label: "日期",
          "min-width": 120,
          sort: true,
          link: true
        },
        {
          prop: "name",
          label: "学员姓名",
          "min-width": 120,
          sort: false,
          "show-overflow-tooltip": false,
          formatter: function(item) {
            return item + "御芝林";
          }
        },
        {
          prop: "address",
          label: "地址",
          "min-width": 100,
          sort: true,
          "show-overflow-tooltip": false
        },
        {
          prop: "age",
          label: "年龄",
          "min-width": 100,
          sort: false,
          "show-overflow-tooltip": false
        },
        {
          slot: "operation"
        }
      ],
      colConfigs1: [
        {
          prop: "date",
          label: "日期",
          "min-width": 120,
          sort: true,
          link: true
        },
        {
          slot: "MultiLevelHeader"
        },
        {
          slot: "operation"
        }
      ],
      colConfigs2: [
        {
          prop: "date",
          label: "日期",
          "min-width": 120,
          sort: true,
          link: true
        },
        {
          prop: "name",
          label: "学员姓名",
          "min-width": 120,
          sort: false,
          "show-overflow-tooltip": false,
          formatter: function(item) {
            return item + "御芝林";
          }
        },
        {
          prop: "address",
          label: "地址",
          "min-width": 100,
          sort: true,
          "show-overflow-tooltip": false
        },
        {
          prop: "age",
          label: "年龄",
          "min-width": 100,
          sort: false,
          "show-overflow-tooltip": false
        }
      ],
      modelRadio: "",
      pageInfo: {
        TotalCount: 0, //总条数
        PageIndex: 1, //当前页数
        PageSize: 10 //每页多少条
      },
      spanArr1: [],
      spanArr2: [],
      sourceCode: setSourceCode.code
    };
  },
  mounted() {
    Message.success("成功了");

    this.getSpanArr(this.tableData);
  },
  methods: {
    // 排序的回调事件
    filterData(data) {
      console.log(data);
    },
    // 多选、全选事件
    selectionChange(value) {
      console.log(value);
    },
    // 单选事件
    getSelectValues(index, value) {
      console.log(index, value);
    },
    //修改分页参数的时候
    pageChange({ currentPage, pageSizeNum }) {
      this.pageInfo.PageIndex = currentPage;
      this.pageInfo.PageSize = pageSizeNum;
      this.doSearch();
    },
    // 表格查询
    doSearch() {},
    getSpanArr(data) {
      let pos1 = 0;
      let pos2 = 0;
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr1.push(1);
          pos1 = 0;
          this.spanArr2.push(1);
          pos2 = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].date === data[i - 1].date) {
            this.spanArr1[pos1] += 1;
            this.spanArr1.push(0);
          } else {
            this.spanArr1.push(1);
            pos1 = i;
          }
          if (
            data[i].name === data[i - 1].name &&
            data[i].date === data[i - 1].date
          ) {
            this.spanArr2[pos2] += 1;
            this.spanArr2.push(0);
          } else {
            this.spanArr2.push(1);
            pos2 = i;
          }
        }
      }
    },
    // 列合并
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //row--行数据，column--列数据，rowIndex--行下标，columnIndex--列下标
      console.log(row, column);

      if (columnIndex === 0) {
        //第一列的合并方法,省
        const _row_1 = this.spanArr1[rowIndex];
        const _col_1 = _row_1 > 0 ? 1 : 0; //如果被合并了_row=0则它这个列需要取消
        return {
          rowspan: _row_1,
          colspan: _col_1
        };
      } else if (columnIndex === 1) {
        //第二列的合并方法,市
        const _row_2 = this.spanArr2[rowIndex];
        const _col_2 = _row_2 > 0 ? 1 : 0;
        return {
          rowspan: _row_2,
          colspan: _col_2
        };
      }
    },
    // 行合并
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      //row--行数据，column--列数据，rowIndex--行下标，columnIndex--列下标
      //第一行不合并
      console.log(row, column);
      if (rowIndex !== 0) {
        if (columnIndex === 1) {
          return [1, 3];
        } else if (columnIndex === 2 || columnIndex === 3) {
          return [0, 0];
        }
      }
    }
  }
};
</script>
<style scoped>
.table_container {
  padding: 10px;
  background: #fff;
  border-radius: 2px;
}
.searchArea {
  margin-bottom: 20px;
  margin-top: 20px;

  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  padding: 18px 18px 18px 18px;
}
</style>
