const mongoose = require('mongoose');
const model = require('./Models')

const Product= mongoose.model('product',model);

const Order = mongoose.model('order', model);

const  Customer = mongoose.model('customer', model);

exports.postProduct= async (req,res)=> {
  try {
    const productsData = req.body; 
    const savedProducts = await Product.insertMany(productsData);
    res.status(200).json(savedProducts)
  } catch (error) {
    res.status(500).send(error.message)
  }
}
exports.getProduct = async (req,res)=>{
  try {
    const products = await Product.find().lean()
    res.status(201).json(products)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.getByRating = async (req, res) => {
  try {
    const data = await Product.aggregate([
      { $match: { rating: { $gte: 4 } } } 
    ]);

    if (data.length === 0) {
      return res.status(404).send({ message: "No products found with a rating of 4 or higher." });
    }

    res.status(200).send(data); 
  } catch (error) {
    console.error(error); 
    res.status(500).send(error.message); 
  }
};

exports.getData = async (req,res)=>{
  try {
    const data = await Order.aggregate([
      {
        $lookup:{
          from:'customers',
          localField:'customerId',
          foreignField: '_id',
          as:'customer_detail'
        
        }
      }
    ]);
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

exports.getAll = async (req,res)=>{
  try {
    const orders = await Order.find()
    res.status(200).json(orders)
  } catch (error) {
    res.send('order not found')
  }
 

}


exports.getByCustomerId= async (req,res)=>{
  try {
  const data = await Order.aggregate([
    { $match: { customerId: parseInt(req.params.id) } }
  ])
  res.send(data)
  } catch (error) {
    res.send(error.message)
  }
}

exports.getByProductId = async (req,res)=>{
  try {
   
    const data = await Order.aggregate([
      {$unwind:'$productIds'},
      {$match: {productIds:parseInt(req.params.id) }}
    ])
    res.send(data)
  } catch (error) {
    res.send(error.message)
  }
}
