//准备
import $http from "@/utils/request.js";
import qs from "qs"
//配置
// 账户列表
/* export function listAccounts(data) {
    return $http.get('/account/list', {
        params: data
    }).then((data) => {
        return data.data
    })
} */
 export const listAccounts = (data)=>$http.get('/account/list',{
     params:data
 }).then((data)=>{
     return data.data
 }) 
 //账号修改
 export const editAcount = (data)=>$http.post('/account/edit',qs.stringify(data)).then((data)=>{
    return data.data
}) 
//账户号添加
export const addAcount = (data)=>$http.post('/account/add',qs.stringify(data)).then((data)=>{
    return data.data
}) 
//账户删除
export const delAcount = (id)=>$http.get('/account/del',{
    params:{
        id
    }
}).then((data)=>{
    return data.data
}) 
//账户查询接口
export const searchAcount = (data)=>$http.post('/account/search',qs.stringify(data)).then((data)=>{
    return data.data
})
//账户列表分页接口
export const pageAcount = (data)=>$http.post('/account/page',qs.stringify(data)).then((data)=>{
    return data.data
})