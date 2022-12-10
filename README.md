# Qiita_API
## 使い方
### qiitaAPIkeyの取得
  - [このサイトを参考に](https://qiita.com/koki_develop/items/57f86a1abc332ed2185d)
  - 取得したkey をHeaders: { Authorization: "Bearer " }にはりつける、codeのコメントアウトみてください
  - firebaseは自分で作成して追加してください、APIkeyとコレクション名、ドキュメント名を変更すればそのまま使えます
  - qiita.htmlを開けば検索するところがでます
  - いじるのはqiita.js ---- 22行目、50行目、105行目 
  - qiita_list.js ---- 24行目
  いじょう！！

## 紹介と使い方
  - qiita_APIを使用して、タイトルに検索ワードが入っているものを抽出して、いいねとストック数を表示する  
  また、そのサイトのurlをQR_APIにかけてQRコードを生成する

## 工夫した点
  - qiita_APIのクエリに変数を入れることで、画面上で検索したいことを決めることができる
  - QRコードAPIの生かし方
  - qiitaの記事の自動取得

## 苦戦した点
  - リクエストの書き方がよくわかってない
  - 効果的なAPIを見つけることができなかった

## 参考にした web サイトなど
- [QR code](https://goqr.me/api/doc/create-qr-code/#general)
- [Qiita API v2の仕様](https://qiita.com/api/v2/docs#%E6%A6%82%E8%A6%81)
- [node.js+Qiita APIでQiita記事の検索を効率化する](https://www.granvalley.co.jp/blog/search-for-qiita-articles)
- [検索時に利用できるオプション](https://help.qiita.com/ja/articles/qiita-search-options)
- [無料APIとjQueryで海外サッカーの試合日程・順位表を自動取得する方法](https://footballtickets-by-gakuseimiler.com/entry/football-data-api)


## イメージ図
- qiitaで検索したいワードをinputの中に記入し、検索ボタンを押すと記事が表示される
- qiitaで検索したいタグOR本文に含んでいる文字の記事を取得して、いいねの数が多いものを順に表示する
- 一旦記事全体を取得して、いいねの数順で並べるほうが良さそう  
クエリにlike_countを入れると動かないこともある

## 作業項目
- qiita公式からアクセストークンを取得する（アカウントがあればすぐできた）
- curlで通信ができるか確認する（ターミナル上）
- 通信でき、レスポンスを表示できたらjqueryの書き方に合わせて書いてみる
- コンソールログでレスポンスされたものを確認して、取得したいものを一旦表示してみる
- クエリに変数を入れれる様にする、クエリでは検索条件（何ページ、キーワードはなどを設定できる）
- 変数にはinputで入力した文字（検索したいこと）を代入する
- 入力された文字でデータが取得されたか確認する
- レスポンスの形が配列の中にオブジェクトであるため、for文を使って配列の中身（オブジェクト）を取得する
- コンソールを確認して、引き抜きたいものに合わせて記述する
- htmlに表示するようにする
- いいねの数でソートして表示を変化させる
- 変わった使い方ができないから、取得したurlをQRコードに変換する
- いいねとストックの使い方がいまいちぴんとこないから、いいねのかずに応じて、QRの大きさを変化させる  
正方形でないといけないところが難点
- 検索にあてはまらないときは、空の配列がかえってくるからifで空の配列が来たときの処理を書く
- いいね数が閾値を超えたらfirebaseに保存して、一覧ページで表示する


## 必要部品
- 検索input
- 検索ボタン
- 一覧表示するところ

## 試したこと
- サッカーの試合情報を取得できるAPIがあったので試しにしてみた
- 通信できたことを確認できたため、コードの書き方を真似してみる
- curlで通信を学ぶ

## 検討したこと
- 手書きOCRAPI
- ヒートマップAPI
- スポーツ情報API
- 候補１ サッカーの試合情報API
- 採用 qiitaのAPIをさわってみる


## git addする前に消すもの
- qiita_list.jsのfirebaseAPIきー
- qiita.jsのfirebaseAPIキー、qiitaAPIきー