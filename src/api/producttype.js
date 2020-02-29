//准备
import $http from "@/utils/request.js";
import qs from "qs"
//配置
//商品分类列表
export const listType=()=>$http.get('/productType/list').then((data)=>{
    return data.data;
})
//商品分类添加
export const addType=(data)=>$http.post('/productType/add',qs.stringify(data)).then((data)=>{
    return data.data;
})
//商品分类删除
export const delType=(id)=>$http.get('/productType/del',{
    params:{
        id
    }
}
).then((data)=>{
    return data.data;
})
//商品类型修改
export const editType=(data)=>$http.post('/productType/edit',qs.stringify(data)).then((data)=>{
    return data.data;
})
//商品类型查询
export const searchType=(data)=>$http.post('/productType/search',qs.stringify(data)).then((data)=>{
    return data.data;
})
//商品类型分页
export const pageType=(data)=>$http.post('/productType/page',qs.stringify(data)).then((data)=>{
    return data.data;
})

