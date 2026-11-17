# 生活科技小百科 / Tech Notes

一個以「可持續新增內容」為目標的靜態知識網站。首頁提供文章卡片、分類篩選與搜尋；內頁使用共用的文章版型。

## 特色

- 三個固定分類：網路、設備、資安
- 六篇示範文章，每篇有三個重點、內文與延伸推薦
- 全站無外部套件、無後端、無 API 金鑰
- 支援桌面與手機瀏覽
- `AGENTS.md` 規定 AI 如何新增第七篇、第八篇文章

## 開啟方式

直接雙擊 `index.html` 即可使用。也可在專案資料夾執行：

```bash
python -m http.server 8000
```

接著開啟 `http://localhost:8000/`。

## 網址設計

- 首頁：`index.html`
- 關於：`about.html`
- 單篇文章：`article.html?slug=wifi-bands`
- AI 規範：`AGENTS.md`

## 新增文章

先閱讀 `AGENTS.md`。只需要在 `data/articles.js` 的 `window.ARTICLES` 中新增符合格式的文章物件，首頁列表、搜尋、篩選與文章頁就會自動支援該文章。

## 可選：檢查文章資料格式

有安裝 Node.js 的話，可執行 `node tests/validate.js`，確認 `slug`、分類、摘要數量、章節等欄位符合 `AGENTS.md`。這是開發用測試，不是網站執行需求。

## 發布到 GitHub Pages

1. 登入 GitHub，建立名稱為 `tech-notes-site` 的 **Public** Repository（不要預先加入 README，以免匯入時遇到衝突）。
2. 將此專案**資料夾內的所有檔案**（包括 `index.html`、`AGENTS.md`、`data/`、`js/`、`css/`）上傳到 Repository 根目錄。請不要只上傳 ZIP。
3. 到 Repository 的 `Settings` → `Pages`。
4. `Build and deployment` 的 `Source` 選 `Deploy from a branch`。
5. `Branch` 選 `main`，資料夾選 `/(root)`，按 `Save`。
6. 發布完成後，在瀏覽器打開：

   `https://你的GitHub帳號.github.io/tech-notes-site/`

   GitHub Repository：`https://github.com/你的GitHub帳號/tech-notes-site`

**注意：**上面是網址格式範例，不能當作已發布的實際連結。必須上傳成功後，才使用自己真實的網址繳交。

## 建議的 Git 指令（選用）

```bash
git init
git add .
git commit -m "Create tech notes site with AGENTS.md"
git branch -M main
git remote add origin https://github.com/你的GitHub帳號/tech-notes-site.git
git push -u origin main
```

若不熟悉 Git 指令，可直接使用 GitHub 網站的 `Add file` → `Upload files`。

## 專案結構

```text
index.html          首頁
article.html        文章共用模板
about.html          關於本專案
data/articles.js    文章資料庫
js/site.js          搜尋、篩選、文章渲染
tests/validate.js   文章資料格式檢查（可選）
css/style.css       共用樣式
AGENTS.md           AI 開發規則
README.md           使用與部署說明
```
