//所有关于账号部分接口的请求处理，都封装在这个文件中
//公司有可能这么做，但是不推荐，每个名字不一样的请求都要封装一个方法- -，代码太冗余
 //引入request.js

 import request from '../utils/request';

 //添加管理员账号方法
 export function addadmin (url,params) {
     return new Promise((resolve,reject) => {
         request.post(url,params)    //get和post的代码一模一样，因为在request中已经封装好了
            .then(res => {
                resolve(res)  //成功的数据
            })
            .catch(err => {
                reject(err)  //失败的数据
            })
     })
 }