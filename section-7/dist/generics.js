"use strict";
// 関数に型を引数として渡す（ジェネリクス）
// Tはtypeを表す。T
// T,T1,T2など増やすこともできる
function copy(value) {
    let user;
    return value;
}
console.log(copy('hello'));
// ここで定義したstringがTに入る
console.log(copy({ name: 'mabupro' }));
// 型推論が働く
// --------------------------------------
// 型パラメーターに制約を付ける
function copy1(value, key) {
    value[key];
    return value;
}
console.log(copy1({ name: 'mabupro', age: 21 }, 'age')); // 第一引数からextendsしてるので、
// nameとageのunion型になる
// --------------------------------------
// クラスにジェネリクス
class LightDatabase {
    constructor() {
        this.data = [];
    }
    add(item) {
        this.data.push(item);
    }
    remove(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    get() {
        return this.data;
    }
}
// ユニオン型で定義すると折角stringに制限したいのに出来なくなる
const stringLightDatabase = new LightDatabase();
stringLightDatabase.add('Apple');
stringLightDatabase.add('Banana');
stringLightDatabase.add('Grape');
stringLightDatabase.remove('Banana');
console.log(stringLightDatabase.get());
const tmpDatabase = {
    id: 3,
    data: [31]
};
// 他にもある
// Promiseの型も指定することができる。
const fetchData = new Promise(resolve => {
    setTimeout(() => {
        resolve('hello');
    }, 3000);
});
fetchData.then(data => {
    data.toUpperCase();
});
// 配列
const vefetables = ['Tomato', 'Broccoli', 'Asparagus'];
let tmp2;
let tmp3;
let tmp4;
// こちらも
// stringはNonNullableにホバーすれば分かるが、nullでもundefiendでもないので
// stringが型になる
// null は　never型になるのが分かる
let tmp5;
