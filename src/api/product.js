//准备
import $http from "@/utils/request.js";
import qs from "qs"
//商品图片上传接口
//$http.defaults.baseURL从全局axios配置中，拿到baseURL配置
export const uploadApi=$http.defaults.baseURL+'/product/upload'//地址拼装
//服务器文件加载目录
export const uploadDir=$http.defaults.baseURL+'/upload/product/'
//商品列表
export const listProduct= ()=>$http.get('/product/list').then((data)=>{
    return data.data
}) 
//商品添加
export const addProduct= (data)=>$http.post('/product/add',qs.stringify(data)).then((data)=>{
    return data.data
}) 
//商品查询/product/search
export const searchProduct= (data)=>$http.post('/product/search',qs.stringify(data)).then((data)=>{
    return data.data
})
//商品分页查询
export const pageProduct= (data)=>$http.post('/product/page',qs.stringify(data)).then((data)=>{
    return data.data
})
//商品删除
export const delProduct= (id)=>$http.get('/product/del',{
    params:{
        id
    }
}).then((data)=>{
    return data.data
}) 
//商品修改
export const editProduct= (data)=>$http.post('/product/edit',qs.stringify(data)).then((data)=>{
    return data.data
})


