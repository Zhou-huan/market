<template>
    <div class="type-add">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>分类添加</span>
            </div>
          <el-form
            :model="TypeForm"
            status-icon
            :rules="rules"
            ref="TypeForm"
            label-width="100px"
            class="demo-ruleForm"
             >
               <el-form-item label="分类名称" prop="name">
                     <el-input v-model="TypeForm.name" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="类型描述" prop="desc">
                     <el-input v-model="TypeForm.desc" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="分类序号" prop="order">
                     <el-input-number v-model="TypeForm.order" controls-position="right" :min="1" :max="10"></el-input-number>
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
import {addType} from "@/api/producttype.js"
    export default {
        data() {
            return {
                TypeForm:{
                    name: "",
                     order: 1,
                     desc:""
                },
                 rules:{
                         name:[
                              { required: true, message: "请输入分类名称", trigger: "blur" }
                         ],
                          desc:[
                              { required: true, message: "请输入类型描述", trigger: "blur" }
                         ]

                     }
            }
        },
        methods:{
            submitForm() {
            this.$refs.TypeForm.validate(valid => {
                if (valid) {
                // 如果合法，发送ajax请求
                    addType(this.TypeForm).then((data)=>{
                        // debugger
                        // data
                        if(data.success){
                             this.$message({
                                type: "success",
                                message: data.message,
                                duration: 1000,
                                showClose: true,
                                onClose: () => {
                                this.$router.push("/home/typelist");
                                }
                            });
                        }else{
                             // 如果不合法
                            this.$message.error(data.message);
                        }
                    })
                } else {
                // 如果不合法
                this.$message.error("很遗憾，商品分类添加失败！");
                }
            });
            },
            resetForm() {
                this.$refs.TypeForm.resetFields();
            }
        }
    }
</script>

<style lang="less" scoped>

</style>