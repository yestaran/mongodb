//MongoDb is a NoSQL database that stores date in flexible,
// JSON-like documents, easy to handle and large volumes of unstructured data.
//Structure
//stores data inn COLLECTIONS and DOCUMENTS
//Collection is a group of MOngo Db documents.
//Document is a set of key-value pairs.

const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json()); 

// Define schema for user
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, default: 18 },
    phone: { type: Number}
});


const User = mongoose.model('User', userSchema);


mongoose.connect('mongodb://localhost:27017/local')
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// POST request to create a new user
app.post('/user', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json(error);  
    }
});

// GET request to fetch all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

//get user by id

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete the user by ID

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); 
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error); 
  }
});

//To update user by id

app.put('/user/:id', async(req,res)=> {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!user){
      return res.status(404).send('user not found')
    }

    res.send({message : "User updated succcessfully"})
  } catch (error) {
    res.send(error)
  }
})


app.listen(4003, () => {
  console.log('Server is running');
});

