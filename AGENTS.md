# 生活科技小百科

## 這網站要幹嘛

整理一些常見的科技知識，像 Wi-Fi、USB-C、VPN、帳號安全。
主要給一般人看，不用寫得太硬。
以後加文章就加資料，不要每次重做網頁。

## 技術

- HTML、CSS、JavaScript 就好，不用框架或後端。
- 放 GitHub Pages，網址和檔案路徑用相對路徑。
- 全站繁體中文，文字簡單一點。
- 不用登入、資料庫或外部 API。

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

## AI 要怎麼改

1. 先讀這份，再看一下現有文章，別做重複題目。
2. 新文章照上面格式加進 `data/articles.js`。
3. 用白話文，內容要正確，不確定的資料不要亂掰。
4. 只是加文章就不要動 HTML、CSS、JS，也不要改到舊文章。
5. 要改功能時，保留原本搜尋、分類和文章連結。
6. 如果資料格式真的改了，記得一起更新這份文件。

## 做完檢查

- 跑 `node tests/validate.js`，確認資料格式沒問題。
- 首頁找得到新文章，分類和搜尋能用。
- 點卡片可以進文章頁，輸入錯的 slug 不會壞掉。
- 手機排版正常，GitHub Pages 的連結正常。
- 最後告訴我改了什麼、文章網址是什麼。
