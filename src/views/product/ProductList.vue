<template>
  <div class="product-list">
    <!-- 卡片组件 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h3>商品列表
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-chaoshi" />
          </svg>
        </h3>
      </div>
      <!-- 搜索框 -->
      <!-- 
        prop:表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
       -->
      <el-form :inline="true" :model="searchForm" ref="searchForm">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="searchForm.name" placeholder="商品分类名称"></el-input>
        </el-form-item>
        <el-form-item label="价格起始值" prop="priceStart">
          <el-input v-model="searchForm.priceStart" placeholder="价格起始值"></el-input>
        </el-form-item>
        <el-form-item label="价格结束值" prop="priceEnd">
          <el-input v-model="searchForm.priceEnd" placeholder="价格结束值"></el-input>
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
      <el-table :data="tableData" style="width: 100%" stripe>
        <!-- 
            prop ： 对应列内容的字段名(遍历对象的属性名称)
            label: 显示的标题
            width: 对应列的宽度
        -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="商品特色">
                <span>{{ props.row.feature | renderFeature}}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="商品 包装费">
                <span>{{ props.row.packingexpense }}</span>
              </el-form-item>
              <el-form-item label="店铺单价">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="商品是否促销">
                <span>{{ props.row.isPromotion }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
              <el-form-item label="商品录入的时间">
                <span>{{ props.row.inputtime | formateDate}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品 ID" prop="id"></el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="描述" prop="desc"></el-table-column>
        <el-table-column label="是否促销" prop="isPromotion"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 商品分页 -->
      <!-- 
           current-page	当前页数
           page-sizes	    每页显示个数选择器的选项设置
           page-size       每页显示条目个数(值必须属于page-sizes)
           size-change    页码长度（pageSize）改变的监听
           current-change    当前页码（currentPage）改变的监听 
      -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>

      <!-- 编辑对话框 -->
      <!-- 
                visible ： 是否默认可见
      -->
      <el-dialog title="商品修改" :visible.sync="dialogFormVisible">
        <el-form
          :model="editForm"
          status-icon
          :rules="rules"
          ref="editForm"
          label-width="100px"
          class="demo-ruleFrom"
        >
          <el-form-item label="商品名称" class="product-name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
             <el-select v-model="editForm.category" placeholder="请选择商品分类">
            <!-- 循环分类，动态渲染分类选项 -->
            <el-option v-for="type in typeList" :key="type.id" :label="type.name" :value="type.name"></el-option>
           <!--  <el-option label="家居用品" value="家居用品"></el-option> -->
          </el-select>
          </el-form-item>
          <el-form-item label="商品特色">
            <el-checkbox-group v-model="editForm.feature">
              <el-checkbox label="新品上市" name="feature" ></el-checkbox>
              <el-checkbox label="第二单半价" name="feature"></el-checkbox>
              <el-checkbox label="主打产品" name="feature"></el-checkbox>
              <el-checkbox label="火爆产品" name="feature"></el-checkbox>
              <br />
              <el-checkbox label="祖传手艺" name="feature"></el-checkbox>
              <el-checkbox label="源自四川" name="feature"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio-group v-model="editForm.isPromotion">
              <el-radio label="促销"></el-radio>
              <el-radio label="不促销"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="包装费">
            <el-input-number v-model="editForm.packingexpense" :min="0" :max="60" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="价格">
            <el-input-number v-model="editForm.price" :min="1" :max="1000" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input type="textarea" v-model="editForm.desc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editForming">修改</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
/* 引入需要的模块 */
import {
  listProduct,
  searchProduct,
  pageProduct,
  delProduct,
  editProduct
} from "@/api/product.js";
import {listType} from "@/api/producttype";
import moment from "moment";
export default {
  data() {
    return {
      dialogFormVisible: false, // 编辑对话框默认不可见
      dialogVisible: false, //删除对话框默认不可见
      //编辑表单数据
      editForm: {
        name: "", // 商品名称
        category: "", // 商品分类
        feature:[], // 商品特色
        imgUrl: "", // 商品图片地址
        isPromotion: "不促销", // 是否促销
        packingexpense: "", // 包装费
        price: "", // 价格
        desc: "" // 商品描述
      },
      rules: {}, //编辑表单验证规则
      //表格数据
    tableData: [
        {
          id: 1,
          // imgUrl: "2",
          name: "3",
          category: "4",
          feature: [],
          isPromotion: "6",
          imageUrl:'',
          packingexpense: "7",
          price: "8",
          desc: "9",
          inputtime: "2019-11-11"
        }
      ],
      //搜索表单
      searchForm: {
        name: "",
        priceStart: "",
        priceEnd: ""
      },
      //分页数据
      page: {
        currentPage: 1, //当前页
        pageSize: 5, //每页长度
        total: 10
      },
       // 分类数据
      typeList: []
    };
  },
  methods: {
    //查询方法
    doSearch() {
      //发送ajax请求
      searchProduct(this.searchForm).then(data =>{
        this.tableData = data;
        // debugger;
        this.page.total=data.length;
      });
      
    },
    //重置方法
    doReset() {
      // 重置表单
      this.$refs.searchForm.resetFields();
    },
    //分页方法
    handleSizeChange(val) {
      //每页长度变化是触发
      this.page.pageSize = val;
      this.page.currentPage = 1;
      // 根据新条数渲染页面
      pageProduct(this.page).then(page => {
        //根据行数据
        this.tableData = page.data;
        //更新总计数据
        // debugger
        this.page.total = page.total;
      });
    },
    handleCurrentChange(val) {
      //当前页码变化时触发的函数
      this.page.currentPage = val;
      //根据新条件查询页面
      pageProduct(this.page).then(page => {
        //更新行数据
        this.tableData = page.data;
        //更新总计数据
        this.page.total = page.total;
      });
    },
    //点击删除按钮触发事件
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
          delProduct(row.id).then(data => {
            if (data.success) {
              vm.$message({
                type: "success",
                message: data.message,
                showClose: true,
                duration: 500,
                onClose: () => {
                  listProduct().then(data => {
                    // debugger
                    // console.log(data);
                    this.tableData = data;
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
    //点击修改时触发的事件
    handleEdit(i, row) {
      debugger
      // 修改对话框的显示状态为true，即显示对话框
      // console.log(row.feature);//"["第二单半价","源自四川"]"
      this.dialogFormVisible = true;
      this.editForm=Object.assign({},row);//当前商品信息回填，浅拷贝
      //特色处理
      if(this.editForm.feature){
        this.editForm.feature=JSON.parse(this.editForm.feature);
      }
      // console.log(this.editForm.feature);//feature: Array(2)
    },
    //点击编辑确定是触发的事件
    editForming() {
      const vm = this;
      this.editForm.feature=JSON.stringify(this.editForm.feature);
      // console.log(this.editForm);//"["第二单半价","源自四川"]"
      //发送ajax请求
      editProduct(this.editForm).then(data => {
        if (data.success) {
          vm.$message({
            type: "success",
            message: data.message,
            showClose: true,
            duration: 500,
            onClose: () => {
              //关闭对话框
              //重新渲染页面
              vm.dialogFormVisible = false;
              listProduct().then(data => {
                // debugger
                // console.log(data);
                vm.tableData = data;
              });
            }
          });
        }else{
          vm.$message.console.error(data.message);
        }
      });
    }
  },
  // 加载数据的生命周期
  created() {
    //生命周期部分开始发送ajax请求
   /*  listProduct().then(data => {
      // debugger
      // console.log(data);
      this.tableData = data;
    }), */
    pageProduct(this.page).then(data=>{
        this.tableData=data.data;
        this.page.total=data.total;
    })
    //在生命周期的数据准备完成阶段就发送分类接口列表的ajax请求，获取分类栏的数据
    listType().then(data=>{
      //获取响应，把响应回显到页面
      this.typeList=data;
    })
  },
  //定义过滤器
  filters: {
    //过滤名称：过滤方法(只修改显示的效果，不直接修改data的类型)
    //参数1：待处理的值
    renderFeature(value) {
      //如果值存在
      if (value) {
           // 把符合数组格式的字符串，先转为数组对象，再拆分拼接为字符结果
          return JSON.parse(value).join("、");
      }
    },
    //时间过滤
    formateDate(v) {
      return moment(v).format("YYYY-MM-DD");
    }
  }
};
</script>

<style lang="less" scoped>
.product-list {
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>