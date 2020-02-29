<template>
    <div class="header-top">
         <el-header>
        <!-- 面包屑部分 -->
          <div class="left-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-for="item in breadcrumbList" :key="item">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
         <div class="right-box">
           <span class="welcom">欢迎你，<span>{{username}}</span></span>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
                <!-- <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-icon-test"></use>
                </svg> -->
                <!-- 
                  fit    确定图片如何适应容器框，同原生 object-fit(fill / contain / cover / none / scale-down)
                 -->

                 <!-- 第一种方式 ：图片大，自动拷贝到public中(/)-->
                <!-- <el-avatar fit="scale-down" :size="50" src="img/avatar.jpg"></el-avatar> -->
                <!-- 第二种方式:图片小，移动base64编码的字符串（减少请求数量）-->              
                <el-avatar fit="scale-down" :size="50" :src="avatar"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus"  command="personal">个人中心</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus" command="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
         </div>
      </el-header>
    </div>
</template>

<script>

/* 
    在Vue脚手架环境中，一切皆模块，统一打包到app.js
    js、Vue、CSS、less、jpg、png
    模块的使用方式：
    1.引入，放入变量
    2.把变量放入的data中
    3.在template中，直接使用

    Vue脚手架底层打包工具对图片模块处理
    1.图片小，移动base64编码的字符串（减少请求数量）
    //第一步：在script中引入图片模块： import logo from '../assets/images/logo.jpg'
    // 第二步：data数据中定义图模块变量：logo
    // 第三步：图片标签中引入：<el-avatar fit="scale-down" :size="50" :src="logo"></el-avatar>
    2.图片大，自动拷贝到public中(/)
    直接在图片标签中引入图片：<el-avatar fit="scale-down" :size="50" src="img/avatar.jpg"></el-avatar>
 */
import {doLogout,loadPersonalInfo,uploadAvatarDir} from "@/api/"
import avatar from '../assets/images/logo1.jpg'
    export default {
        data() {
            return {
             avatar,
             breadcrumbList:[],//面包屑内容集合(字符串)
             username:""
            }
        },
        methods:{
           handleCommand(commond){
             const vm=this;
             if(commond==="logout"){
               //注销操作
               //获取token
               const token=localStorage.getItem('token');
               doLogout(token).then(data=>{
                 if(data.success){
                   //清除本地存储的token
                   localStorage.setItem('token',"")
                   //页面跳转
                    vm.$router.replace('/login')
                 }
               });
               //个人中心
             }else if(commond==="personal"){
               vm.$router.push('/home/personal')
             }
           }
        },
        watch:{
          //对路由切换进行侦听
          $route(newValue){
            //1.准备
            var arr=[];
            //2.执行,新页面的标题
            const title=newValue.meta.title;
            //把新标题放入集合
            arr.push(title)
            //3.结果
            this.breadcrumbList=arr;
          }
        },
        created(){
          this.$bus.$on('avatarChange',(imageUrl)=>{
            //完成地址回显
            this.avatar=imageUrl;
          }),
          //调用用户信息接口，获取用户的名字
          loadPersonalInfo().then((data)=>{
            // debugger
            this.username=data.accountInfo.username
            this.avatar=uploadAvatarDir+data.accountInfo.avatar
          })
        }
    }
</script>

<style lang="less" scoped>
.header-top{
    .el-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgb(43, 97, 167);
        height: 60px;
         .left-box{
            /deep/.el-breadcrumb__inner{
              color: #fff;
            }
          }
          .right-box{
            display: flex;
            align-items: center;
            .welcom{
              color: #fff;
            }
            .el-icon-s-custom{
              color: #fff;
              font-size: 30px;
            }
          }
        }
}
</style>