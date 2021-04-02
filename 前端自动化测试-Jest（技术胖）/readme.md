一、前端主流的测试框架：Jasmine、MOCHA、Jest


二、Jest的优点：
- 比较新
- 基础好
- 速度快
- API简单
- 隔离性好
- IDE整合（跟vs code的整合非常好）
- 多项目运行
- 覆盖率


三、Jest环境搭建
```js
    npm init
```


四、Jest测试
```js
    // baojian.js文件，功能模块
    function baojian1(money) {
        return money >= 200 ? '至尊享受' : '基本按摩';
    }

    function baojian2(money) {
        return money>=1000?'双人服务':'单人服务';
    }

    module.exports = {
        baojian1, baojian2
    };
```
```js
    // baojian.test.js，单元测试文件
    const baojian = require('./baojian.js');
    const { baojian1, baojian2 } = baojian;

    test('baojian1 cost 300',()=>{
        expect(baojian1(300)).toBe('至尊享受');
    });

    test('baojian2 cost 2000', ()=>{
        expect(baojian2(2000)).toBe('双人服务');
    });
```


五、单元测试和集成测试（也叫组装测试或联合测试）。
1、unit testing（单元测试）：指对软件中最小可测试单元进行检查和验证。（在前端就是指一个模块，必须是一个模块，否则无法测试）

2、集成测试待查询？


六、jest基本配置和覆盖率生成
```js
    // 生成初始化的jest.config.js文件
    npx jest --init

    // 生成代码覆盖率报告，同时会生成一份html的报告
    npx jest --coverage

    // 在package.json文件中的使用配置
    {
        "scripts": {
            // 自动监视测试文件
            "test": "jest --watchAll",

            // 生成覆盖率报表
            "coverage": "jest --coverage"
        }
    }
```


七、jest的匹配器
1、关于真假的匹配器。
```js
    // 1）toBe()，表示expect值和目标值绝对相等。
    test('测试007号技术的匹配',()=>{
        const a = {
            number: 007
        };
        expect(a).toBe({number:007})
    });     // 对象a的引用地址跟{number:007}的引用地址不一样，无法绝对相等，测试的时候会报错。


    // 2）toEqual()，表示expect值和目标值内容、结果的匹配，而不是包含了引用地址的绝对匹配。
    test('toEqual匹配',()=>{
        const a = {
            number: '007'
        };
        expect(a).toEqual({number:'007'})
    }); 


    // 3）toBeNull()，表示expect的值为null的时候匹配，这时toBeNull()什么都不用填。
    test('toBeNull匹配',()=>{
        const a = null;
        expect(a).toBeNull();
    }); 


    // 4）toBeUndefined()，表示expect的值为undefined的时候匹配，这时toBeUndefined()什么都不用填。
    test('toBeUndefined匹配',()=>{
        const a = undefined;
        expect(a).toBeUndefined();
    });

    
    // 5）toBeDefined()，表示只要expect有值（定义了），就可以通过测试。
    test('toBeDefined匹配',()=>{
        const a = 1;
        expect(a).toBeDefined();
    });


    // 6）toBeTruthy()，表示判断expect的值为true才可以通过测试。
    test('toBeTruthy匹配',()=>{
        const a = 1;
        expect(a).toBeTruthy();
    });


    // 7）toBeFalsy()，表示判断expect的值为false才可以通过测试。
    test('toBeFalsy匹配',()=>{
        const a = 0;
        expect(a).toBeFalsy();
    });
```

2、关于对比大小的匹配器。
```js
    // 1）toBeGreaterThan()，表示expect值大于目标值则可以通过测试。
    test('toBeGreaterThan匹配器', ()=>{
        const count = 10;
        expect(count).toBeGreaterThan(9);
    })


    // 2）toBeLessThan()，表示expect值小于目标值则可以通过测试。
    test('toBeLessThan匹配器', ()=>{
        const count = 10;
        expect(count).toBeLessThan(11);
    })


    // 3）toBeGreaterThanOrEqual()，表示expect值大于等于目标值则可以通过测试。
    test('toBeGreaterThanOrEqual匹配器', ()=>{
        const count = 10;
        expect(count).toBeGreaterThanOrEqual(10);
    })


    // 4）toBeLessThanOrEqual()，表示expect值小于等于目标值则可以通过测试。
    test('toBeLessThanOrEqual匹配器', ()=>{
        const count = 10;
        expect(count).toBeLessThanOrEqual(10);
    })


    // 5）toBeCloseTo()，主要用来处理JS中浮点数的问题，JS中一般0.1+0.2不等于0.3，而是等于0.30000000000000004。
    test('toBeCloseTo匹配器', ()=>{
        const one = 0.1;
        const two = 0.2;
        expect(one + two).toBeCloseTo(0.3);
    })
```

3、关于字符串、数组、对象的匹配器。
```js
    // 1）toMatch()，匹配字符串，表示只要expect值包含目标字符串，即可通过测试。
    test('toMatch匹配器', () => {
        const str = 'def';
        expect(str).toMatch('d');
    })


    // 2）toContain()，匹配数组，表示只要expect里面的数组包含目标，即可通过测试。expect的值除了可以使用数组，还可以使用set集合。
    test('toMatch匹配器', () => {
        const arr = ['d', 'e', 'f'];
        expect(arr).toContain('d');
        const data = new Set(arr);
        expect(data).toContain('e');
    })


    // 3）toThrow()，匹配异常，表示expect的值如果是一个异常，则测试通过。
    test('toThrow匹配器', () => {
        const throwNewErrorFunc = function(){
            throw new Error('this is error');
        };
        expect(throwNewErrorFunc).toThrow('this is error');
    })

    // 不抛出异常。
    test('toThrow匹配器', () => {
        const throwNewErrorFunc = function(){
            // throw new Error('this is error');
        };
        expect(throwNewErrorFunc).not.toThrow();
    })
```


八、让jest支持import和ES6语法。
1、因为jest不支持es6的语法，只支持commonjs的语法，所以在使用import from导入、export导出的时候，会报错。

2、解决方案：需要使用babel转换器，把import语法转换成commonjs语法。
```js
    npm instal --save -D add @babel/core @babel/preset-env

    // 添加.babelrc文件，添加presets配置。
    {
        "presets": [
            [
                "@babel/preset-env", {
                    "target": {
                        "node": "current"
                    }
                }
            ]
        ]
    }
```
整个npm run test命令的运行机制是：run test之后，jest会先查找是否有babel这个工具库，有则继续找到.babelrc这个文件后，根据里面的配置进行转换，最后再测试。


九、
