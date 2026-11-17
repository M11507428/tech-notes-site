# 生活科技小百科

整理Wi-Fi、USB-C、VPN等常見科技知識。主要給一般人看，用繁體中文、白話文，簡單講重點，不要寫太長。

## 網站規則

只用HTML、CSS、JavaScript，不用框架、後端或資料庫，放GitHub Pages。網頁用相對路徑，白灰底、深色字、藍紫色重點色，排版簡單，手機也要能看。

- `index.html`：首頁、搜尋、分類
- `article.html`：文章共用頁面
- `about.html`：網站介紹
- `data/articles.js`：文章資料
- `js/site.js`：搜尋、分類、文章顯示
- `css/style.css`：全站樣式
- `tests/validate.js`：文章格式檢查

## 頁面格式

首頁顯示文章卡片，可以搜尋和篩選分類。文章頁固定有標題、簡介、3個重點、內文和相關文章。所有文章共用`article.html`，網址用`article.html?slug=文章代號`，不用每篇都做新HTML。

## 新增文章

先看現有文章，不要重複主題。只在`data/articles.js`的`window.ARTICLES`照原本格式加一筆。

- `slug`：小寫英文、數字和`-`，不能重複
- `title`、`description`：標題、簡介
- `category`：只能用網路、設備、資安
- `icon`：文章圖示
- `accent`、`iconColor`：HEX色碼
- `readTime`：閱讀分鐘數，正整數
- `tags`：至少1個搜尋關鍵字
- `highlights`：剛好3個重點
- `sections`：至少3段，每段要有`heading`和`paragraphs`，需要時加`bullets`、`note`

文字不要寫得像教科書，不確定的資料不要亂寫。

## 修改與檢查

只加文章就不要動HTML、CSS、JS或舊文章。改樣式集中改`css/style.css`，改功能要保留搜尋、分類和文章連結。不要亂改舊的`slug`。如果資料格式變了，就同步改這份文件。

完成後跑`node tests/validate.js`，再檢查首頁能不能找到文章、分類和搜尋是否正常、文章連結能不能開、手機排版有沒有壞。最後簡單列出改了哪些檔案。
