<template>
  <div class="account-list">
    <!-- 卡片组件 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h3>账号列表
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-chaoshi" />
          </svg>
        </h3>
      </div>
      <!-- 搜索框 -->
      <el-form :inline="true" :model="searchForm" ref="searchForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="searchForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <!-- 
          账户表单“角色字段”的回填,HTML部分，下拉框的value属性是“数字类型”
                  <el-option lable=””   :value=”1”>//此时就是数字类型，不是字符串了
         账户对象，他的角色属性是 “数字类型”
        -->
        <el-form-item label="角色" prop="role">
          <el-select v-model="searchForm.role" placeholder="角色">
            <el-option label="超级管理员" :value="1"></el-option>
            <el-option label="普通员工" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">查询</el-button>
          <el-button @click="doReset">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 内容部分 -->
      <!-- 
          data ： 表格的动态数据
          stripe ： 是否开启各行换色
          border:是否有边框
      -->
      <el-table :data="tableData" border style="width: 100%">
        <!-- 
            prop ： 对应列内容的字段名(遍历对象的属性名称)
            label: 显示的标题
            width: 对应列的宽度
        -->
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="username" label="账号"></el-table-column>
        <!-- <el-table-column prop="role" label="角色"></el-table-column> -->
        <!-- 使用作用域插槽(类似于子调父) -->
        <el-table-column label="角色">
          <template slot-scope="scope">
            <!-- 在table的列组件中，使用插槽可以自定义HTML内容  -->
            <span style="margin-left: 10px">{{ scope.row.role===1 ? '超级管理员':'普通员工'}}</span>
          </template>
        </el-table-column>
        <!-- 使用作用域插槽(类似于子调父)用于在一堆循环数据中设置我需要的那部分字段的修改设置-->
        <el-table-column label="日期">
          <template slot-scope="scope">
            <!-- 在table的列组件中，使用插槽可以自定义HTML内容  -->
            <span style="margin-left: 10px">{{ scope.row.inputtime | formateDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              slot="reference"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页  -->
      <!-- 
            current-page	当前页数
            page-sizes	    每页显示个数选择器的选项设置
            page-size       每页显示条目个数(值必须属于page-sizes)
            layout   
            size-change    页码长度（pageSize）改变的监听   
            current-change    当前页码（currentPage）改变的监听  
      -->
      <div class="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="page.pageSize"
          layout="total, prev, pager, next, jumper,sizes"
          :total="page.total"
        ></el-pagination>
      </div>
    </el-card>

    <!-- 编辑对话框 -->
    <!-- 
        visible ： 是否默认可见
        status-icon	是否在输入框中显示校验结果反馈图标
        label-width	表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。	string
        rules	表单验证规则	object	
        model	表单数据对象	object	
        prop	表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的	string
    -->
    <el-dialog title="账号修改" :visible.sync="dialogFormVisible">
      <el-form
        :model="editAcountForm"
        status-icon
        :rules="rules"
        ref="editAcountForm"
        label-width="100px"
        class="demo-ruleFrom"
      >
        <el-form-item label="账号" prop="name">
          <el-input v-model="editAcountForm.username"></el-input>
        </el-form-item>

        <!-- 
              label ： 下拉框显示的值
              value ： 下拉框传递的值
        -->
        <el-form-item label="用户角色" prop="role">
          <el-select v-model.number="editAcountForm.role" placeholder="请选择" label-width="400px">
            <el-option label="超级管理员" :value="1"></el-option>
            <el-option label="普通员工" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editForm">修改</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* 引入需要的模块 */
import {
  editAcount,
  delAcount,
  searchAcount,
  pageAcount
} from "@/api/account.js";
import moment from "moment";
export default {
  data() {
    return {
      dialogFormVisible: false, // 修改对话框默认不可见
      dialogVisible: false, //删除对话框默认不可见
      //编辑表单数据
      editAcountForm: {
        id: "",
        username: "",
        role: ""
      },
      rules: {}, //验证规则

      //列表表格部分数据
      tableData: [
        {
          id: 1,
          role: "超级管理员",
          name: "王小虎1",
          date: "2016-05-02"
        },
        {
          id: 2,
          role: "普通员工",
          date: "2016-05-04",
          name: "王小虎2"
        },
        {
          id: 3,
          role: "普通员工",
          date: "2016-05-01",
          name: "王小虎3"
        },
        {
          id: 4,
          role: "普通员工",
          date: "2016-05-03",
          name: "王小虎4"
        }
      ],
      //搜索表单
      searchForm: {
        username: "",
        role: ""
      },
      //分页数据
      page: {
        currentPage: 1, //默认值
        pageSize: 5, //每页条数
        total: 10
      }
    };
  },
  methods: {
    //分页方法
    handleSizeChange(val) {
      //每页长度变化是触发
      this.page.pageSize = val;
      this.page.currentPage = 1;
      // 根据新条件渲染页面
      pageAcount(this.page).then(page => {
        // 更新行数据
        this.tableData = page.data;
        // 更新总计数据
        this.page.total = page.total;
      });
    },
    handleCurrentChange(val) {
      //当前页码变化时触发的函数
      //  debugger
      // console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      // 根据新条件查询页面
      pageAcount(this.page).then(page => {
        // debugger
        // console.log(page);
        // 更新行数据
        this.tableData = page.data;
        // 更新总计数据
        this.page.total = page.total;
      });
    },
    //点击编辑按钮时触发的方法
    handleEdit(i, row) {
      // 修改对话框的显示状态为true，即显示对话框
      this.dialogFormVisible = true;
      // console.log(row);
      // this.editAcountForm = row; // 引用传递，会有问题！！
      // 点击编辑按钮时，把当前行的数据，更新到form对于的model对象上
      this.editAcountForm = Object.assign({}, row); // 拷贝传递即可(后与前合并，然后生成一个新的)
    },
    //点击编辑确定时触发
    editForm() {
      const vm = this;
      //发送ajax请求
      editAcount(this.editAcountForm).then(data => {
        if (data.success) {
          vm.$message({
            type: "success",
            message: data.message,
            showClose: true,
            duration: 500,
            onClose: () => {
              //关闭对话框
              //重新渲染页面
              this.dialogFormVisible = false;
              pageAcount(this.page).then(page => {
                // 更新行数据
                vm.tableData = page.data;
                // 更新总计数据
                vm.page.total = page.total;
              });
            }
          });
        }
      });
    },
    //点击删除按钮时触发的事件
    handleDelete(i, row) {
      // 修改对话框的显示状态为true，即显示对话框
      this.dialogVisible = true;
      const vm = this;
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //如果确定删除发送ajax请求
          delAcount(row.id).then(data => {
            if (data.success) {
              vm.$message({
                type: "success",
                message: data.message,
                showClose: true,
                duration: 500,
                onClose: () => {
                  pageAcount(this.page).then(page => {
                    // 更新行数据到数据库然后到列表
                    vm.tableData = page.data;
                    // 更新总计数据
                    vm.page.total = page.total;
                  });
                }
              });
            } else {
              // 如果不合法
              this.$message.error(data.message);
            }
          });
        })
        .catch(() => {
          //如果点击取消，则不发ajax直接返回到页面列表
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //查询方法
    doSearch() {
      //发送ajax请求
      searchAcount(this.searchForm).then(data => {
        this.tableData = data;
        this.page.total=data.length;
      });
    },
    //重置方法
    doReset() {
      // 重置表单
      this.$refs.searchForm.resetFields();
    }
  },
  //开始进入列表页面，在数据创建成功了。就开始发ajax请求，只要不操作dom就不用延迟函数nextTick()
  //在生命周期的created阶段发送ajax请求数据
  created() {
    //避免函数里面拿不到vue实例对象this,就将该实例对象赋值给一个变量
    const vm = this;
    pageAcount(this.page).then(page => {
      //  console.log(page);
      // 更新行数据
      vm.tableData = page.data;
      // 更新总计数据
      vm.page.total = page.total;
    });
  },
  //过滤器(可对时间和数据格式的转换)
  filters: {
    formateDate(v) {
      return moment(v).format("YYYY-MM-DD");
    }
  }
};
</script>

<style lang="less" scoped>
.account-list {
  .footer {
    margin-top: 10px;
  }

  .el-dialog {
    .el-form {
      width: 500px;
      .el-input__inner {
        width: 400px;
      }
    }
  }
}
</style>