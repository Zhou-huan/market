<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>账号添加</h3>
      </div>
      <!-- 内容 -->
      <el-form
        :model="addAcountForm"
        status-icon
        :rules="rules"
        ref="addAcountForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="addAcountForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addAcountForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="addAcountForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" prop="role">
          <el-select v-model.number="addAcountForm.role" placeholder="请选择">
            <!-- 
              label ： 下拉框显示的值
              value ： 下拉框传递的值
              value="1"值是字符串
              :value="1" 值就是数字
            -->
            <el-option label="超级管理员" :value="1"></el-option>
            <el-option label="普通员工" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入api模块
import {addAcount} from '@/api/account.js'
export default {
  data() {
    const vm = this;
    //表达式定义几个验证规则函数
    const checkPassword = (rule, value, callback) => {
      // 有错
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        // 如果确认密码也有值
        if (this.addAcountForm.checkPass !== "") {
          // 手动调用确认密码框对于的方法
          this.$refs.addAcountForm.validateField("checkPass");
        }
        // 没有错,直接放行
        callback();
      }
    };
    const checkPass2 = (rule, value, callback) => {
      // 有错
      if (value === "") {
        callback(new Error("确认密码不能为空"));
      } else {
        // 如果确认密码有值，直接和密码框的内容进行比较
        if (value === vm.addAcountForm.password) {
          // 手动调用确认密码框对于的方法
          // 没有错,直接放行
          callback();
        } else {
          callback(new Error("两次密码不一致！！"));
        }
      }
    };

    return {
      //添加表单数据
      addAcountForm: {
        username: "",
        password: "",
        checkPass: "",
        role: ""
      },
      //定义规则rules对象
      rules: {
        username: [
          { required: true, message: "请输入账号名称", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "账号名称长度在 3 到 20 个字符",
            trigger: "blur"
          }
        ],
        password: [
          {
            // 自定义校验规则
            validator: checkPassword,
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            // 自定义校验规则
            validator: checkPass2,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //按钮提交事件
    // validate	对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，
    //并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
    submitForm() {
      this.$refs.addAcountForm.validate(valid => {
        if (valid) {
          // 如果合法，发送ajax请求
          addAcount(this.addAcountForm).then(data=>{
            if(data.success){
            this.$message({
            type: "success",
            message: data.message,
            duration: 500,
            showClose: true,
            onClose: () => {
              this.$router.push("/home/accountlist");
            }
            });
            }else{
                // 如果不合法
                this.$message.error(data.message);
            }
          })
        } else {
          // 如果不合法
          this.$message.error("很遗憾，账号添加失败！");
        }
      });
    },
    resetForm() {
      //表单重置
      this.$refs.addAcountForm.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
</style>