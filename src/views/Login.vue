<template>
  <!-- 
      model  : 表单数据对象
      rules  : 表单验证规则
      status-icon : 是否在输入框中显示校验结果反馈图标
      ref :  全局id
      label-width ： 表单标签域的宽度
      class ： 样式类
      label ：标签文本
      prop  ：表单域 model 字段，和验证器的名称匹配
     插槽方式:slot=“” ： 插槽名称（v2.6+ ： v-slot：插槽名称）
  -->
  <div id="login">
    <div class="out-login">
      <h3 class="login-title">学生超市管理系统</h3>
      <div class="inner-login">
        <p class="user-login">用户登录</p>
        <el-form
          :model="dynamicValidateForm"
          ref="dynamicValidateForm"
          label-width="100px"
          class="demo-dynamic"
          :rules="rules"
        >
          <el-form-item prop="username" label="用户名">
            <el-input v-model="dynamicValidateForm.username">
              <i slot="prefix" class="el-icon-user-solid"></i>
            </el-input>
          </el-form-item>

          <el-form-item prop="password" label="密码">
            <el-input v-model="dynamicValidateForm.password">
              <i slot="prefix" class="el-icon-lock"></i>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm">登录</el-button>
            <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { doLogin } from "@/api/";
export default {
  data() {
    return {
      dynamicValidateForm: {
        username: "",
        password: ""
      },
      rules: {
        // 表达的prop属性名   :   规则数组
        username: [
          // required : 是否开启必填验证，
          // message  ：验证失败的提示
          // trigger  ：验证时机
          { required: true, message: "请输入用户名", trigger: "blur" },
          //min: 内容的最小长度 , max：内容的最大长度
          { min: 2, max: 12, message: "长度在 2 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          //min: 内容的最小长度 , max：内容的最大长度
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      const vm = this;
      // 拿到表单
      const from = this.$refs.dynamicValidateForm;
      /*  sessionStorage.setItem('username',this.dynamicValidateForm.username); */
      // 使用表单做验证
      from.validate(valid => {
        if (valid) {
          const params = this.dynamicValidateForm;
          //发送请求验证
          doLogin(params).then(data => {
            if (data.success) {
              // 成功
              this.$message({
                message: data.message, // 提示文字信息
                type: "success", // 提示框的主题名称
                duration: 1500,
                onClose: () => {
                  //登录成功，记录登录的token
                  localStorage.setItem('token',data.token);
                  // 直接跳转到首页
                  vm.$router.replace("/home/index");
                }
              });
            }else{
              this.$message.error(data.message);
              
            }
          });
        } else {
          this.$message({
            showClose: true, // 是否可以手动关闭
            message: "登录失败！",
            type: "error"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields(); //对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
    }
  }
};
</script>
<style lang="less" scoped>
#login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/images/timg.jpg") no-repeat center top;
  background-size: 100% 100%;
  .out-login {
    height: 100%;
    width: 600px;
    box-sizing: border-box;
    padding-top: 40px;
    .login-title {
      height: 60px;
      text-align: center;
      font-size: 30px;
      color: rgb(255, 255, 255);
      margin-bottom: 20px;
    }
    .inner-login {
      width: 100%;
      background-color: rgb(62, 91, 145);
      padding-bottom: 50px;
      .user-login {
        height: 40px;
        background-color: #409eff;
        line-height: 40px;
        font-size: 20px;
        color: aliceblue;
        text-align: center;
        margin-bottom: 40px;
      }
      /deep/.el-form-item__label {
        color: aliceblue;
      }
      /deep/.el-input__inner {
        width: 80%;
      }
      /deep/.el-input__prefix {
        color: aqua;
        font-size: 20px;
      }
      /deep/.el-form-item__error {
        color: #f00;
      }
    }
  }
}
</style>
