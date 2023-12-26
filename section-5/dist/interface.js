"use strict";
// const human: {
//     name: string;
//     age: number;
// } = {
//     name: 'mabupro',
//     age: 20
// }
let addFunc;
addFunc = (n1, n2) => {
    return n1 + n2;
};
const nameable = {
    name: 'mabupro'
    // nickNameがなくてもエラーがでない。 typeでもinterfaceでも
};
class Developer {
    constructor(age, exprience, initName) {
        this.age = age;
        this.exprience = exprience;
        if (initName) {
            this.name = initName;
        }
    }
    // // パラメーターにもつけれる
    // greeting(message?: string): void {
    //     if(message){
    //         // 何かの処理
    //     }
    //     console.log(message);
    // }
    // デフォルトメッセージがでるようにすることもできる
    greeting(message = 'hello') {
        console.log(message);
    }
}
const user = new Developer(20, 1);
if (user.name) {
    user.name.toUpperCase();
}
const user2 = new Developer(20, 1, 'mabupro');
console.log(user.name, user2.name);
