//准备
import $http from '@/utils/request.js';
import qs from "qs"
// console.dir($http);
//配置
//登录接口
export const doLogin=(data)=>$http.post('/login',qs.stringify(data)).then((data)=>data.data)
//注销接口
export const doLogout=(data)=>$http.post('/logout',qs.stringify(data)).then((data)=>data.data)
//菜单获取用户角色接口
export const getCurrentRole=()=>{
    //直接在接口中获取
    const tokenValue=localStorage.getItem('token')//目的：简化用户使用接口的难度
   return $http.post('/getCurrentUserRole',qs.stringify({
       //key(接口的请求参数有关) ：value(获取用户传入的token)
        token:tokenValue
    }))
    .then((data)=>data.data)
}
//获取用户信息
export const  loadPersonalInfo=()=>{
    //直接在接口中获取
    const tokenValue=localStorage.getItem('token');//目的：简化用户使用接口的难度
    return $http.post('/personalinfo',qs.stringify({
        token:tokenValue
    }))
    .then((data)=>data.data)
}
//头像上传API接口
export const uploadApi=$http.defaults.baseURL+'/uploadAvatar';
//头像访问的目的地址(回显的地址，没有文件名，文件访问直接使用地址，无参数)
export const uploadAvatarDir=$http.defaults.baseURL+'/upload/personal/';
//修改用户头像接口
export const  editAvatarImg=(avatar)=>{
    //直接在接口中获取
    const tokenValue=localStorage.getItem('token');//目的：简化用户使用接口的难度
    return $http.post('/editAvatarImg',qs.stringify({
        token:tokenValue,
        avatar:avatar
    }))
    .then((data)=>data.data)
}
//密码修改接口
export const changePassword=(oldPassword,newPassword)=>{
    //直接在接口中获取
    const tokenValue=localStorage.getItem('token')//目的：简化用户使用接口的难度
   return $http.post('/changePassword',qs.stringify({
       //key(接口的请求参数有关) ：value(获取用户传入的token)
        token:tokenValue,
        oldPassword,//旧密码
        newPassword//新密码
    }))
    .then((data)=>data.data)
}