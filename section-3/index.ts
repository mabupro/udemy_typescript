// tsc index.ts -w と実行すると常時確認する

// [17:27:01] Starting compilation in watch mode...
// [17:27:02] Found 0 errors. Watching for file changes.

// となる。自動的にTypeScriptからJavaScriptに変換することができる
// しかし、エラーが出ていても、index.jsではコンパイルされる。

// Ctrl + Cで止めることができる

// ------------------------------------------------------------------------

// 一気に全てのtsファイルをコンパイルする方法について

// tsc comiler.ts index.ts とすることによって同時にjsに変換できる
// しかし沢山増えると大変なので

// ts.config.jsonを作成する
// tsc --init

// これをすると
// tsc だけで全てのts.config.jsonがあるファイルの配下は自動的に
// jsへとコンパイルされる

// ちなみに
// tsc -w　でwatchモードにもできる

// let num: number = 0;

// Tips: tsc index.ts とターミナルで実行すると
// ts.config.jsonの内容は適用されない

// ver:tsc          let num = 0;
// ver:tsc index.ts var num = 0;

// となる

// ------------------------------------------------------------------------

// ts.config.jsonにも設定を追加することができる
// 今回は、デフォルトの設定の下に、コンパイルされるファイルを選択
// するようにする

// "exclude": [
//     "compiler.ts"
//   ]

// index.tsしかコンパイラされなくなった

// ワイルドカードも使える
// "*.spec.ts"と書くことで、.spec.tsとつくものを全てのはじく

// excludeはルートだけなので
// "tmp/compiler.ts"と書く必要があるが
// どのファイルのcompiler.tsもコンパイルしたくないときは
// "**/compiler.ts"と書く

// WARN:
// excludeを使ったときはnode_modulesも入れる
// "exclude": [
//     "**/compiler.ts",
//     "*.spec.ts",
//     "node_modules"
//   ]
// 上書きされるから

// includeもある　これは、この中身をコンパイルする
// "include": [
//     "index.ts"
//   ],
//   "exclude": [
//     "*.spec.ts",
//     "node_modules"
//   ]

// この場合は、【include - exclude】されたものしかコンパイルされない

// files
// 絶対Pathで設定しなければならない

// "files":[
//     "tmp/compiler.ts"
//   ]

// filesは、excludeで設定されていても実行することができる
// なので【include - exclude + files】で設定した内容がコンパイルされる

// ------------------------------------------------------------------------

// compilerOptions

// "target": "es2015",
// コンパイルするバージョンを決めることができる
// 何も設定しないとes3でコンパイルされる

// しかし現在のブラウザはes5 or es6まで対応してるのが殆ど
// なので今回は、es6（動画内）es2015（正式リリース後の名前）になる
// 私は、時間が経ってes2015で実行中

// ------------------------------------------------------------------------

// compilerOptions

// "lib": [],
// TypeScriptがコンパイルするときに、この中に書いてあることを
// 考慮してくれるようになる

// なぜ
// let hello = 'hello';
// console.log(hello.toUpperCase());

// toUpperCase()が使えると判断しているのか？
// -> compiler.tsのtoUpperCaseをctrl + Left Click

// lib.es5.d.tsというファイルに設定が書かれている
/** Converts all the alphabetic characters in a string to uppercase. */
// toUpperCase(): string;


// ts.config.json で
// "lib": [],
// をコメントインすると、ライブラリが設定されていないので
// compiler.tsでconsoleやtoUpperCaseなんてないとエラーがでる

// "lib": [
//     "ES2015",
//   ],

// こうするとtoUpperCaseのエラーが消える

// "lib": [
//     "ES2015",
//     "DOM"
//   ],   

// これでconsoleのエラーも消える

// "lib": [],
// がコメントアウトされているときは、自動的に対応するので
// 基本的にはコメントアウトしておく

// ------------------------------------------------------------------------

// "allowJs": true,

// JavaScriptで書かれたものもコンパイルする
// しかし、ファイル名が被ってしまうと上書きされてしまうので
// 後述するoutDirなどを使ってコンパイル先を変更する

// "checkJs": true, 

// allowJsと一緒に使う必要がある
// JavaScriptのエラーも発見してくれる
// 例えば数字にtoUpperCaseをしたらエラーになるなども
// チェックしてくれる

// "declaration": true, 
// "declarationMap": true,  

// 自作のライブラリなどを配置することができる
// TsはコンパイルしたらJsになってしまうので
// 型定義が消えてしまうが
// .d.tsに型を登録しておくことで、ほかの人が使うときに
// やりやすい

// ------------------------------------------------------------------------

// "sourceMap": true, 

// ブラウザはTsを理解することができない
// しかし、ブラウザにTsを理解させるためのもの
// ブラウザの開発者モードのソースファイルで表示できる

// コメントインすると
// compiler.js.map ができる
// {"version":3,"file":"compiler.js","sourceRoot":"","sources":["compiler.ts"],"names":[],"mappings":";AAAA,wBAAwB;AAExB,IAAI,KAAK,GAAG,OAAO,CAAC;AACpB,OAAO,CAAC,GAAG,CAAC,KAAK,CAAC,WAAW,EAAE,CAAC,CAAC"}
// これを作ると、JavaScript -> TypeScriptを作ることができる

// ------------------------------------------------------------------------

// "outDir": "./",  

// コンパイルした時のJsの生成ファイル先を決めることができる
// 例えば
// "outDir": "./dist", 
// とすると

// distフォルダにJavaScriptが一番効率よく配置されている。
// フォルダが階層になっていても
// ほかの位置にTypeScriptファイルがなければ
// distの中身はTSファイルだけになる

// "rootDir": "./", 

// これをコメントインするとフォルダ構造をこのまま
// 移動することができる

// しかし、
// "rootDir": "./tmp", 
// のように実行すると、TypeScriptファイルを逃しているとエラーが出る

// "removeComments": true,  

// これをコメントインすると、
// コメント文をコンパイルしたときに消すことができる

// "noEmit": true,  

// これは、JavaScriptを出力せず、TypeScriptのエラーをチェック

// "downlevelIteration": true,   

// これはes5,es6などにfor-ofなどを使ったときに
// エラーになる可能性を排除する
// 出力するコードが多くなってしまう可能性

// ------------------------------------------------------------------------

// "noEmitOnError": true,  

// エラーが起きたら、Emit（TypeScript => JavaScript）しない

// ------------------------------------------------------------------------

// "strict": true

// これをTrueにすると
/* Type Checking */
//"strict": true /* Enable all strict type-checking options. */,
// "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
// "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
// "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
// "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
// "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
// "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
// "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
// "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
// "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
// "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
// "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
// "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
// "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
// "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
// "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
// "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
// "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
// "allowUnreachableCode": true,

// これらの項目の設定がTrueになる


// "noImplicitAny": true,  

// 暗黙的なany型をエラーとする
// 例
// function echo(message){
//     return message;
// }

// 明示的ならOK だが使わないほうがいい
// function echo(message: any){
//     return message;
// }

// function echo(message: string){
//     return message;
// }

// 変数は、暗黙的なany型を通す。
// let implicitAny;
// implicitAny = 'implicitAny';
// implicitAny.toUpperCase();


// "strictNullChecks": true, 

// //例
// let nullableMessage: string = null;
// let undefinedableMessage: string = undefined;
// let onlyNull: null = undefined;
// let onlyUndefiend: undefined = null;

// // trueにするとこれらはエラーがでる
// // 解決するためにはユニオン型を設定する必要がある
// // さらに型にも合わせる必要がある null は null

// let nullableMessage: string | null = null;
// let undefinedableMessage: string | undefined = undefined;
// let onlyNull: null = null;
// let onlyUndefiend: undefined = undefined;

// 更に

// function echo(message: string): string | null {
//     return message;
// }

// let nullableMessage = echo('hi');
// // nullableMessage.toUpperCase(); string型と判断されないので
// // toUpperCaseが使えない
// // 解決方法として
// if(nullableMessage){
//     nullableMessage.toUpperCase();
// }
// // null出ないときは、値があるのでstringだけしか残らない
// // 型推論もnullになっていることが確認できる


// "strictFunctionTypes": true,

// クラスの継承時に起こるバグを防ぐ


// "strictBindCallApply": true, 

//例

// function echo(message: string): string | null {
//     return message;
// }

// echo.call(null,'hi',2323);
// // 呼び出している引数の数を合わせたり
// // 第一引数で、thisなどを用いて、オブジェクトを選択出来たりする

// echo.apply(null,['hi'])
// // applyは引数の取り方が配列になる

// const newFunction = echo.bind(null,'hi');
// // など新しい関数を作る


// "noImplicitThis": true,

// 暗黙的にthisがanyになる時にエラーをだす


// "alwaysStrict": true,  

// JavaScriptに変換するときに、'use Strict'がつく

// ------------------------------------------------------------------------

// コードの品質を保つ方法

// "noUnusedLocals": true,

// 使ってないローカル変数がある場合はエラーをだす
// 関数内以外で、let などで宣言されているとほかのファイルで
// 使われているかもしれないので、エラーを出さない


// "noUnusedParameters": true,

// 関数で使われていないパラメーター（引数）を使ってないとエラー


// "noImplicitReturns": true,   

// 暗黙的なreturnを許さない

// function echo(message: string) :string | undefined{
//     if(message){
//         return message;
//     }
//     return; //　これを書いていないと、undefiendを返せないので
// }

// これはエラーがでる


// "noFallthroughCasesInSwitch": true,  

// switch文の時のエラーを検出する

// ------------------------------------------------------------------------

// 設定一覧
// https://www.typescriptlang.org/docs/handbook/compiler-options.html
