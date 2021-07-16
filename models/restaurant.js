// 載入 mongoose
const mongoose = require('mongoose')

// 定義資料結構
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String, 
    required: true 
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  google_map: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

// 透過 module.exports 把此 schema 輸出
module.exports = mongoose.model('Restaurant', restaurantSchema)