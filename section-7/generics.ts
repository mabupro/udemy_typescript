// 関数に型を引数として渡す（ジェネリクス）
// Tはtypeを表す。T
// T,T1,T2など増やすこともできる
function copy<T>(value: any): T {
    let user: T;
    return value;
}
console.log(copy<string>('hello'));
// ここで定義したstringがTに入る
console.log(copy({ name: 'mabupro' }));
// 型推論が働く

// --------------------------------------

// 型パラメーターに制約を付ける

function copy1<T extends { name: string }, U extends keyof T>(value: T, key: U): T {
    value[key]
    return value;
}
console.log(copy1({ name: 'mabupro', age: 21 }, 'age')); // 第一引数からextendsしてるので、

// ジェネリクスのextesndsはimplementsに近い
// 範囲を狭める

type K = keyof { name: string; age: number }
// nameとageのunion型になる

// --------------------------------------

// クラスにジェネリクス

class LightDatabase<T extends string | number | boolean>{
    private data: T[] = [];
    add(item: T) {
        this.data.push(item);
    }
    remove(item: T) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    get() {
        return this.data;
    }
}
// ユニオン型で定義すると折角stringに制限したいのに出来なくなる

const stringLightDatabase = new LightDatabase<string>();
stringLightDatabase.add('Apple');
stringLightDatabase.add('Banana');
stringLightDatabase.add('Grape');
stringLightDatabase.remove('Banana');
console.log(stringLightDatabase.get());

// --------------------------------------

// interfaceやtypeにジェネリクス

// interface TmpDatabase<T> {
//     id: number,
//     data: T[];
// }
type TmpDatabase<T> = {
    id: number;
    data: T[];
}
const tmpDatabase: TmpDatabase<number> = {
    id: 3,
    data: [31]
}

// --------------------------------------

// utility type

interface Todo {
    title: string;
    text: string;
}
// typeをホバーで確認してみよう
type Todoable = Partial<Todo>   // Partial はジェネリクス型『?』
type ReadTodo = Readonly<Todo>  // 『readonly』
// 他にもある

// Promiseの型も指定することができる。
const fetchData: Promise<string> = new Promise(resolve => {
    setTimeout(() => {
        resolve('hello');
    }, 3000);
})
fetchData.then(data => {
    data.toUpperCase();
})

// 配列
const vefetables: Array<string> = ['Tomato', 'Broccoli', 'Asparagus'];

// --------------------------------------

// デフォルトの型パラメーターを付ける

// = (any)を付けて、デフォルトの型を付けた
interface ResponseData<T extends { message: string } = any> {
    data: T;
    status: number;
}
let tmp2: ResponseData;

// --------------------------------------

// Mapped Types

interface Vegetables {
    tomato: string;
    pumpkin: string;
}
let tmp3: keyof Vegetables;
type MappedTypes = {
    -readonly [P in keyof Vegetables]-?: string // 文字列型のユニオン型で書く
}
// readonlyやオプショナルもできる
// -を付けることで、readonlyを元々あったものを消すことができる。

// --------------------------------------

// 型のif文 Conditional Type
// tomato型がstring型に代入できるならnumber型、そうでないならbooleanという感じ
type ConditionalTypes = 'tomato' extends string ? number : boolean

// infer 型に当てはまるのなら { tomato: infer R }を { tomato: 'tomato' }から推論する
// Rはtomato型に推論される　'tomato'をstringにするとConditionalInferもstringになる
type ConditionalInfer = { tomato: 'tomato' } extends { tomato: infer R } ? R : boolean;

// 左側ユニオン型の時は、分割して考えられる
// 最初は'tomato'だけで考える
// tomato は tomato型になる     => number
// pumpkinは tomato型になれない => boolean
// この場合は、booleanになってしまう
type DistributiveConditionalTypes = ('tomato' | 'pumpkin') extends 'tomato' ? number : boolean;

// しかしジェネリクスを使えば
type DistributiveConditionalTypes2<T> = T extends 'tomato' ? number : boolean;
let tmp4: DistributiveConditionalTypes2<'tomato' | 'pumpkin'>

// こちらも
// stringはNonNullableにホバーすれば分かるが、nullでもundefiendでもないので
// stringが型になる
// null は　never型になるのが分かる
let tmp5: NonNullable<string | null>
