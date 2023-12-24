"use strict";
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
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
