// インターセクション型 typeでもinterfaceでも

type Engineer = {
    name: string;
    role: string;
}

type Blogger = {
    name: string;
    follower: number;
}

// type EngineerBlogger = Engineer & Blogger;
interface EngineerBlogger extends Engineer, Blogger { }

const mabupro: EngineerBlogger = {
    name: 'mabupro',
    role: 'flontend',
    follower: 200
}

type tmp = string & number;
// stringとnumberが混ざることはないので => never型になる

type NumberBoolean = number | boolean;
type StringNumber = string | number;
type Mix = NumberBoolean & StringNumber; // number型になる　被っているところが残る

// ----------------------------------------------------

// タイプガード

// typeof演算子
function toUpperCase(x: string | number) {
    // x.toString
    // x.valueOf
    // stringでもnumberでも持っているプロパティしか使えない
    // x.toUpperCase();　はnumberには使えないので、ここでは使うことができない

    if (typeof x === 'string') {
        return x.toUpperCase();  // 制限するとstringに対するプロパティが使える
    }
    return ''; // こちらでは、numberに対するプロパティが使えるようになる
}

// in演算子
type NomadWorker = Engineer | Blogger;
function describeProfile(nomadWorker: NomadWorker) {
    console.log(nomadWorker.name); // EnginnerとBloggerの&が持っているのはnameだけだから、nameだけアクセスできる
    // if (typeof nomadWorker === 'object') // objectというのはtypeofで分かるが、中身は特定不可
    if ('role' in nomadWorker) { // nomadWorkerに'role'があるのか？
        console.log(nomadWorker.role);
    }
    if ('follower' in nomadWorker) { // followerがあるのは、Bloggerだけ
        console.log(nomadWorker.follower);
    }
}

// instansOf
class Dog {
    speak() {
        console.log('bow-bow');
    }
}

class Bird {
    speak() {
        console.log('tweet-tweet');
    }
    fly() {
        console.log('flutter');
    }
}

type Pet = Dog | Bird;
function havePet(pet: Pet) {
    pet.speak();    // DogもBirdもspeakという関数を持っているので、アクセスできる
    // if('fly' in pet){ 
    //     pet.fly();
    // }
    // in演算子でもできるが...
    if (pet instanceof Bird) {    // petがBirdのクラスから作られたインスタンスかを判断
        pet.fly();
    }
}
havePet(new Bird());// tweet-tweet  flutter
havePet(new Dog()); // bow-bow
// havePet({
//     speak() { console.log('hello') },
//     fly() { console.log('not fly') }
// })               // hello
// Birdっぽく書いてもhelloしか出力されないのは
// if文でBirdのinstansでないとfly()の内容は実行しないから

// ----------------------------------------------------

// タグ付きユニオン

class Dog2 {
    kind: 'dog' = 'dog';    // 何かタグをつけてあげる
    speak() {
        console.log('bow-bow');
    }
}

class Bird2 {
    kind: 'bird' = 'bird';  // 何かタグをつけてあげる
    speak() {
        console.log('tweet-tweet');
    }
    fly() {
        console.log('flutter');
    }
}

type Pet2 = Dog2 | Bird2;
function havePet2(pet2: Pet2) {
    pet2.speak();
    switch (pet2.kind) {    // if文でいちいち判断するよりもスマート
        case "bird":
            pet2.fly();
    }
    if (pet2 instanceof Bird2) {
        pet2.fly();
    }
}

// ----------------------------------------------------

// 型アサーション

// <input id="input"> // HTMLがあったとして
const input = <HTMLInputElement>document.getElementById('input');
const input2 = document.getElementById('input') as HTMLInputElement;
// <>でinputはHTMLInputElementだということを、Typescriptに教えてあげる必要がある。
// 2つのやり方があるがReactなら、as HTML~~~を書いた方が良い
input.value = 'initial input value';
input2.value = 'initial input value';
(document.getElementById('input') as HTMLInputElement).value = 'initial input value';
// このように書けたりもする

// ----------------------------------------------------

// nonNullアサーションオペレーター 「!」

const input3 = document.getElementById('input')!;   // 絶対にNullではないと宣言
// input3.value = 'initial input value'
// if文で条件式を使わなくても良いがif文のほうが良い

// ----------------------------------------------------

// indexシグネチャー
// オブジェクトのメンバ、プロパティを追加できる

interface Designer {
    name: string;
    [index: string]: string;    // ① index:string だと追加するときは縛られないが、numberにすると数字だけになる
    // 追加されるものを全てstringにするする必要がある。
    // age: number; // これもエラー
    // age: string; // これはセーフ

}

const designer: Designer = {
    name: 'mabupro',
    // role: 'web'　などで追加はできないが①を追加することで↓
    role: 'web',
    ranran: 'ranran'
}
designer.ranran = 'faogao';
console.log(designer.fafa); // 適当に付けた名前でもエラーがでない

// ----------------------------------------------------

// 関数のオーバーロード
// 関数の戻り値を正しく伝える

function toUpperCase2(x2: string): string;  // 関数の上に戻り値の型を宣言する
function toUpperCase2(x2: number): number;
function toUpperCase2(x2: string | number): string | number {    // オーバーロードするとここの条件は無視される
    if (typeof x2 === 'string') {
        return x2.toUpperCase();
    }
    return x2;
}
// const upperHello = toUpperCase2('hello') as string;
// これも選択肢になるが、ほかの場所でもこの関数を使う時は良くないし、大変
// そもそもstringが入ったらstringが出ることが分かっている。
const upperHello = toUpperCase2('hello');

// ----------------------------------------------------

// オプショナルチューニング

interface DownloadedData {
    id: number;
    user?: {
        name?: {
            first: string;
            last: string;
        }
    }
}

const downloadedData: DownloadedData = {
    id: 1
}
// console.log(downloadedData.user); // undefiendedかもしれない
// 今まででは、if文や『!』アサーションオペレーターをつけて解決したが、
// 今回は、
console.log(downloadedData.user?.name?.first);

// ----------------------------------------------------

// Nullish Coalescing(ナレッシュコアレイシング)『??』

const userData = downloadedData.user ?? 'no-user'
// downloadedDataがnull,undefiendedだったら => 'no-user'

// 0や空文字も含むようにするなら
const userData2 = downloadedData.user || 'no-user'

// ----------------------------------------------------

// lookup型

type id = DownloadedData["id"];
// type user = DownloadedData["user"]["name"];
// type idUser = DownloadedData["id" | "user"];

// ----------------------------------------------------

// 型の互換性

let target: string = 'hello'
let source: 'hello' = 'hello'
target = source
// source = target // targetの中身が変わる可能性があるから

enum Color {
    RED,
    BLUE
}
let target1 = Color.RED
let source1 = 100
target1 = source1   // number型にカラー型に入れれる。
source1 = target1
// enum型とnumber型は互換性がある。

let target2 = function (a: string, b: string) { }
let source2 = function (a: string) { }
target2 = source2
// source2 = target2   // source2の要素に比べてtarget2の要素の引数は多いので、受付できないよね

class AdvancedPerson {
    name: string = 'Peter';
    private age: number = 20;   // privateを付けた時点で使えなくなる。
}
class AdvancedCar {
    name: string = 'Benz';
    private age: number = 4;
}
let target3 = new AdvancedPerson();
let source3 = new AdvancedCar();
// target3 = source3; // privateは同じクラスのインスタンスでなければいけない
// source3 = target3; 

// ----------------------------------------------------

// 関数のオーバーロード

interface TmpFunc {
    (x: string): number;
    (x: number): number;
}
// 引数は、interfaceで宣言した、型の全てを満たさなければならない
const upperHello4: TmpFunc = function (x: string | number) {
    return 0;
}

// ----------------------------------------------------

// 関数型のインターセクション

interface FuncA {
    (a: number, b: string): number;
    (a: string, b: number): number;
}
interface FuncB {
    (a: string): number;
}
let intersectionFunc: FuncA & FuncB; // 読み込まれる順番は左から右
intersectionFunc = function (a: number | string, b?: number | string) {
    return 0;
};

// ----------------------------------------------------

// 関数型のユニオン型によるインターセクション

interface FuncC {
    (a: number): number;
}
interface FuncD {
    (a: string): number;
}
let unionFunc: FuncC | FuncD;   // パラメーターはインターセクションで戻り値はユニオン型になる
// unionFunc(21);

// ----------------------------------------------------

// レストパラメーターに配列やタプルをいれる

// レストパラメーターにタプルも入れれる
// function advancedFn(...args: [number,string,boolean])
// function advancedFn(...args: [number,string,boolean?])F
// あってもなくもよい状態ににできる
function advancedFn(...args: number[]) {

}
// advancedFn(21,'nana',true);
advancedFn(0, 3, 3, 3, 3);

// タプル型だけ配列を後ろに入れれる
// booleanが存在しないと、配列は入れれない
function advancedFn2(...args: [number, string, boolean?, ...number[]]) {

}
advancedFn2(21, 'nana', true, 3, 3, 3, 3);

// ----------------------------------------------------

// 配列やタプルにもreadonlyを付けられる

function advancedFn3(...args: readonly number[]) {
    // args.push(); // 出来なくなる
}
advancedFn3(0, 2);

// ----------------------------------------------------

// constアサーション

let milk = 'milk' as const;
let drink = milk; // drinkにホバーするとdrinkがmilkになる

const array = [10, 20]   // number型
const array2 = [10, 20] as const; // readonlyでタプル型になる
const peter = {
    name: 'peter',
    age: 21
} as const

// ----------------------------------------------------

// 型の中でtypeofを使う
type PeterType = typeof peter; // これをするだけで、peterの型が適用される



