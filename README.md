# Weather App（React版）

React を使用して作成した天気予報アプリです。  
OpenWeather API を利用して現在の天気情報を取得し、検索履歴機能や現在地取得機能を実装しています。

---

## プロジェクト概要

本アプリケーションは React + Vite を使用した天気予報アプリです。

JavaScript版で実装した天気予報アプリを、保守性・拡張性向上を目的として React + Vite で再構築しました。

コンポーネント分割や状態管理、カスタムフックを利用し、機能追加や再利用しやすい構成を意識しています。

---

## アプリ画面

### PC表示

![PC表示](images/pc.png)

### モバイル表示

![モバイル表示](images/mobile.png)

---

## 主な機能

- 都市名検索
- 現在地の天気取得
- 天気アイコン表示
- 気温表示
- 湿度表示
- 風速表示
- 検索履歴表示
- 履歴クリックによる再検索
- 天候による背景色変更
- レスポンシブ対応

---

## 使用技術

- React
- Vite
- JavaScript
- CSS
- LocalStorage
- OpenWeather API

---

## 技術選定理由

### React

コンポーネント分割や状態管理の学習を目的として採用しました。

### Vite

高速な開発環境構築およびビルド環境として採用しました。

### OpenWeather API

外部APIを利用したデータ取得および非同期処理の学習を目的として採用しました。

---

## セットアップ方法

### リポジトリをクローン

```bash
git clone https://github.com/shimodum/react-weather-app.git
```

### プロジェクトへ移動

```bash
cd react-weather-app
```

### パッケージインストール

```bash
npm install
```

### 開発サーバ起動

```bash
npm run dev
```

### ブラウザアクセス

以下URLへアクセスしてください。

```txt
http://localhost:5173
```

---

## API設定

本アプリケーションでは OpenWeather API を使用しています。

OpenWeather API：

https://openweathermap.org/api

APIキー取得後、`src/api/config.js` を作成し、以下を設定してください。

例：

```javascript
export const API_KEY = "YOUR_API_KEY";
```

`config.js` は Git 管理対象外になっています。

代わりにサンプルファイルを用意しています。

```txt
src/api/config.example.js
```

以下コマンドでコピーしてください。

```bash
cp src/api/config.example.js src/api/config.js
```

※ weatherApi.js から config.js を読み込む実装のため、この名前で作成してください。

※ APIキーは公開リポジトリへアップロードしないよう注意してください。

---

## ディレクトリ構成

```txt
react-weather-app
├── public
│
├── src
│   ├── api
│   │   ├── cityMap.js
│   │   ├── config.example.js
│   │   └── weatherApi.js
│   │
│   ├── components
│   │   ├── HistoryList.jsx
│   │   ├── SearchForm.jsx
│   │   └── WeatherCard.jsx
│   │
│   ├── hooks
│   │   ├── useHistory.js
│   │   └── useWeather.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── images
│   ├── pc.png
│   └── mobile.png
│
├── package.json
├── vite.config.js
└── README.md
```

※ 処理の中心となる主要ファイルのみ記載しています。

---

## 工夫した点

### UI統一

JavaScript版とReact版でデザイン・レイアウトを統一し、同じ操作感になるよう調整しました。

### コンポーネント分割

検索フォーム・天気表示・履歴表示をコンポーネント分割し、保守性を向上させました。

### カスタムフック利用

天気取得処理と履歴処理をカスタムフックへ分離し、ロジックを再利用可能にしました。

### ユーザー操作制御

読み込み中は入力欄やボタンを無効化し、連続クリックや重複リクエストを防止しました。

### APIキー管理

APIキーを別ファイルで管理し、Git管理対象から除外しました。

---

## 動作確認項目

以下項目について動作確認を実施しています。

### 都市検索

- Tokyo と入力して天気情報が表示される
- 東京 と入力して天気情報が表示される
- 存在しない都市名入力時にエラーメッセージが表示される
- 空入力時に検索されない

### 現在地取得

- 現在地ボタン押下で現在位置の天気が表示される
- 位置情報拒否時にエラーメッセージが表示される

### 検索履歴

- 検索した都市が履歴に追加される
- 同一都市検索時に重複登録されない
- 最新検索が先頭に表示される
- ページ再読み込み後も履歴が保持される
- 履歴クリックで再検索できる

### UI

- PC表示でレイアウトが崩れない
- タブレット表示でレイアウトが崩れない
- スマートフォン表示でレイアウトが崩れない
- 天候に応じて背景色が変更される（晴れ・曇り・雨・雪に対応）
- 読み込み中メッセージが表示される
- 読み込み中は検索ボタン・現在地取得ボタン・入力欄が無効化される

---

## 学習ポイント

本アプリ制作を通じて以下を学習しました。

- Reactコンポーネント設計
- useState / useEffect
- カスタムフック作成
- OpenWeather APIとの連携
- LocalStorage利用
- レスポンシブデザイン

---

## 今後の改善点

- 5日間天気予報の追加
- ローディングアニメーション追加
- お気に入り都市登録機能
- 地図連携
- TypeScript化
- エラーハンドリング強化

---

## 補足

OpenWeather API の仕様により、入力した都市名と表示される都市名が異なる場合があります。

例：

- 東京 → 東京都
- 大阪 → 大阪市
- Kyoto → 京都市

本アプリでは API のレスポンス結果をそのまま表示しているため、地域名の表記が統一されない場合があります。

また、現在地取得ではブラウザ位置情報と OpenWeather API を利用しているため、実際の現在地と完全一致しない場合があります。
