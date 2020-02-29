<template>
  <div class="product-add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>添加商品</h3>
      </div>

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称" class="product-name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- 分类 -->
        <el-form-item label="商品分类">
          <el-select v-model="form.category" placeholder="请选择商品分类">
            <!-- 循环分类，动态渲染分类选项 -->
            <el-option v-for="type in typeList" :key="type.id" :label="type.name" :value="type.name"></el-option>
           <!--  <el-option label="家居用品" value="家居用品"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="商品特色">
          <el-checkbox-group v-model="form.feature">
            <el-checkbox label="新品上市" name="feature" value="新品上市"></el-checkbox>
            <el-checkbox label="第二单半价" name="feature" value="第二单半价"></el-checkbox>
            <el-checkbox label="主打产品" name="feature" value="主打产品"></el-checkbox>
            <el-checkbox label="火爆产品" name="feature" value="火爆产品"></el-checkbox>
            <br />
            <el-checkbox label="祖传手艺" name="feature" value="祖传手艺"></el-checkbox>
            <el-checkbox label="源自四川" name="feature" value="源自四川"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

            <!-- 
                on-preview	点击文件列表中已上传的文件时的钩子	function(file)
               action : 选中时，自动上传的地址 string(actione地址必须为完整地址:http://域名：端口/接口地址)
                list-type	文件列表的类型	string
                on-remove	文件列表移除文件时的钩子	function(file, fileList)
                show-file-list ： 是否显示已上传文件列表(多选模式)
                on-success     :  文件上传成功时的钩子函数（即事件回调函数）
             -->
         <el-form-item label="商品图片">
            <el-upload
               class="avatar-uploader"
              :action="uploadApi"
              :show-file-list="false"
              :on-success="handleUploadSuccess"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>


        <el-form-item label="是否促销">
          <el-radio-group v-model="form.isPromotion">
            <el-radio label="促销"></el-radio>
            <el-radio label="不促销"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="包装费">
          <el-input-number v-model="form.packingexpense" :min="0" :max="60" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="价格">
          <el-input-number v-model="form.price" :min="1" :max="1000" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
//引入接口
//uploadApi:文件上传发送请求的api接口地址
//uploadDir:回显图片时的文件路径地址
import {addProduct,uploadApi,uploadDir} from "@/api/product.js"
import {listType} from "@/api/producttype";
export default {
  data() {
    return {
      num1: 0,
      num2: 20,
      uploadApi,
      dialogVisible: false,
      //商品表单数据
      form: {
        name: "", // 商品名称
        category: "", // 商品分类
        feature: [], // 商品特色
        imgUrl: "", // 商品图片地址
        isPromotion: "", // 是否促销
        packingexpense: "", // 包装费
        price: "", // 价格
        desc: "" // 商品描述
      },
       // 分类数据
      typeList: []
    };
  },
  methods:{
      //回显
      handleUploadSuccess(file) {
        this.form.imgUrl=file.fileName
        // debugger
      },
      //点击保存按钮发送ajax请求
       submitForm(){
         //提交前对参数进行预处理
         this.form.feature=JSON.stringify(this.form.feature);//array->arrString
         //发送ajax请求
         addProduct(this.form).then((data)=>{
            if(data.success){
           //成功提示
            this.$message({
            type: "success",
            message: data.message,
            duration: 500,
            showClose: true,
            onClose: () => {
              this.$router.push("/home/productlist");
            }
            });
            }else{
                // 如果不合法
                this.$message.error(data.message);
            }
         })
       }
  },
  computed:{
    //提供一个计算属性，实现普通回显的地址封装
    imageUrl(){
      //回显地址=服务器文件地址+文件名
      if(this.form.imgUrl){
        return uploadDir+this.form.imgUrl
      }else{
        return ""
      }
    }
  },
  //在生命周期的数据准备完成阶段就发送分类接口列表的ajax请求，获取分类栏的数据
  created(){
    listType().then(data=>{
      // debugger
      //获取响应，把响应回显到页面
      this.typeList=data;
    })
  }
};
</script>

<style lang="less" scoped>
.product-add {
  .product-name {
    width: 400px;
  }
  /deep/.el-textarea__inner {
    width: 400px;
  }
.avatar-uploader{
  width: 200px;
  height: 200px;
  border: 1px dashed rgb(42, 111, 201);
  /deep/.el-upload{
   display: flex;
    font-size: 30px;
    color: #4f99d6;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  .avatar{
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
  }
}
}
</style>