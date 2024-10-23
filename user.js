const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json())

const addressSchema = new mongoose.Schema({
userId: {type:mongoose.Schema.Types.ObjectId, required:true},
Address:{type:String, required:true},
City:{type: String, required:true},
HouseNumber:{type:Number, required: true}
});

const Address = mongoose.model('Address', addressSchema)

mongoose.connect('mongodb://localhost:27017/local')
.then(()=> console.log('MongoDb Connected'))
.catch((err)=> console.log(err))

app.post('/address', async (req,res)=>{
    try {
        const newAddress = new Address(req.body)
        const savedAddress = await newAddress.save()
        res.status(201).json(savedAddress)
        
    } catch (error) {
        res.status(500).send('address not found')
    }
});

app.get('/address', async (req,res) => {
    try {
        const Addresses = await Address.find()
        if (!Addresses) {
            res.status(500).send('Address not found')
        }
        res.status(200).send(Addresses)
    } catch (error) {
        res.status(404).send(error)
    }
});

app.get('/address/:id', async (req,res)=> {
    try {
        const addressById = await Address.findById(req.params.id)
        if (!addressById) {
            res.status(404).send({messege: 'please enter the Id'})
        }
        res.status(200).send(addressById)
    } catch (error) {
        res.send(error)
    }
});

app.listen(3000, ()=>{
    console.log('server is running')
})
