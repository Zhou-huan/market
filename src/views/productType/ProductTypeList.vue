<template>
  <div>
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h3>
          商品分类
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-chaoshi" />
          </svg>
        </h3>
      </div>
      <!-- 搜索框 -->
      <el-form :inline="true" :model="searchForm" ref="searchForm">
        <el-form-item label="商品类型名称" prop="name">
          <el-input v-model="searchForm.name" placeholder="商品类型名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">查询</el-button>
          <el-button @click="doReset">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格内容 -->
      <el-table :data="tableData" highlight-current-row style="width: 100%" border>
        <el-table-column prop="id" label="分类ID"></el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
        <el-table-column prop="order" label="分类序号"></el-table-column>
        <el-table-column prop="desc" label="描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              slot="reference"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑对话框 -->
      <el-dialog title="编辑商品分类" :visible.sync="dialogFormVisible">
        <el-form
          :model="detilTypeFrom"
          status-icon
          :rules="rules"
          ref="detilTypeFrom"
          label-width="100px"
          class="demo-ruleFrom"
        >
          <el-form-item label="商品类别ID" prop="id">
            <el-input v-model="detilTypeFrom.id"></el-input>
          </el-form-item>
          <el-form-item label="商品类别名称" prop="name">
            <el-input v-model="detilTypeFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="商品类别序号" prop="order">
            <el-input v-model="detilTypeFrom.order"></el-input>
          </el-form-item>
          <el-form-item label="商品类别描述" prop="desc">
            <el-input v-model="detilTypeFrom.desc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editForm">修改</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { delType, editType, searchType, pageType } from "@/api/producttype.js";
export default {
  data() {
    return {
      dialogFormVisible: false, //对话框是否可见
      dialogVisible: false, //删除对话框默认不可见
      //编辑表单数据
      detilTypeFrom: {
        id: 0,
        name: "",
        order: 0,
        desc: ""
      },
      rules: {}, //验证规则
      currentPage4: 2,
      tableData: [
        {
          id: 1,
          order: 111,
          name: "王小虎",
          desc: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          order: 111,
          name: "王小虎2",
          desc: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 3,
          order: 111,
          name: "王小虎3",
          desc: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 4,
          order: 111,
          name: "王小虎4",
          desc: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 5,
          order: 111,
          name: "王小虎5",
          desc: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      //查询搜索表单的数据
      searchForm: {
        name: ""
      },
      //分页数据
      page: {
        currentPage: 1, //默认值
        pageSize: 5, //每页条数
        total: 10
      },
      //定义分页的页面渲染方法
      listPageRender() {
        const vm = this;
        pageType(this.page).then(page => {
          //更新表格数据
          vm.tableData = page.data;
          // 更新总计数据
          vm.page.total = page.total;
          //将数据按照分类ID排序
          vm.tableData.sort(function(a, b) {
            return a.id - b.id;
          });
        });
      }
    };
  },
  methods: {
    //分页方法
    handleSizeChange(val) {
      //每页长度变化是触发
      this.page.pageSize = val;
      this.page.currentPage = 1;
      //根据新条件渲染页面
      this.listPageRender();
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      //根据新条件查询页面
      this.listPageRender();
    },
    //点击修改按钮触发的事件
    handleEdit(i, row) {
      // 修改对话框的显示状态为true，即显示对话框
      this.dialogFormVisible = true;
      // 点击编辑按钮时，把当前行的数据，更新到form对于的model对象上
      this.detilTypeFrom = Object.assign({}, row); //浅拷贝传递
    },
    //点击修改确定按钮时触发的事件
    editForm() {
      // debugger
      const vm = this;
      //发送ajax请求
      editType(this.detilTypeFrom).then(data => {
        if (data.success) {
          vm.$message({
            type: "success",
            message: data.message,
            showClose: true,
            duration: 500,
            onClose: () => {
              //关闭对话框
              this.dialogFormVisible = false;
              //数据创建后，开始发送ajax请求
              this.listPageRender();
            }
          });
        }
      });
    },
    //点击删除按钮触发的事件
    handleDelete(i, row) {
      //修改对话框的显示状态为true，即为显示对话框
      this.ddialogVisible = true; //删除对话框默认不可见
      const vm = this;
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //确定删除发送ajax请求
        delType(row.id).then(data => {
          if (data.success) {
            vm.$message({
              type: "success",
              message: data.message,
              showClose: true,
              duration: 500,
              onClose: () => {
                //数据创建后，开始发送ajax请求
                this.listPageRender();
              }
            });
          } else {
            // 如果不合法
            this.$message.error(data.message);
          }
        });
      });
    },
    //查询方法
    doSearch() {
      //发送ajax请求
      searchType(this.searchForm).then(data => {
        this.tableData = data;
        this.page.total = data.length;
      });
    },
    //重置方法
    doReset() {
      // 重置表单
      this.$refs.searchForm.resetFields();
    }
  },
  created() {
    //避免函数里面拿不到vue实例对象this,就将该实例对象赋值给一个变量
    this.listPageRender();
    /*  const vm = this;
    pageType(this.page).then(page => {
      // debugger
      //更新表格数据
      vm.tableData = page;
      //将数据按照分类ID排序
      vm.tableData.sort(function(a,b){
        return (a.id)-(b.id);
      })
    }); */
  }
};
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 20px;
}
</style>