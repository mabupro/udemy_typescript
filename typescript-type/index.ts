let hasValue: boolean = true;
// hasValue = '20'; error　
let hasValue_1 = true; // 型推論でも自動で判断してくれる

let count: number = 10;
let float: number = 3.14;
let negative: number = -0.11;

let single: string = 'らりらりら';
let double: string = "れられられ";
let back: string = `ろれろれろ`;

let hello; // any型にしてしまうと何でも入る（この場合は初期で代入してないため）
hello = 2;
hello = 'hello';

// -----------------------------------------------------------------------------

const person: {
    name: string;
    age: number;
} = {
    name: 'Jack',
    age: 20
}
// console.log(person.gender); error　オブジェクトにない時は出る

const person_1 = {
    name: {
        first: 'Jack',
        last: 'hummer'
    },
    age: 21
}
// 型推論でネストしても自動的に割り当てられる

// ---------------------------------------------------------------------------

const fruits: string[] = ['Apple', 'Banana', 'Grape']
const fruits_1: any = ['Apple', 'Banana', 'Grape'] // any型で
const fruits_2 = ['Apple', 'Banana', 'Grape'] // 型推論で

// const fruits: string[] = ['Apple', 'Banana', 'Grape',1] error
// fruits.push(21); error
const fruit = fruits[0];
// fruit.forEach(element => {}); error　ないものはerrorがでる

// ----------------------------------------------------------------------------

const books: [string, number, boolean] = ['business', 1500, false];
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

enum CoffeeSize {   // enumはパスカルケースが多い
    SHORT = 'SHORT',
    TALL = 'TALL',
    GRANDE = 'GRANDE',
    VENTI = 'VENTI'
}

// enum CoffeeSize {
//     SHORT,
//     TALL = 100, こうすると'GRAND'の数字は101になる
//     GRANDE,
//     VENTI
// }
// 文字列の指定をなくすと数字で管理するようになる（この場合は0~3）

const coffee = {
    hot: true,
    size: CoffeeSize.TALL // 列挙型になった
}
// coffee.size = 'small' error
// coffee.size = 'SHORT' error これもerrorになる
coffee.size = CoffeeSize.SHORT; // 特定のグルーブ（今回はCoffeSize）だけを選択できるようにする。



