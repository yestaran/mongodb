const express = require('express');
const aggregate = require('./aggregate');
const product = require('./controller')

const app = express();
app.use(express.json());


app.get('/movie-by-genre', async (req, res) => {
  aggregate.getMovieByGenre(req, res);
});

app.get('/getmovie', async (req, res) => {
  aggregate.getMovie(req, res)
});

app.post('/product', async (req, res) => {
  product.postProduct(req, res);
});

app.get('/get', async (req, res) => {
  product.getProduct(req, res);
});

app.get('/get-by-rating', async (req, res) => {
  product.getByRating(req, res);
})

app.get('/getOrder', async (req, res) => {
  product.getData(req, res);
})

app.get('/get/customer/:id', async (req, res) => {

 product.getByCustomerId(req, res)
})

app.get('/get-all', async (req,res)=> {
product.getAll(req,res)
})

app.get('/by-product/:id', async(req,res)=>{
  product.getByProductId(req,res)
})
app.listen(4003, () => {
  console.log('Server is running');
});


