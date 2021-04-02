// test('测试007号技术的匹配', () => {
//     const a = {
//         number: 007
//     };
//     expect(a).toBe({ number: 007 })
// });


// test('toEqual匹配',()=>{
//     const a = {
//         number: '007'
//     };
//     expect(a).toEqual({number:'007'})
// }); 


// test('toBeNull匹配',()=>{
//     const a = null;
//     expect(a).toBeNull();
// }); 


// test('toBeUndefined匹配',()=>{
//     const a = undefined;
//     expect(a).toBeUndefined();
// });


// test('toBeDefined匹配',()=>{
//     const a = 1;
//     expect(a).toBeDefined();
// });


// test('toBeTruthy匹配',()=>{
//     const a = 1;
//     expect(a).toBeTruthy();
// });


// test('toBeFalsy匹配',()=>{
//     const a = 0;
//     expect(a).toBeFalsy();
// });


// test('toBeGreaterThan匹配器', ()=>{
//     const count = 10;
//     expect(count).toBeGreaterThan(9);
// })


// test('toBeLessThan匹配器', ()=>{
//     const count = 10;
//     expect(count).toBeLessThan(11);
// })


// test('toBeGreaterThanOrEqual匹配器', ()=>{
//     const count = 10;
//     expect(count).toBeGreaterThanOrEqual(10);
// })


// test('toBeLessThanOrEqual匹配器', ()=>{
//     const count = 10;
//     expect(count).toBeLessThanOrEqual(10);
// })


// test('toBeCloseTo匹配器', ()=>{
//     const one = 0.1;
//     const two = 0.2;
//     expect(one + two).toBeCloseTo(0.3);
// })


// test('toMatch匹配器', () => {
//     const str = 'def';
//     expect(str).toMatch('d');
// })


// test('toMatch匹配器', () => {
//     const arr = ['d', 'e', 'f'];
//     expect(arr).toContain('d');
//     const data = new Set(arr);
//     expect(data).toContain('e');
// })


test('toThrow匹配器', () => {
    const throwNewErrorFunc = function(){
        throw new Error('this is error');
    };
    expect(throwNewErrorFunc).toThrow('this is error');
})

test('toThrow匹配器', () => {
    const throwNewErrorFunc = function(){
        // throw new Error('this is error');
    };
    expect(throwNewErrorFunc).not.toThrow();
})