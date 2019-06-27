//这个函数时对axios的封装
//引入axios
import axios from 'axios'
//引入qs处理post的参数
import qs from 'qs'
import local from '@/utils/local'

//设置请求的服务器根目录  设置响应请求的后台服务器地址之后，发送时的路径就可以省略前面这个地址，只需要写路径
axios.defaults.baseURL = ' http://127.0.0.1:888'

//axios请求拦截器
axios.interceptors.request.use(config => {
    //获取token
    const token = local.get('bugaosuni');
    config.headers.authorization = `Bearer ${token}`
    return config;
})
//导出请求对象
export default {
    get(url, params = {}) {   //调用request得到一个new Promise,里面有两个方法get和post    //params这行只是一个参数，可以换成其他的，比如data
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params           //这行也要换成 params:data,参数一样可以简写
            })
                .then(response => {
                    resolve(response.data)   //成功使用resolve处理
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url,qs.stringify(params))
                .then(response => {
                    resolve(response.data) 
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}