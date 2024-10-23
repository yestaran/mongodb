const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/local')
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

// Define Movie Schema and Model
const movieSchema = new mongoose.Schema({
  title: String,
  rating: Number,
  price: Number,
  releaseYear: Number
});

const Movie = mongoose.model('Movie', movieSchema);


exports.getMovieStats = async(req,res) => {
  try {
    const stats = await Movie.aggregate([
      {$match: {ratings: {$gte:4.5}}},
      {$group:{
        _id:'$releaseYear',
        avgRating:{ $avg: '$ratings'},
        avgPrice: { $avg: '$price'},
        minPrice: { $min: '$price'},
        maxPrice: { $max: '$price'},
        priceTotal: { $sum: '$price'},
        movieCout: { $sum : 1}
      }},
      { $sort: {minPrice: 1}},
      {$match: {maxPrice: {$gte:60}}}
    ])

    res.status(200).json({
      status: 'success',
      count: stats.length,
      data:{
        stats
      }
    });
  } catch (err) {
    res.status(404).json({
      status:'fail',
      message: err.message
    });
  }
}


exports.getMovieByGenre = async (req, res) => {
  try {
    const stats = await Movie.aggregate([
      { $match: { rating: { $gte: 4 } } }  
    ]);

    res.status(200).send(stats);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.getMovie= async (req,res)=>{
  try {
    const data = await Movie.find()
    res.status(200).json(data)
  } catch (error) {
    res.status(404).send(error.message);
  }
}
  