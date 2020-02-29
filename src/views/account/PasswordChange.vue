<template>
  <div class="pass-change">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>密码修改</h3>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="ruleForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { changePassword } from "@/api/";
export default {
  data() {
    const vm = this;
    const checkPass = (rule, value, callback) => {
      //有错
      if (value === "") {
        callback(new Error("新密码不能为空"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          //手动调用确认密码框对应的方法
          this.$refs.ruleForm.validateField("checkPass");
        }
        //否侧，直接放行，继续下填
        callback();
      }
    };
    const checkPass2 = (rule, value, callback) => {
      //有错
      if (value === "") {
        callback(new Error("确认密码不能为空"));
      } else {
        //两次密码相等，就直接放行
        if (value === vm.ruleForm.newPassword) {
          callback();
        } else {
          callback(new Error("两次密码不一致喔！亲"));
        }
      }
    };
    return {
      ruleForm: {
        oldPassword: "",
        newPassword: "",
        checkPass: ""
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "密码长度在6到 20 个字符",
            trigger: "blur"
          }
        ],
        newPassword: [
          //自定义校验规则
          {
            validator: checkPass,
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            validator: checkPass2,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          //如果合法
          //调用密码修改接口发送ajax请求
          changePassword(
            this.ruleForm.oldPassword,
            this.ruleForm.newPassword
          ).then(data => {
            // debugger
            if (data.success) {
              this.$message({
                message: data.message,
                type: "success",
                duration: 1000,
                showClose: true,
                onClose: () => {
                  this.$router.push("/home/accountlist");
                }
              });
            } else {
              this.$message.console.error(data.message);
            }
          });
        } else {
          //如果不合法
          this.$message.console.error("修改密码失败！");
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
</style>