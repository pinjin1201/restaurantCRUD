// 載入 express，並建構應用程式伺服器
const express = require('express')
const app = express()

// 設定 port
const port = 3000

// 設定首頁路由
app.get('/', (req, res) => {
  res.send('hello world')
})

// 監聽本機伺服器 port 3000
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
