// 配置了babel转换器之后，就可以使用ES6的import导入语法
import { baojian1, baojian2 } from './baojian.js'; 

// 未配置babel的话，jest只支持commonjs的语法。
// const baojian = require('./baojian.js');
// const { baojian1, baojian2 } = baojian;

test('baojian1 cost 300',()=>{
    expect(baojian1(300)).toBe('至尊享受');
});

test('baojian2 cost 2000', ()=>{
    expect(baojian2(2000)).toBe('双人服务');
});