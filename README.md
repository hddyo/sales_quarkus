# sales_quarkus

sales_quarkus はSPAアプリケーション開発の理解を目的としたリファレンス的なアプリケーションです。
販売管理のサンプル機能がquarkusとreactで構成されています。


## 機能構成

| 機能 | 内容 |
|------|------|
|ログイン|データベースに対して、ユーザ認証を行う|
|メニュー|販売管理の機能一覧を表示する|
|見積登録|販売管理の見積登録を行う|
|見積検索|販売管理の見積検索を行う|

## 画面構成

### ログイン
### メニュー

###  見積登録
###  見積検索


# アプリケーションアーキテクチャ

SPAアプリケーション開発の理解を目的とするため、バックエンドのAPサーバにて、フロントエンド
を組み込んで実行しています。
（maven ビルド時に npm を用いて、フロントエンドのビルドを実行し、静的コンテンツとして配置）

## フロントエンド
| ライブラリ | 用途 |
|------|------|
|JavaScript|言語|
|React（18.2.0）|フロントエンドライブラリ|
|CRA|ビルドシステム|
|MUI（v5）|UIライブラリ|
|AXIOS（1.3.4）|HTTP通信|
|REACT ROUTER （6.9.0）|画面遷移|

## バックエンド
| 機能 | 内容 |
|------|------|
|Java17|言語|
|maven|ビルドシステム|
|Quarkus（2.16.4.Final）|サーバサイドフレームワーク| 
|quarkus-resteasy-reactive|RESTサービス|
|quarkus-resteasy-reactive-jsonb|RESTバインディング|
|quarkus-arc|DI管理|
|quarkus-agroal|データソース|
|quarkus-jdbc-postgresql|postgres 接続用JDBC|
|quarkus-hibernate-orm-panache|ORM|
|quarkus-mybatis|SQL mapping|

## DB
Postgres
