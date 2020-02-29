import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 定义路线配置
const routes = [// 将来只需修改路线集
    {
      path:'/',
      redirect:'/login'// 重定向的地址
    },
    {
      path:'/login',
      name:'login',
      component:()=>import('../views/Login.vue')
    },
    {
      path:'/home',
      name:'home',
      component:()=>import('../views/Home.vue'),
      meta:{//自定义属性放在此处
        // 需要验证的标识
        requiresAuth: true 
      },
      //在home下面加载二级路由
      //角色管理
      children:[
        //默认首页
          {
            path:'index',
            name:'index',
            component:()=>import('../views/Index.vue'),
            meta:{
              // 需要验证的标识
              requiresAuth: true ,
            },
          },
          //账号管理部分
          //添加账号
          {
            path:'accountadd',
            name:'accountadd',
            component:()=>import('../views/account/AccountAdd.vue'),
            meta:{
              // 需要验证的标识
              requiresAuth: true ,
              title:"添加账号"
            },
          },
          //账号列表
          {
            path:'accountlist',
            name:'accountlist',
            component:()=>import('../views/account/AccountList.vue'),
            meta:{
              // 需要验证的标识
              requiresAuth: true ,
              title:"账号列表"
            },
          },
          // 密码修改
          {
            path:'passwordchange',
            name:'passwordchange',
            component:()=>import('../views/account/PasswordChange.vue'),
            meta:{
              // 需要验证的标识
              requiresAuth: true,
              title:"密码修改"
            },
          },
          //商品管理
          //添加商品
          {
            path:'productadd',
            name:'productadd',
            component:()=>import('../views/product/ProductAdd.vue'),
            meta:{
              // 需要验证的标识
              requiresAuth: true ,
              title:"添加商品"
            },
          },
          //商品列表
          {
            path:'productlist',
            name:'productlist',
            component:()=>import('../views/product/ProductList.vue'),
            meta:{
              // 需要验证的标识
              requiresAuth: true ,
              title:"商品列表"
            },
          },
          //商品分类
          //商品种类添加
          {
            path:'typeadd',
            name:'typeadd',
            component:()=>import('../views/productType/ProductTypeAdd.vue'),
            meta:{
              // 需要验证的标识
              requiresAuth: true ,
              title:"商品种类添加"
            },
          },
          {
            path:'typelist',
            name:'typelist',
            component:()=>import('../views/productType/ProductTypeList.vue'),
            meta:{
              // 需要验证的标识
              requiresAuth: true ,
              title:"商品种类列表"
            },
          },
          //销售统计
          //商品统计
          {
            path:'productcount',
            name:'productcount',
            component:()=>import('../views/count/ProductCount.vue'),
            meta:{
              // 需要验证的标识
              requiresAuth: true ,
              title:"商品统计"
            },
          },
          {
            path:'sellcount',
            name:'sellcount',
            component:()=>import('../views/count/SellCount.vue'),
            meta:{
              // 需要验证的标识
              requiresAuth: true ,
              title:"销售统计"
            },
          },
          //其他
          // 订单管理
          {
            path:'order',
            name:'order',
            component:()=>import('../views/other/Order.vue'),
            meta:{
              // 需要验证的标识
              requiresAuth: true ,
              title:"订单管理"
            },
          },
          //店铺管理
          {
            path:'store',
            name:'store',
            component:()=>import('../views/other/Store.vue'),
            meta:{
              // 需要验证的标识
              requiresAuth: true ,
              title:"店铺管理"
            },
          },
          //个人中心
          {
            path:'personal',
            name:'personal',
            component:()=>import('../views/account/Personal.vue'),
            meta:{
              //需要验证的标识
              requiresAuth:true,
              title:"个人中心"
            }
          }
      ]
    },
    //出现错误时，配置路由
    {
      path:'*',
      redirect:'/'
    }
]
// 根据路线配置，创建路由实例，并导出
const router = new VueRouter({
  routes
})
// 配置全局路由"前置"守卫
  // 参数1：to，下一个路由对象
  // 参数2：from，上一个路由对象
  // 参数3：next，回调函数
  //  放行   next()
 //  拦截   next(‘/login’)
 router.beforeEach((to,from,next)=>{
    // 根据元数据上的requiresAuth标识，对需要验证的内容进行拦截
    if(to.meta.requiresAuth){
          // 如果登录成功，有token，那么可以放行
    const token = localStorage.getItem('token');
    if(token){// 有token，则放行
      next();
    }else{
      // 如果未登录，没有有token，那么必须拦截
      next('/login');
    }
    }else{
      next()
    }
 })
export default router
