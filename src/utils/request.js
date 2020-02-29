/**
 * 做企业级axios封装的
 */
// 1.准备
import axios from "axios";
// 2.配置
const axiosInstance = axios.create({
                                // 公共的请求地址配置在这里
                                //学校
                                baseURL : 'http://172.16.14.202:666',
                                //家里
                                // baseURL : 'http://127.0.0.1:666',
                                // 请求超时时间（单位ms）
                                timeout: 1000
                            })

// axios拦截器（暂时不管）

// 3.导出
export default axiosInstance;

// basURl = 'http://192.168.1.1';
// axios.get(basURl+':666/user/list')
// axios.post('http://192.168.1.1:666/user/add')