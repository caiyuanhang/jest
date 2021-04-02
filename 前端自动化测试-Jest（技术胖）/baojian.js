// 配置了babel转换器之后，就可以使用ES6的import导入语法
export function baojian1(money) {
    return money >= 200 ? '至尊享受' : '基本按摩';
}

export function baojian2(money) {
    return money>=1000?'双人服务':'单人服务';
}


// 未配置babel的话，jest只支持commonjs的语法。
// module.exports = {
//     baojian1, baojian2
// };