# Introduction

This is a project to build the React frontend for a laptop-selling website, along with a simple Node.js server that connects to a PostgreSQL database.

The instructions in this README.md file have a Japanese section below. Please scroll down if needed.
(このREADME.mdファイルの説明には下に日本語のセクションがあります。必要な場合はスクロールしてください。)

## How to download and run it locally

Ensure that your computer has Node.js installed.

After cloning this repository to your computer, navigate to the cloned directory and type:

`npm install`

`npm start`

After ensuring that the website is running on localhost:3000, open another terminal and navigate to the server directory, and type:

`node server.js`

### Note

The website in the Vercel link provided in the About section above does not have a login functionality because this feature uses the Auth0 application, and the login link is configured for localhost:3000. To make changes, after running the source code on your machine, visit the Auth0 dashboard to reconfigure.

Detailed instructions can be found at: https://auth0.com/blog/complete-guide-to-react-user-authentication/

## ローカルにダウンロードして実行する方法

Node.jsがコンピュータにインストールされていることを確認してください。

このリポジトリをコンピュータにクローンした後、クローンしたディレクトリに移動して次のコマンドを入力してください：

`npm install`

`npm start`

localhost:3000でウェブサイトが実行されていることを確認したら、別のターミナルを開いてサーバーディレクトリに移動し、次のコマンドを入力してください：

`node server.js`

## 注意

上記のAboutセクションで提供されたVercelリンクのウェブサイトには、この機能がAuth0アプリケーションを使用しており、ログインリンクがlocalhost:3000に設定されているため、ログイン機能はありません。変更を加えるには、ソースコードを自分のマシンで実行した後、Auth0ダッシュボードを訪れて再構成してください。

詳しい手順はこちらで確認できます: https://auth0.com/blog/complete-guide-to-react-user-authentication/
