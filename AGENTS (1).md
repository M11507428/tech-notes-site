# 生活科技小百科

這是整理 Wi-Fi、USB-C、VPN 等生活科技知識的靜態網站。內容用繁體中文、白話文，簡單講重點，不要寫太長。

## 網站規則

只用 HTML、CSS、JavaScript，不用框架或後端，放 GitHub Pages。首頁是 `index.html`，文章共用 `article.html?slug=xxx`，介紹頁是 `about.html`。樣式放 `css/style.css`，功能放 `js/site.js`，文章放 `data/articles.js`。網頁用相對路徑，維持白灰底、深色字、藍紫重點色，手機也要能看。

## 新增文章

先看現有文章，避免重複。只要在 `data/articles.js` 的 `window.ARTICLES` 加一筆，不用新建 HTML。欄位照原本格式：`slug`（小寫英文和連字號，不重複）、`title`、`description`、`category`（網路／設備／資安）、`icon`、`accent`、`iconColor`（色碼）、`readTime`（正整數）、`tags`、`highlights`（3 個）、`sections`（至少 3 段，含 `heading`、`paragraphs`，需要時加 `bullets`、`note`）。不確定的內容不要亂寫。

## 修改與檢查

只加文章就別動其他檔案。改功能要保留搜尋、分類、文章連結。完成後跑 `node tests/validate.js`，確認新文章找得到、能開啟、手機排版正常。若改了資料格式，也要更新這份文件。
