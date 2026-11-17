# 生活科技小百科

這是整理 Wi-Fi、USB-C、VPN 等生活科技知識的靜態網站。內容用繁體中文、白話文，簡單講重點，不要寫太長。

## 網站規則

只用 HTML、CSS、JavaScript，不用框架或後端，放 GitHub Pages。首頁是 `index.html`，文章共用 `article.html?slug=xxx`，介紹頁是 `about.html`。樣式放 `css/style.css`，功能放 `js/site.js`，文章放 `data/articles.js`。網頁用相對路徑，維持白灰底、深色字、藍紫重點色，手機也要能看。

## 新增文章

先看現有文章，避免重複。只要在 `data/articles.js` 的 `window.ARTICLES` 加一筆，不用新建 HTML。欄位照原本格式：`slug`（小寫英文和連字號，不重複）、`title`、`description`、`category`（網路／設備／資安）、`icon`、`accent`、`iconColor`（色碼）、`readTime`（正整數）、`tags`、`highlights`（3 個）、`sections`（至少 3 段，含 `heading`、`paragraphs`，需要時加 `bullets`、`note`）。不確定的內容不要亂寫。

## 修改與檢查

只加文章就別動其他檔案。改功能要保留搜尋、分類、文章連結。完成後跑 `node tests/validate.js`，確認新文章找得到、能開啟、手機排版正常。若改了資料格式，也要更新這份文件。


## 檔案放哪

```text
index.html          首頁、搜尋、分類
article.html        文章共用頁面
about.html          網站介紹
css/style.css       全站樣式
js/site.js          搜尋、分類、顯示文章
data/articles.js    全部文章資料
tests/validate.js   檢查文章格式
AGENTS.md           這份規則
README.md           專案說明
```

每篇文章不用另外做 HTML。文章網址統一用 `article.html?slug=文章代號`。

## 網頁長怎樣

- 背景偏白灰，深色文字，藍紫色當重點色。
- 簡單的卡片排版，留一點空白，不要塞太滿。
- 首頁有搜尋、分類和文章卡片。
- 文章頁固定是標題、簡介、3 個重點、內文、相關文章。
- 手機也要能正常看。樣式統一改 `css/style.css`，別亂加 inline CSS。

## 新文章格式

只改 `data/articles.js` 裡的 `window.ARTICLES` 陣列，照原本物件格式加一筆。

- `slug`：英文小寫加 `-`，不能重複，之後不要亂改。
- `title`、`description`：標題和簡介，中文，別太長。
- `category`：只能用 `網路`、`設備`、`資安`。
- `icon`：一個符號。
- `accent`、`iconColor`：`#RRGGBB` 顏色。
- `readTime`：閱讀分鐘數，正整數。
- `tags`：至少一個搜尋關鍵字。
- `highlights`：剛好 3 個重點。
- `sections`：至少 3 段，每段都要有 `heading` 和 `paragraphs`。要條列可加 `bullets`，提醒可加 `note`。

例如：

```js
{
  slug: "bluetooth-basics",
  title: "藍牙是什麼？",
  description: "簡單介紹藍牙的用途。",
  category: "設備",
  icon: "◉",
  accent: "#edf0ff",
  iconColor: "#5268ef",
  readTime: 3,
  tags: ["藍牙", "耳機"],
  highlights: ["重點一", "重點二", "重點三"],
  sections: [
    { heading: "原理", paragraphs: ["這裡寫內文。"] },
    { heading: "用途", paragraphs: ["這裡寫內文。"] },
    { heading: "注意事項", paragraphs: ["這裡寫內文。"] }
  ]
}
```
## 做完檢查

- 跑 `node tests/validate.js`，確認資料格式沒問題。
- 首頁找得到新文章，分類和搜尋能用。
- 點卡片可以進文章頁，輸入錯的 slug 不會壞掉。
- 手機排版正常，GitHub Pages 的連結正常。
- 最後告訴我改了什麼、文章網址是什麼。
