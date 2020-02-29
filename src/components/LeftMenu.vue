<template>
  <div class="left-menu">
    <!-- 
            default-active    : 当前激活菜单的 index
            background-color  : 菜单的背景色（仅支持 hex 格式）16进制
            text-color        : 菜单的文字颜色
            active-text-color : 当前激活菜单的文字颜色（仅支持 hex 格式）
            router:是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转(boolear)
            unique-opened:是否只保持一个子菜单的展开(boolear类型)
    -->
    <!-- 侧栏 -->
    <el-aside width="200px">
      <span>
        <!-- <img src="../assets/images/logo.jpg" alt class="logo" /> -->
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-sekuaichaoshi" />
          </svg>
        <!-- <el-avatar fit="scale-down" :size="50" src="img/avatar.jpg"></el-avatar> -->
      </span>
      <span class="header-title">学生超市管理系统</span>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo aside-left"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        router
      >
        <!--
            el-submenu  : 可以展开子集的菜单
            el-menu-item：没有子集的菜单
        -->
        <!-- index: 唯一标志 -->
        <template v-for="menu in filterList">
            <!-- 没有儿子 -->
          <el-menu-item :index="menu.index" :key="menu.id" v-if="!menu.children">
            <i :class="menu.cls"></i>
            <span slot="title">{{menu.title}}</span>
          </el-menu-item>
            <!-- 有儿子 -->
          <el-submenu v-else :index="menu.index" :key="menu.id">
            <template slot="title">
              <i :class="menu.cls"></i>
              {{menu.title}}
            </template>
            <el-menu-item v-for="item in menu.children" :index="item.index" :key="item.index">{{item.name}}</el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import {getCurrentRole} from "@/api/"
    export default {
        data() {
            return {
                menulist:[
                    {
                        id:1,
                        index:'/home/index',
                        cls: "el-icon-s-cooperation",
                        title:'首页',
                        roles:[1,2],

                    },
                     {
                        id: 2,
                        index: "2",
                        cls: "el-icon-menu",
                        title: "商品分类管理",
                        roles:[1,2],
                        children: [
                            { index: "/home/typelist", name: "商品分类列表" },
                            { index: "/home/typeadd", name: "添加商品分类" }
                        ]
                        },
                        {
                            id: 3,
                            index: "3",
                            cls: "el-icon-s-goods",
                            title: "商品管理",
                            roles:[1,2],
                            children: [
                                { index: "/home/productlist", name: "商品列表" },
                                { index: "/home/productadd", name: "添加商品" }
                            ]
                        },
                        {
                            id: 4,
                            index: "4",
                            cls: "el-icon-s-custom",
                            title: "账号管理",
                            roles:[1],
                            children: [
                                { index: "/home/accountlist", name: "账号列表" },
                                { index: "/home/accountadd", name: "增加账号" },
                                { index: "/home/passwordchange", name: "修改密码" }
                            ]
                        },
                                        {
                        id: 5,
                        index: "5",
                        cls: "el-icon-s-data",
                        title: "统计管理",
                        roles:[1],
                        children: [
                            { index: "/home/productcount", name: "销售统计" },
                            { index: "/home/sellcount", name: "进货统计" }
                        ]
                        },
                        {
                        id: 6,
                        index: "6",
                        cls: "el-icon-s-tools",
                        title: "其他管理",
                        roles:[1],
                        children: [
                            { index: "/home/store", name: "商铺管理" },
                            { index: "/home/order", name: "订单管理" }
                        ]
                        }
                    
                    ],
               currentUserRole:2
            }
        },
        created(){
          //在数据准备完成时，发送ajax请求
          getCurrentRole().then(data=>{
            this.currentUserRole=data.role
          })
        },
        computed:{//要操作data数据或全局就用（如果是局部就用filter）
          filterList(){//过滤后的菜单集合
            //准备
            let array=[],vm=this;
            //处理
            array=vm.menulist.filter((menu)=>{
              return menu.roles.includes(vm.currentUserRole)
            })
            //结果
            return array
          }
        }
    }
</script>

<style lang="less" scoped>
.left-menu {
  .el-aside {
    background-color: rgb(84, 92, 100);
    color: #333;
    text-align: center;
    padding-top: 20px;
    height: 100%;
    .logo {
      width: 40px;
      height: 40px;
      vertical-align: middle;
      border-radius: 50%;
    }
    .header-title {
      color: #fff;
      font-size: 18px;
    }
    .el-menu {
      text-align: left;
      line-height: 200px;
      border-right: none;
    }
  }
}
</style>