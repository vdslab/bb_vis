# bb_vis

# 概要

**bb_vis** は、MLB（メジャーリーグ）の試合データを用いて、試合中の「盛り上がり」を可視化するアプリケーションです。

## ブランチワーク

### 開発時の機能追加

- メインブランチ: develop

- 機能バグ起票時: issue を立てる

  - xxxxxxxxxxxxx #17 という風に #num と出るので、num を以後使用する

- 機能追加開発時: develop ブランチから feat/num_xxx_xxx_xxx... (例: feat/17_xxx_xxx_xxx...)ブランチを作成して、develop ブランチにマージリクエストする

- コミット時:

  - 機能追加時: commit -m "#num feat: xxxxxxxxxxxxx" (例: #17 feat: xxxxxxxxxxxxx)
  - バグ改修時: commit -m "#num fix: xxxxxxxxxxxxx" (例: #17 fix: xxxxxxxxxxxxx)

- マージリクエスト（プルリク）を develop ブランチに提出

## 起動

## 起動の仕方

- 前提条件
  - Node.js (推奨: v18 以上)
  - npm または yarn

## 起動手順

モックサーバー若しくはバックエンドサーバーを立ち上げて開発を行う

- モックサーバー開発

  - フロントエンド下の `.env.development.local` の ポート番号を 4041 に変更

  - フロントエンドディレクトリへ移動

  - `cd frontend`

  - モックサーバー起動

  - `npm run mock-server`

- バックエンド開発　: 現在はsupabase接続(7/31時点)

  - プロジェクトルートへ移動

  - バックエンドサーバー起動

  - `npm run dev`

- フロントエンドサーバー起動

  - `cd frontend`

  - `npm run dev`
