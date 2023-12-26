"use strict";
// // class Personを作ることによって、
// // クラスの他にPersonという型を作成されている
// class Person {
//     name: string;
//     constructor(initName: string) {
//         this.name = initName;
//     }
//     // greeting(){
//     //     console.log(`Hello! I'm ${this.name}`);
//     // }
//     // // ここの引数（第一引数はthis固定）に型を付けることで、
//     // // エラーを検出することができる
//     // greeting(this: { name:string }){ 
//     //     // thisはオブジェクト型で、その中にnameが存在する必要があると明記
//     //     console.log(`Hello! I'm ${this.name}`);
//     // }
//     // Pesonという型があることによって、
//     // このように書くことができる
//     greeting(this: Person){
//         console.log(`Hello! I'm ${this.name}`);
//     }
// }
// // constructor関数は、例えばPersonという設計図をもとに
// // オブジェクトが作られる時に実行される
// // => 初期化する時に使う
// // ちなみに、引数を付けることができる
// // thisはフィールドに書いた（この場合はname）の集まりを表す
// // なので、thisから .でnameを引っ張ることができる
// const mabupro = new Person('Mabupro');
// // constructorへの引数は、このように記述することができる。
// // console.log(mabupro); //Person { name: 'Mabupro' }
// mabupro.greeting(); // Hello! I'm Mabupro
// const anotherMabupro = {
//     name: 'anotherMabupro', // 追加すると↓
//     greeting(){}, // Person型として定義した場合
//                   // greetingも使われているので、定義しなければいけない
//                   // 若しくはanotherGreetingは元のPersonには
//                   // 存在しないので、これをgreetingとして定義して良い
//     anotherGreeting: mabupro.greeting 
//     // この場合には、↑ここ{}がthisの示す所になる
//     // オブジェクトの中で、thisを使ったときは、
//     // オブジェクトそのものを指すようになる。
//     // classからgreeting関数を持って来て、
//     // anotherMabuproのなかで、this.nameを探すイメージ
//     // なので、このオブジェクトのnameを消してこのように書くと
//     // this.name でエラーがでる
//     // anotherGreeting: function() {
//     //     console.log(`Hello I'm ${this.name}`)
//     // }
//     // なぜ mabupro.greetingと書いたときに、errorが出るか
//     // TypeScriptは間接的なものは、チェックすることができない
// }
// // thisは定義された場所（今回はPerson）ではなく、
// // 実行された場所によって変わってしまう
// anotherMabupro.anotherGreeting(); // Hello! I'm undefined 
//                                   // Hello! I'm anotherMabupro
// // greeting()に引数を設定してすると
// // anotherMabuproにnameフィールドが内場合には...
// // class.ts:10:22
// //     10     greeting(this: { name:string }){       
// //    ~~~~
// //     'name' is declared here.
// // とエラーが出る
// ------------------------------------------------------------------------
// class Person {
//     // name: string;
//     // private age: number;
//     // // class内ではthis.ageでアクセスできる
//     // constructor(initName: string, initAge: number){
//     //     this.name = initName,
//     //     this.age = initAge
//     // }
//     // このように書くとスッキリする
//     // 上のコメントアウトした書き方と同じことをができている。
//     constructor(
//         public name: string,
//         private age: number
//     ){}
//     incrementAge(){
//         this.age += 1;
//     }
//     greeting(this: Person){
//         console.log(`Hello! I'm ${this.name}. I'm ${this.age} years old.`);
//     }
// }
// const mabupro = new Person('Mabupro',20);
// mabupro.incrementAge();
// // mabupro.age = 30 
// // privateにしないと直接書き込めてしまう。
// // 更に、いじれないということは
// // console.log(mabupro.age);で表示することもできない
// // Tips：private incrementAge()みたいにクラス内でしか
// // 使えない関数も作ることができる
// mabupro.greeting();
// ------------------------------------------------------------------------
// readonly
// これをconstructorに付けると、クラス内外に関わらず
// 読むだけしか出来なくなる。
// class Person {
//     // 勿論、初期化にも使える
//     // constructor内にも言えるが、readonly or public　はつける
//     readonly id: number = 19;
//     constructor(
//         readonly name: string, // 名前は基本変化しないので
//         private age: number
//     ){
//         // constructorは初期化するので、変更することができる
//         this.id = 32;
//     }
//     incrementAge(){
//         this.age += 1;
//         // this.id += 1; // ここでは変更できない
//     }
//     greeting(this: Person){
//         console.log(`Hello! I'm ${this.name}. I'm ${this.age} years old.`);
//     }
// }
// const mabupro = new Person('Mabupro',20);
// mabupro.incrementAge();
// mabupro.greeting();
// ------------------------------------------------------------------------
// extends 継承
// class Person {
//     constructor(
//         readonly name: string,
//         // private age: number
//         protected age: number
//     ) { }
//     incrementAge() {
//         this.age += 1;
//     }
//     greeting(this: Person) {
//         console.log(`Hello! I'm ${this.name}. I'm ${this.age} years old.`);
//     }
// }
// // 先生も人間なので、Personを継承する
// // class Teacher extends Person {
// // }
// // const teacher = new Teacher();
// // なにも入れてないとエラーがでる
// // Personで定義されている name age がないから
// // class Teacher extends Person {
// // }
// // const teacher = new Teacher('Mabupro',20);
// // これでOK
// class Teacher extends Person {
//     constructor(name: string, age: number, public subject: string) {
//         // newで作ったところから読み込みたいので...↑
//         super(name, age);    // super class を含まないと初期化できない
//     }
//     greeting() {
//         // console.log(`Hello! I'm ${this.name}. I'm ${this.age} years old. I teach ${this.subject}`);
//         // ageはPersonでprivateにしているのでアクセスできない...
//         // この場合は、Personのprivateにしているageをprotectedに変更する
//         console.log(`Hello! I'm ${this.name}. I'm ${this.age} years old. I teach ${this.subject}`);
//     }
// }
// const teacher = new Teacher('Mabupro', 20, 'Japanese');
// // teacher.age = 31;  // ageはprotectedで隠されているのでアクセスできない
// teacher.greeting();
// ------------------------------------------------------------------------
// // ゲッター
// // 何かのデータを取得したときに、ある関数を実行したいときに使う
// // セッター
// // 何かの値を変更する時に、ある処理を実行したいときに使う
// // ゲッターセッターは同じ型を持つ必要がある。片方がstring型にしたらもう一つも自動で決まる
// class Person {
//     constructor(
//         readonly name: string,
//         protected age: number
//     ) { }
//     incrementAge() {
//         this.age += 1;
//     }
//     greeting(this: Person) {
//         console.log(`Hello! I'm ${this.name}. I'm ${this.age} years old.`);
//     }
// }
// class Teacher extends Person {
//     get subject(): string {
//         if(!this._subject){ // _subjectにデータが入っていなかったら privateでもクラス内ならアクセスできる
//             throw new Error('There is no subject.');
//         }
//         return this._subject;
//     }
//     set subject(value){ // セッターは必ず1つパラメーターを持つ
//         if(!value){ 
//             throw new Error('There is no subject.');
//         }
//         this._subject = value;
//     }
//     constructor(name: string, age: number, private _subject: string) {
//         super(name, age);
//     }
//     greeting() {
//         console.log(`Hello! I'm ${this.name}. I'm ${this.age} years old. I teach ${this.subject}`);
//     }
// }
// const teacher = new Teacher('Mabupro', 20, 'Japanese');
// console.log(teacher.subject);
// // teacher.subjectを取得する時に何かする時に使う
// teacher.subject = 'gahaha' // セッター用
// console.log(teacher.subject);
// teacher.greeting();
// ------------------------------------------------------------------------
// // staticとは
// Math.PI
// // 例えばこれ、インスタンスを作ってないのにメソッドが使える
// // new Math　とかしてない
// class Person {
//     static species = 'Homo sapiens';
//     static isAdult (age: number){
//         if(age > 17) return true;
//         return false;
//     }
//     constructor(
//         readonly name: string,
//         protected age: number
//     ) { }
//     incrementAge() {
//         this.age += 1;
//         // this.  // thisはオブジェクト(Person)の設計図から作られたインスタンスを指すため
//                   // staticはインスタンスを作成していないのでこのように書く
//                   // Person.species
//     }
//     greeting(this: Person) {
//         console.log(`Hello! I'm ${this.name}. I'm ${this.age} years old.`);
//     }
// }
// console.log(Person.species);
// console.log(Person.isAdult(34));
// // 更にextendsで継承した先でも使える
// // console.log(teacher.species);
// ------------------------------------------------------------------------
// // abstract（継承しか使えないクラス）抽象的
// abstract class Person {
//     static species = 'Homo sapiens';
//     static isAdult(age: number) {
//         if (age > 17) return true;
//         return false;
//     }
//     constructor(
//         readonly name: string,
//         protected age: number
//     ) { }
//     incrementAge() {
//         this.age += 1;
//     }
//     greeting(this: Person) {
//         console.log(`Hello! I'm ${this.name}. I'm ${this.age} years old.`);
//         this.explainJob();
//     }
//     // abstractを使う時は、クラス自体もabstractクラスにしないといけない
//     // abstractはインスタンスを作ることができない
//     abstract explainJob(): void
// }
// //new Person()  // このように、インスタンスを作ることができない
//                 // 理由：this.explainJobがないので
// class Teacher extends Person {
//     explainJob() {
//         console.log(`I am teacher and I teach ${this.subject}`);
//     }
//     get subject(): string {
//         if (!this._subject) {
//             throw new Error('There is no subject.');
//         }
//         return this._subject;
//     }
//     set subject(value) {
//         if (!value) {
//             throw new Error('There is no subject.');
//         }
//         this._subject = value;
//     }
//     constructor(name: string, age: number, private _subject: string) {
//         super(name, age);
//     }
// }
// const teacher = new Teacher('Mabupro', 20, 'Math');
// teacher.greeting();
// ------------------------------------------------------------------------
// private constructor
// これをするとnewで新しいオブジェクトを作ることが出来なくなる
// シングルトンパターン　クラスから1つしかインスタンスが作れないようにする時に使用
class Person {
    static isAdult(age) {
        if (age > 17)
            return true;
        return false;
    }
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    incrementAge() {
        this.age += 1;
    }
    greeting() {
        console.log(`Hello! I'm ${this.name}. I'm ${this.age} years old.`);
        this.explainJob();
    }
}
Person.species = 'Homo sapiens';
class Teacher extends Person {
    explainJob() {
        console.log(`I am teacher and I teach ${this.subject}`);
    }
    get subject() {
        if (!this._subject) {
            throw new Error('There is no subject.');
        }
        return this._subject;
    }
    set subject(value) {
        if (!value) {
            throw new Error('There is no subject.');
        }
        this._subject = value;
    }
    constructor(name, age, _subject) {
        super(name, age);
        this._subject = _subject;
    }
    static getInstance() {
        if (Teacher.instance)
            return Teacher.instance; // これですでにTeacher.instanceが生成されていたらそれを返す
        Teacher.instance = new Teacher('Mabupro', 20, 'Math');
        return Teacher.instance;
    }
}
// const teacher = new Teacher('Mabupro', 20, 'Math');
// クラスの中でのみインスタンスを作成することができる。
// staticは使うことができる
const teacher = Teacher.getInstance();
const teacher2 = Teacher.getInstance();
console.log(teacher, teacher2); // １つのクラスから１つのインスタンスだけを作成できた
