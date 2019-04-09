/* 工具函数 */
//正则表达式验证密码
export function passwordReg (val) {
    const reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
    return reg.test(val)    //检测val是否满足正则表达式，return的结果是true 或者false
}

//export可以暴露多个，但export defalut一个模块中只能暴露一个