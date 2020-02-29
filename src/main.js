/* 清单文件 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入时间库moment
import moment from 'moment'
moment.locale('zh-cn');//设置语言
Vue.prototype.$moment=moment;//赋值使用(filter中不能使用$moment)
// debugger
//引入重置样式
//自定义全局样式
import 'normalize.css'
import '../src/assets/style/common.less'
//导入字体图标
import './assets/fonts/iconfont'
//引入echarts图表
import echarts from "echarts"
Vue.prototype.$echarts=echarts//将echarts存到Vue原型中
//axios和echarts不能通过Vue.use()进行全局引用
Vue.use(ElementUI)
Vue.config.productionTip = false;   //是否开启生产模式(少一些提示)
//全局bus(用于跨级传递数据，比如头像等...)
const bus=new Vue()
Vue.prototype.$bus=bus;
//入口文件main.js，在全局Vue实例上配置路由
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')//挂载视图(把vue内部生产的视图内容，渲染到public中index.html中指定的id选择器中)
