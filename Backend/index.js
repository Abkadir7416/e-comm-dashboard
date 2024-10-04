require('./db/config')
const User = require('./db/User')
const Product = require('./db/Product')
const express = require('express')
const cors = require('cors');
const app = express();
app.use(express.json()); //used it to get data from api in json format.
app.use(cors());


// app.get('/register', (req, res) => {
//     res.send(req.body);
//     console.log(req.body)
//     res.end();
// })

app.get("/", (req, res) => {
    res.end("hello world")
})

app.post('/register', async (req, res) => {
    // Here we are getting data in body either form postman or react's singup page;
    console.log(req.body)
    let user = new User(req.body);  //these two lines are used to send data from server to database.
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
    console.log(result);
    res.end();
})

app.post('/login', async (req, res) => {
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            res.send(user);
        }
        else {
            res.send({ result: "No User Found" });
        }
    }
    else {
        res.send({ result: "No User Found" });
    }
})

app.post('/add-product', async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    console.log('result', result);
    res.send(result);
    res.end();
})

app.get('/products', async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products)
    }
    else {
        res.send({ result: "No Products found" });
    }
    res.end();
})

app.delete('/product/:id', async (req, res) => {
    // res.send(req.params.id)
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
})

app.get('/product/:id', async (req, res) => {
    console.log(req.params.id)
    const result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
        console.log(result)
    }
    else {
        res.send({ result: "No Record Found" })
    }
})

app.put('/product/:id', async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result);
})

app.get('/search/:key', async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    });
    res.send(result);
})

app.listen(4000);