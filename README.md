# 生活科技小百科

整理一些平常會碰到的科技問題，像wifi usb-c vpn之類的。
網站用HTML、CSS、javsscript，沒有後端。目前放6篇文章。

## 怎麼開

直接開 `index.html` 就好。

## 檔案

- `index.html`：首頁
- `article.html`：文章頁共用版型
- `about.html`：網站介紹
- `data/articles.js`：文章內容
- `js/site.js`：搜尋、分類、文章顯示
- `css/style.css`：樣式
- `AGENTS.md`：給 AI 看的規則

## 加文章

先讀 `AGENTS.md`，再去 `data/articles.js` 照原本格式加一筆。
不用多做一個 HTML，首頁會自己顯示新文章。

有裝 Node.js 的話可以跑 `node tests/validate.js` 檢查格式。

## GitHub

專案：https://github.com/M11507428/tech-notes-site

網頁：
https://m11507428.github.io/tech-notes-site/
