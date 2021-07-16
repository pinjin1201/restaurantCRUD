// 載入 express，並建構應用程式伺服器
const express = require('express')
const app = express()

// 設定 port
const port = 3000

// 載入 express-handlebars
const exphbs = require('express-handlebars')

// 載入 restaurant model
const Restaurant = require('./models/restaurant')

// 設定 把樣板引擎交給 Express-handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定靜態檔案位置
app.use(express.static('public'))

// 載入 mongoose
const mongoose = require('mongoose')

// 設定連線到 mongodb
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定首頁路由
app.get('/', (req, res) => {
  // 取出 Todo model 裡的所有資料
  Restaurant.find()
    // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .lean() 
    // 將資料傳給 index 樣板
    .then(restaurants => res.render('index', { restaurants  }))
    // 錯誤處理
    .catch(error => console.error(error)) 
})

// 監聽本機伺服器 port 3000
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
