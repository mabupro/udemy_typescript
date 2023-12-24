// let hasValue_0: boolean = true;
// // hasValue = '20'; error　
// let hasValue_1 = true; // 型推論でも自動で判断してくれる

// let count: number = 10;
// let float: number = 3.14;
// let negative: number = -0.11;

// let single: string = 'らりらりら';
// let double: string = "れられられ";
// let back: string = `ろれろれろ`;

// let hello; // any型にしてしまうと何でも入る（この場合は初期で代入してないため）
// hello = 2;
// hello = 'hello';

// // -----------------------------------------------------------------------------

// const person: {
//     name: string;
//     age: number;
// } = {
//     name: 'Jack',
//     age: 20
// }
// // console.log(person.gender); error　オブジェクトにない時は出る

// const person_1 = {
//     name: {
//         first: 'Jack',
//         last: 'hummer'
//     },
//     age: 21
// }
// // 型推論でネストしても自動的に割り当てられる

// // ---------------------------------------------------------------------------

// const fruits: string[] = ['Apple', 'Banana', 'Grape']
// const fruits_1: any = ['Apple', 'Banana', 'Grape'] // any型で
// const fruits_2 = ['Apple', 'Banana', 'Grape'] // 型推論で

// // const fruits: string[] = ['Apple', 'Banana', 'Grape',1] error
// // fruits.push(21); error
// const fruit = fruits[0];
// // fruit.forEach(element => {}); error　ないものはerrorがでる

// // ----------------------------------------------------------------------------

// const books: [string, number, boolean] = ['business', 1500, false];
// // この型で固定したい（タプルは配列の中に書く）厳しく制限つけたいとき

// // const books: [string, number, boolean] = ['business', true, false]; error
// // books[1] = 'hello'　error

// books.push(21); // なぜerrorがでない？　Typescriptは最初の宣言は厳しいけど、他は緩い　↓↓↓
// // console.log(book[3]); error　ない要素にアクセスした場合はerrorがでる　=>　上でpushしたことも結果的にアクセスする時はerrorがでる

// // ---------------------------------------------------------------

// // const  CoffeeSize = {
// //     SHORT: 'SHORT',
// //     TALL: 'TALL',
// //     GRANDE: 'GRANDE',
// //     VENTI: 'VENTI'
// // }


// // const coffee = {
// //     hot: true,
// //     size: CoffeeSize.TALL // このオブジェクトの宣言では他の値に書き換えられてしまう。
// //     size; CoffeeSize.amamama
// // }

// enum CoffeeSize {   // enumはパスカルケースが多い
//     SHORT = 'SHORT',
//     TALL = 'TALL',
//     GRANDE = 'GRANDE',
//     VENTI = 'VENTI'
// }

// // enum CoffeeSize {
// //     SHORT,
// //     TALL = 100, こうすると'GRAND'の数字は101になる
// //     GRANDE,
// //     VENTI
// // }
// // 文字列の指定をなくすと数字で管理するようになる（この場合は0~3）

// const coffee = {
//     hot: true,
//     size: CoffeeSize.TALL // 列挙型になった
// }
// // coffee.size = 'small' error
// // coffee.size = 'SHORT' error これもerrorになる
// coffee.size = CoffeeSize.SHORT; // 特定のグルーブ（今回はCoffeSize）だけを選択できるようにする。
// console.log(CoffeeSize.SHORT);

// // ------------------------------------------------------------------------

// // any型は何でも入れれる
// // もちろんオブジェクトも勝手に追加できている
// let anything: any = true;
// anything = 'hello';
// anything = ['hello', 33, true];
// anything = {};
// anything.gdajkldos = 'fajskaj';

// // 型の中身を自由にするなら
// let anything2: any[] = [true, 'fjida', 13];

// // anyが付いたらTypeScriptは干渉しない -> JavaSccriptに戻る
// let banana = 'banana';
// banana = anything;

// ------------------------------------------------------------------------

// 数字、文字列を入れたい時に、使う
// let unionType: number | string = 10;
// // unionType.toUpperCase(); ここでは文字列が入ってないのでエラー
// unionType = 'hello'
// unionType.toUpperCase(); // ここではできる

// //　配列にいれるなら
// let unionTypes: (number | string)[] = []

// // ------------------------------------------------------------------------

// //　リテラル型は'apple'で指定したものしかだめ
// // const apple: 'apple' = 'hello'　//　これはだめ
// const apple: 'apple' = 'apple'

// const zero: 0 = 0;
// const apple: true = true;

// constにする理由は、型推論でリテラルになる
// letにすると、stringになる

// enum型でやったものと、ユニオンとリテラルを混ぜることできる
// ユニオン型リテラル型レコード
// let clothSize: 'small' | 'medium' | 'large' = 'small';
// // const cloth = {
// //     color: 'white',
// //     size: clothSize
// // }
// // cloth.size = 'large' これはsmallと宣言しているので無理

// // なので

// const cloth: {
//     color: string;
//     size: 'small' | 'medium' | 'large'
// } = {
//     color: 'white',
//     size: 'medium'
// }

// こうすると、プロパティとして宣言できる。
// enum型は、プロパティ数が3つ以上の時に使うべし

// ------------------------------------------------------------------------

//　タイプエイリアス

// type ClothSize = 'small' | 'medium' | 'large'

// let clothSize: ClothSize = 'large';

// 先に宣言しておくと簡単

// ------------------------------------------------------------------------

// 引数の（）の後ろに戻り値の型宣言
// しかし、引数には型はつかないが、戻り値は型推論でも大丈夫
// もし引数の型宣言をしないと、any型になってしまう
// function add(num1: number, num2: number): number {
//     return num1 + num2
//     // return を例えば 'hello'とすると戻り値はstring型になっている
//     // return 'hello'
// }

// // add('hello', 2); これは型宣言しているのでエラー
// add(2,2);

// ------------------------------------------------------------------------

// 何も返さない場合はvoid型　
// function sayHello(): void {
//     console.log('Hello');
// }

// // 何もかえってないのか確認してみると
// console.log(sayHello());
// // undefindが帰ってきている
// // しかし、関数の型をundefined型にすることは
// // TypeScriptが許していないので、できない

// // だが、return文を入れればundefined型を使うことができる
// // それは、returnする時にundefined型を返すことを明示できるから
// // だがvoidも使えるので必要ない

// ------------------------------------------------------------------------

// function add(num1: number, num2: number): number {
//     return num1 + num2
// }

// // 関数の型注釈について
// // 型推論を見てみると【=>】が付いているのがわかる
// // 【:】でなく【=>】
// const anotherAdd: (n1: number, n2: number) => number = add;

// // 無名関数にすることもできるこの場合は
// // 型推論は型注釈でも元の関数の型情報を消しても、
// // どっちかが残っていればよい

// const anotherAdd2: (n1: number, n2: number) => number = function (num1, num2) {
//     return num1 + num2
// };

// const anotherAdd3 = function (num1: number, num2: number): number {
//     return num1 + num2
// };

// // アロー関数の場合は？
// const doubleNumber = (number: number): number => number * 2;
// // パラメーターが１つなのに（）つけるのがダサいと思うときは
// // 型注釈で
// const doubleNumber2: (number: number) => number = num => num * 2;

// ------------------------------------------------------------------------

// callbackに型をつける
// cb(callback)の戻り値の型推論を【void】にすると
// const doubleNumの型がvoid型になる
// そのためdoubleNumに例えば【doubleNum.~~】としてプロパティを
// 実行することができない
// function doubleAndHandle(num: number, cb: (num: number) => number): void {
//     const doubleNum = cb(num * 2);
//     // if (doubleNum) {} // void型にすると真偽値として扱えない
//     console.log(doubleNum);
// }
// doubleAndHandle(21, doubleNum => {
//     return doubleNum
// });

// // ------------------------------------------------------------------------

// // unknown型とは
// let unknownInput :unknown;
// let anyInput: any;
// let text: string;
// unknownInput = 'hello';
// unknownInput = 21;
// unknownInput = true;

// text = unknownInput; //これではエラーになる

// Tips:全選択はF2で（）
// Tips:置き換えたいときはalt + Left Click

// anyInput = 'hello';
// anyInput = 21;
// anyInput = true;

// text = anyInput;
// // anyでは入れることができる

// // unknownInputでもJavaScriptの機能である
// // if文でtypeofでunknownInputを確認すればできる
// if(typeof unknownInput === 'string'){
//     text = unknownInput;
// }

// ------------------------------------------------------------------------

// errorを返す関数を作る
// function error(message: string){
//     throw new Error(message);
// }
// //これは何の型を返すのか
// console.log(error('This is an error')); //こうすると何も返っていない

// never型をつけて
// 何も返さないことを明示的にする(undefinedすら返さない)

function error(message: string): never{
    throw new Error(message);
    // while(true){

    // }
}
// 無限ループやthrowなど、処理が終わらない時にnever型を使うことができる
console.log(error('This is an error')); 


