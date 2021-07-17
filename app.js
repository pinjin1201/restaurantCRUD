// 載入 express，並建構應用程式伺服器
const express = require('express')
const app = express()

// 設定 port
const port = 3000

// 載入 express-handlebars
const exphbs = require('express-handlebars')

// 載入 restaurant model
const Restaurant = require('./models/restaurant')

// 載入 body-parser
const bodyParser = require('body-parser')

// 設定 把樣板引擎交給 Express-handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定靜態檔案位置
app.use(express.static('public'))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

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

// 首頁路由
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

// 設定 search 路由
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()

  Restaurant.find()
    .lean()
    .then(restaurants => {
      restaurants = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(keyword) ||
        restaurant.category.toLowerCase().includes(keyword)
      )
      res.render('index', { restaurants })
    })
    .catch(error => console.log(error))
})

// 設定新增資料路由
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

// 新建的資料傳入資料庫
app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const name_en  = req.body.name_en 
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description

  const restaurant = new Restaurant({ name, name_en, category, image, location, phone, google_map, rating, description
  })

  return restaurant.save()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 設定 show page 路由
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 設定修改資料路由
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// 修改的資料傳入資料庫
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.params.name

  return Restaurant.findById(id)
    .then(todo => {
      restaurant.name = name
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// 設定刪除路由
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById()
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 監聽本機伺服器 port 3000
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
