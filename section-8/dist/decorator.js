"use strict";
// // tsconfig.json
// // "experimentalDecorators": trueをコメントインする
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// // デコレーターとは
// // クラスを使ったフレームワーク（Angular）によく使われる
// // new Date // のような内蔵されている関数(Function)
// function Logging(constructor: Function) {
//     console.log('Logging...');
//     console.log(constructor);
// }
// // デコレーションはインスタンス生成時ではなく
// // クラスの定義時に実行されている。
// @Logging
// class User {
//     name = 'Mabupro';
//     constructor() {
//         console.log('User was created!');
//     }
// }
// const user1 = new User();
// const user2 = new User();
// const user3 = new User();
// // -----------------------------------------------
// // デコレーターファクトリー
// // デコレーターを返す関数を作ることで、引数を受け取ることができる。
// function Logging1(message: string) {
//     return function (constructor: Function) {
//         console.log(message);
//         console.log(constructor);
//     }
// }
// @Logging1('Logging User')
// class User1 {
//     name = 'Mabupro';
//     constructor() {
//         console.log('User was created!');
//     }
// }
// -----------------------------------------------
// // @Component
// function Logging2(message: string) {
//     return function (constructor: Function) {
//         console.log(message);
//         console.log(constructor);
//     }
// }
// function Component(template: string, selector: string) {
//     return function (constructor: { new(...args: any[]): { name: string } }) {  // 下のnewに入れる
//         const mountedElement = document.querySelector(selector);
//         const instance = new constructor();
//         if (mountedElement) {
//             mountedElement.innerHTML = template;
//             mountedElement.querySelector('h1')!.textContent = instance.name;
//         }
//     }
// }
// // デコレーターファクトリーは上から順番に
// // デコレーターは下から実行される。Logging => Component
// @Component('<h1>{{name}}</h1>', '#app')
// @Logging2('Logging User')
// class User2 {
//     name = 'Mabupro';
//     constructor() {
//         console.log('User was created!');
//     }
// }
// -----------------------------------------------
// 戻り値にクラスを指定して新しいクラスを作る
function Logging3(message) {
    return function (constructor) {
        console.log(message);
        console.log(constructor);
    };
}
function Component3(template, selector) {
    return function (constructor) {
        return class extends constructor {
            constructor(...args) {
                super(...args);
                const mountedElement = document.querySelector(selector);
                const instance = new constructor();
                if (mountedElement) {
                    mountedElement.innerHTML = template;
                    mountedElement.querySelector('h1').textContent = instance.name;
                }
            }
        };
    };
}
function PropertyLogging(target, PropertyKey) {
    console.log('propertyLogging');
    console.log(target);
    console.log(PropertyKey);
}
let User3 = class User3 {
    constructor() {
        this.name = 'Mabupro';
        console.log('User was created!');
    }
};
User3.name2 = 'Mabupro';
__decorate([
    PropertyLogging
], User3.prototype, "name", void 0);
User3 = __decorate([
    Component3('<h1>{{name}}</h1>', '#app'),
    Logging3('Logging User')
], User3);
// -----------------------------------------------
