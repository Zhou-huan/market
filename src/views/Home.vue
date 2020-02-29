<template>
    <div class="home">
        <el-container>
          <!-- 侧栏 -->
          <LeftMenu/>
      <el-container>
         <!-- 顶部导航 -->
          <HeaderTop/>
        <!-- 右边主体 -->
        <el-main>
          <!-- 二级路由(<router-view>会根据当前路由动态渲染不同的页面组件) -->
          <router-view/>
        </el-main>
        <!-- 尾部 --> 
          <el-footer>
            <p class="footer-copy">Copyright © 1988 Adobe Systems Incorporated. All rights reserved.</p>
          </el-footer>
      </el-container>
    </el-container>

    </div>
</template>
<script>
import LeftMenu from '@/components/LeftMenu.vue'
import HeaderTop from '@/components/HeaderTop.vue'
    export default {
        data() {
          return {
          
          }
        },
        components:{
          LeftMenu,
          HeaderTop
        },
        
    }
    //  debugger;
</script>

<style lang="less" scoped>
    .home{
          a{
            color: rgb(255, 255, 255);
            text-decoration: none;
          }
           .el-footer{
               background-color: rgb(43, 97, 167);
              height: 60px;
             .footer-copy{
               text-align: center;
               color:#ccc;
             }
          }
          .el-main {
            background-color: rgb(220, 224, 228);
            color: #333;
             height:600px;
          }
          
          body > .el-container {
            margin-bottom: 40px;
          }
          .el-container:nth-child(7) .el-aside {
            line-height: 320px;
          }
}
</style>