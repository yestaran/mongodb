
const mongoose = require('mongoose');


productSchema = new mongoose.Schema({
    id:{type:Number, required:true},
    name:{ type: String, required:true},
    category:{type: String, required: true},
    rating: { type:Number, required: true}
})

const customerSchema = new mongoose.Schema({
  id: {  type: Number, required: true},
  name: { type: String,required: true}
})

const orderSchema = new mongoose.Schema({
  id: {type: Number,required: true},
  customerId: {type: Number,required: true},
  productIds: {type: [Number],required: true},
  amount:{type:Number, required: true}
})



mongoose.connect('mongodb://localhost:27017/local')
.then(()=> console.log('MongoDb Connected'))
.catch((err)=> console.log(err))