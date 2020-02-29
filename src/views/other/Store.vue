<template>
  <div class="product-add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>商铺管理</h3>
      </div>

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称" class="product-name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" class="product-name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" class="product-name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺简介" class="product-name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺标语" class="product-name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商铺分类">
          <el-select v-model="form.kinds" placeholder="请选择商品分类">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商铺特色">
          <el-checkbox-group v-model="form.specials">
            <el-checkbox label="品牌保证" name="type"></el-checkbox>
            <el-checkbox label="蜂鸟专送" name="type"></el-checkbox>
            <el-checkbox label="新店开铺" name="type"></el-checkbox>
            <el-checkbox label="外卖保" name="type"></el-checkbox>
            <br />
            <el-checkbox label="准时到" name="type"></el-checkbox>
            <el-checkbox label="开发票" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- 
                on-preview	点击文件列表中已上传的文件时的钩子	function(file)
                action	必选参数，上传的地址	string
                list-type	文件列表的类型	string
                on-remove	文件列表移除文件时的钩子	function(file, fileList)
                
        -->
        <el-form-item label="配送费">
          <el-input-number v-model="num1" :min="0" :max="60" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="起送费">
          <el-input-number v-model="num2" :min="1" :max="1000" label="描述文字"></el-input-number>
        </el-form-item>
         <el-form-item label="营业时间">
            <el-input placeholder="请选择日期" v-model="form.date" class="product-name">
                <i slot="suffix" class="el-input__icon el-icon-date"></i>
            </el-input>  
        </el-form-item>
        
         <el-form-item label="店铺图片">
            <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            >
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="form.dialogVisible">
            <img width="100%" :src="form.dialogImageUrl" alt />
            </el-dialog>
        </el-form-item>

        <el-form-item label="店铺描述">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num1: 6,
      num2: 20,
      form: {
        name: "",
        kinds: "",
        delivery: false,
        specials: [],
        desc: "",
        date:"",
        dialogImageUrl: '',
        dialogVisible: false
      }
    };
  },
    methods:{
       handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
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
}
</style>