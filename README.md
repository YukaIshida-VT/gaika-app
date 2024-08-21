## データベースのマイグレーション
```
npx prisma migrate dev --name init
```

## フルスタックアプリケーションのフォルダ構成例
my-fullstack-app/
│
├── client/                # React (フロントエンド)
│   ├── public/            # Reactアプリの静的ファイル
│   ├── src/               # Reactのソースコード
│   │   ├── components/    # Reactのコンポーネント
│   │   ├── pages/         # ページコンポーネント
│   │   ├── App.js         # メインコンポーネント
│   │   ├── index.js       # エントリーポイント
│   │   └── ...            # その他のReactファイル
│   ├── .env               # Reactアプリ用の環境変数
│   └── package.json       # Reactアプリの依存関係とスクリプト
│
├── server/                # Node.js (バックエンド)
│   ├── controllers/       # 各種APIのロジック
│   ├── models/            # Prisma ORMやデータベーススキーマ
│   ├── routes/            # APIエンドポイントの定義
│   ├── middlewares/       # 認証などのミドルウェア
│   ├── prisma/            # Prisma用のスキーマ定義
│   │   └── schema.prisma  # Prismaスキーマ
│   ├── app.js             # Expressアプリケーションのエントリーポイント
│   ├── server.js          # サーバー起動用のファイル
│   ├── .env               # サーバー側の環境変数
│   └── package.json       # サーバーの依存関係とスクリプト
│
├── .gitignore             # Gitで無視するファイル
├── README.md              # プロジェクト説明
└── package.json           # 共通の依存関係やスクリプト（必要に応じて）