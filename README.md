# Todolist API

使用 Node.js 原生 `http` 模組打造的待辦事項（Todo List）RESTful API，未使用任何 Web 框架，資料儲存於記憶體中。

> 六角學院 NodeJS 直播班 2026 作業

## 線上 Demo

部署於 Render：<https://two026-preview-homework.onrender.com>

> ⚠️ Render 免費方案閒置一段時間後會休眠，第一次請求可能需要等待數十秒喚醒。
> 另外資料儲存於記憶體中，服務重啟後資料會清空。

## 技術說明

- **Node.js**（>= 18）原生 `http` 模組
- **uuid** — 產生每筆待辦的唯一 ID
- **nodemon**（開發用） — 檔案變動時自動重啟

## 安裝與啟動

```bash
# 安裝套件
npm install

# 開發模式（檔案變動自動重啟）
npm run dev

# 正式啟動
npm start
```

預設監聽 `3005` 埠（可用環境變數 `PORT` 覆寫），本機啟動後即可透過 <http://localhost:3005> 存取。

## API 文件

所有回傳格式皆為 JSON，成功時 `status` 為 `success`，失敗時為 `false`。

| 功能 | Method | 路徑 | Body |
|------|--------|------|------|
| 取得所有代辦 | `GET` | `/todos` | — |
| 新增單筆代辦 | `POST` | `/todos` | `{ "title": "標題" }` |
| 刪除所有代辦 | `DELETE` | `/todos` | — |
| 刪除單筆代辦 | `DELETE` | `/todos/:id` | — |
| 修改單筆代辦 | `PATCH` | `/todos/:id` | `{ "title": "新標題" }` |

### 回傳範例

新增成功：

```json
{
  "status": "success",
  "data": [
    { "title": "採買", "id": "00417086-4317-4b3e-ac6f-57c359dd8193" }
  ]
}
```

錯誤（欄位未填寫正確）：

```json
{
  "status": "false",
  "message": "欄位未填寫正確,或無此todo id"
}
```

| 狀態碼 | 說明 |
|--------|------|
| `200` | 請求成功 |
| `400` | 欄位未填寫正確 |
| `404` | 查無此 ID 或路由不存在 |

## Postman Collection

專案附上 Postman Collection 檔案，可直接匯入測試：

[postman/Todolist-Render.postman_collection.json](postman/Todolist-Render.postman_collection.json)

**匯入方式：** 開啟 Postman → 左上角 `Import` → 選擇上述檔案。

## 專案結構

```
.
├── server.js        # 主程式，HTTP 伺服器與路由邏輯
├── errorHandle.js   # 共用錯誤回應處理
├── package.json
└── postman/
    └── Todolist-Render.postman_collection.json
```
