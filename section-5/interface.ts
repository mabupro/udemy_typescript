// const human: {
//     name: string;
//     age: number;
// } = {
//     name: 'mabupro',
//     age: 20
// }

// let  developer: {
//     name: string;
//     age: number;
// }

// // 新しく作る時にこうやって書くのはだるすぎる


// // type alias

// type Human = {
//     name: string;
//     age: number;
// }

// // interface オブジェクトのみ

// interface Human {
//     name: string;
//     age: number;
// }

// const human: Human = {
//     name: 'mabupro',
//     age: 20,
// }

// ------------------------------------------

// // メソッドして関数をinterfaceに配置する方法

// interface Human {
//     name: string;
//     age: number;
//     // greeting: (message: string) => void;
//     greeting(message: string): void;
//     // メソッドのみ　この書き方ができる
//     // 下のhumanを型推論にすると、この書き方になる
// }

// const human: Human = {
//     name: 'mabupro',
//     age: 20,
//     greeting(message: string): void {
//         console.log(message);
//     }
// }

// let tmpFunc: (message: string) => void;
// // let tmpFunc2(message: string): void;
// // 関数っぽくて、わかりづらい
// // あくまでもオブジェクトのなかの関数

// ------------------------------------------

// // classとinterfaceを同時に使う

// interface Human {
//     name: string;
//     age: number;
//     greeting(message: string): void;
// }

// // classの型をHumanと同じようにしたい
// // implementsを使う

// // implementsはclassと違い、複数を継承することができる
// // interfaceやオブジェクトになっているtypeを↓
// // class Developer implements Human,Wanwan,NyaaNyaa {}
// class Developer implements Human {
//     constructor(
//         public name: string,    // public or readonly
//         public age: number,
//         public exprience: number
//     ) { }
//     greeting(message: string): void {
//         console.log('Hello!')
//     }
// }

// ------------------------------------------

// interface Human {
//     name: string;
//     age: number;
//     greeting(message: string): void;
// }

// class Developer implements Human {
//     constructor(
//         public name: string,
//         public age: number,
//         public exprience: number
//     ) { }
//     greeting(message: string): void {
//         console.log(message);
//     }
// }

// const tmpDeveloper = {
//     name: 'mabupro',
//     age: 20,
//     experience: 1,
//     greeting(message: string) {
//         console.log(message);
//     }
// }

// // const user: Human = new Developer('mabupro', 20, 1);
// // user.name
// // user.age
// // user.greeting
// // 構造的部分型と呼ばれる。Developer側が多くても大丈夫
// const user: Human = tmpDeveloper;
// // 少なくとも、Human型のデータはあることを確認できる
// // const tmpDeveloperで書かれていることを直接書くことはできない
// // const user: Human = tmpDeveloperのように間接的はおｋ
// // => 明示的にexprerieceをHumanにないのに書くなと怒っている

// ------------------------------------------

// // implementsのHumanは本当に変数名と型だけ渡しているので
// // Humanのnameをreadonlyにしていても(privateは使えないよ)
// // class Developer内のnameをreadonlyやprivateにしない限り
// // Developerへは外部からアクセスして変更することができる

// interface Human {
//     readonly name: string;
//     age: number;
//     greeting(message: string): void;
// }

// class Developer implements Human {
//     constructor(
//         public name: string,
//         public age: number,
//         public exprience: number
//     ) { }
//     greeting(message: string): void {
//         console.log(message);
//     }
// }

// const tmpDeveloper = {
//     name: 'mabupro',
//     age: 20,
//     experience: 1,
//     greeting(message: string) {
//         console.log(message);
//     }
// }

// const user: Human = tmpDeveloper;
// const developer = new Developer('mabupro', 20, 1);
// // developerには書き込める

// ------------------------------------------

// // interfaceの継承

// interface Nameable {
//     name: string;
// }

// // typeもinterfaceもimplementsと同じように多重継承が可能
// // しかし、継承先がinterfaceなら
// interface Human extends Nameable {
//     // name: string; // ほぼ同じ型なら上書きすることが可能
//     age: number;
//     greeting(message: string): void;
// }

// // type Numable = {
// //     name:string;
// // }

// // type Human = {
// //     name: number; // typeの場合はnumberで上書きできてしまう
// //     age: number;
// //     greeting(message: string) : void;
// // } & Nameable // &はtypeからtypeへ継承する時に使う

// class Developer implements Human {
//     constructor(
//         public name: string,
//         public age: number,
//         public exprience: number
//     ) { }
//     greeting(message: string): void {
//         console.log(message);
//     }
// }

// const tmpDeveloper = {
//     name: 'mabupro',
//     age: 20,
//     experience: 1,
//     greeting(message: string) {
//         console.log(message);
//     }
// }

// ------------------------------------------

// // interfaceで関数の型を定義する
// // 基本的にはtypeを使って関数を定義するが...

// // type addFunc = (num1: number, num2: number) => number;
// interface addFunc{
//     (num1: number, num2:number) : number;
// }
// let addFunc: addFunc;
// addFunc = (n1: number, n2: number) => {
//     return n1 + n2;
// }

// type Nameable = {
//     name: string;
// }

// interface Human extends Nameable {
//     age: number;
//     greeting(message: string): void;
// }

// class Developer implements Human {
//     constructor(
//         public name: string,
//         public age: number,
//         public exprience: number
//     ) { }
//     greeting(message: string): void {
//         console.log(message);
//     }
// }

// const tmpDeveloper = {
//     name: 'mabupro',
//     age: 20,
//     experience: 1,
//     greeting(message: string) {
//         console.log(message);
//     }
// }

// ------------------------------------------

// ?を使ってオプション

type addFunc = (num1: number, num2: number) => number;
let addFunc: addFunc;
addFunc = (n1: number, n2: number) => {
    return n1 + n2;
}

interface Nameable {
    name?: string;  // こちらにも書く必要がある
    nickName?: string;
}

const nameable: Nameable = {
    name: 'mabupro'
    // nickNameがなくてもエラーがでない。 typeでもinterfaceでも
}

interface Human extends Nameable {
    age: number;
    greeting(message: string): void;
}

class Developer implements Human {
    name?: string;  // constructorで初期化しなくてもいい
    constructor(
        public age: number,
        public exprience: number,
        initName?: string
    ) {
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
    greeting(message: string = 'hello'): void {
        console.log(message);
    }
}

const user: Human = new Developer(20, 1);
if (user.name) {
    user.name.toUpperCase();
}
const user2: Human = new Developer(20, 1, 'mabupro');
console.log(user.name, user2.name);