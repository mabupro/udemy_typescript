var hasValue = true;
// hasValue = '20'; error　
var hasValue_1 = true; // 型推論でも自動で判断してくれる
var count = 10;
var float = 3.14;
var negative = -0.11;
var single = 'らりらりら';
var double = "れられられ";
var back = "\u308D\u308C\u308D\u308C\u308D";
var hello; // any型にしてしまうと何でも入る（この場合は初期で代入してないため）
hello = 2;
hello = 'hello';
var person = {
    name: 'Jack',
    age: 20
};
// console.log(person.gender); error　オブジェクトにない時は出る
var person_1 = {
    name: {
        first: 'Jack',
        last: 'hummer'
    },
    age: 21
};
// 型推論でネストしても自動的に割り当てられる
var fruits = ['Apple', 'Banana', 'Grape'];
var fruits_1 = ['Apple', 'Banana', 'Grape']; // any型で
var fruits_2 = ['Apple', 'Banana', 'Grape']; // 型推論で
// const fruits: string[] = ['Apple', 'Banana', 'Grape',1] error
// fruits.push(21); error
var fruit = fruits[0];
// fruit.forEach(element => {}); error　ないものはerrorがでる
var books = ['business', 1500, false];
// この型で固定したい（タプルは配列の中に書く）厳しく制限つけたいとき
// const books: [string, number, boolean] = ['business', true, false]; error
// books[1] = 'hello'　error
books.push(21); // なぜerrorがでない？　Typescriptは最初の宣言は厳しいけど、他は緩い　↓↓↓
// console.log(book[3]); error　ない要素にアクセスした場合はerrorがでる　=>　上でpushしたことも結果的にアクセスする時はerrorがでる
// const  CoffeeSize = {
//     SHORT: 'SHORT',
//     TALL: 'TALL',
//     GRANDE: 'GRANDE',
//     VENTI: 'VENTI'
// }
// const coffee = {
//     hot: true,
//     size: CoffeeSize.TALL // このオブジェクトの宣言では他の値に書き換えられてしまう。
//     size; CoffeeSize.amamama
// }
var CoffeeSize;
(function (CoffeeSize) {
    CoffeeSize["SHORT"] = "SHORT";
    CoffeeSize["TALL"] = "TALL";
    CoffeeSize["GRANDE"] = "GRANDE";
    CoffeeSize["VENTI"] = "VENTI";
})(CoffeeSize || (CoffeeSize = {}));
var coffee = {
    hot: true,
    size: CoffeeSize.TALL // 列挙型になった
};
// coffee.size = 'small' error
// coffee.size = 'SHORT' error これもerrorになる
coffee.size = CoffeeSize.SHORT; // 特定のグルーブ（今回はCoffeSize）だけを選択できるようにする。
