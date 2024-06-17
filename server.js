import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import path from 'path';
const app = express();
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import multer from 'multer';
import Razorpay from 'razorpay';
const port = 3000;
const KEY_ID='rzp_test_LQiyGHbGt01Yn1';
const KEY_SECRET='Wp93wtsBcioCR8H6eLvhPqlW';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage })
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//mongoose connection
mongoose.connect('mongodb://localhost:27017/Shoppers');

//schema
const Users = mongoose.model('Users', {
    username: String,
    password: String,
    email: String,
    mobile: String,
    cartProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'saleProducts' }]
});
const saleProducts = mongoose.model('saleProducts', {
    name: String,
    category: String,
    price: String,
    quantity: Number,
    description: String,
    image: String,
    addedby: mongoose.Schema.Types.ObjectId,
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.send('hello');
})
app.post('/signup', (req, res) => {
    console.log(req.body);
    // return ;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const user = new Users({ username: username, password: password, email, mobile });
    user.save().then(() => {
        res.send({ message: 'saved successfully' })

    }).catch(() => { 
        res.send({ message: 'server error' });
    })
})

app.post('/login', (req, res) => {
    console.log(req.body);
    // return ;
    const username = req.body.username;
    const password = req.body.password;
    // const user= new Users({username:username, password:password});

    Users.findOne({ username: username })
        .then((result) => {
            console.log(result, "user data")
            if (!result) {
                res.send({ message: "user not found" })
            }
            else {
                // result.password==password?res.send({ message: 'found successfully' }):res.send({message:'incorrect password'})
                if (result.password == password) {
                    const token = jwt.sign({
                        data: result
                    }, 'KEY', { expiresIn: '1h' });
                    res.send({ message: 'find success.', token: token, userId: result._id });
                }
                if (result.password != password) {
                    res.send({ message: 'incorrect password' })
                }
            }

        }).catch((err) => {
            console.log(err);
            res.send({ message: 'server error' });
        })
})


app.post('/sell', upload.single('image'), (req, res) => {
    // console.log('hello');
    console.log(req.body);
    // console.log(req.file);
    const name = req.body.name;
    const category = req.body.category;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const description = req.body.description;
    const image = req.file.path;
    const addedby = req.body.userId;
    const spdt = new saleProducts({ name: name, category: category, price: price, quantity: quantity, description: description, image: image, addedby });
    spdt.save().then(() => {
        res.send({ message: 'saved successfully' })

    }).catch(() => {
        res.send({ message: 'server error' });
    })
})


app.get('/get-product', (req, res) => {

    const catname = req.query.catname;
    let O = {};
    if (catname) {
        O = { category: catname }
    }
    console.log(catname);

    saleProducts.find(O).then((result) => {
        // console.log(result, 'user data');
        res.send({ message: 'success', products: result })
    }).catch((err) => {
        res.send({ message: 'server error' })
    })
})


app.post('/add-cart', upload.single('image'), async (req, res) => {
    let productId = req.body.productId;
    let userId = req.body.userId;

    Users.updateOne({ _id: userId }, { $addToSet: { cartProducts: productId } })
        .then(() => {
            res.send({ message: 'add-to-cart success.' })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })
})

app.post('/cart', (req, res) => {
    Users.findOne({ _id: req.body.userId }).populate('cartProducts')
        .then((result) => {
            res.send({ message: 'success', products: result.cartProducts })
        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })
})

app.get('/productdetails/:productId', (req, res) => {
    console.log(req.params);

    saleProducts.findOne({ _id: req.params.productId })
        .then((result) => {
            res.send({ message: 'success', product: result })
        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })
})


app.get('/search', (req, res) => {
    let search = req.query.search;
    // console.log(search);
    let searchRegex = new RegExp(search, 'i');
    // console.log(req.query);
    // return;
    saleProducts.find({
        $or: [
            { name: { $regex: searchRegex } },
            { description: { $regex: searchRegex } },
            { category: { $regex: searchRegex } },
        ],
    })
        .then((results) => {
            // console.log(results, 'user data');
            res.send({ message: 'success', products: results })
        }).catch((err) => {
            res.send({ message: 'server error' })
        })

})

app.get('/get-user/:uId', (req, res) => {
    const _userId = req.params.uId;
    Users.findOne({ _id: _userId })
        .then((result) => {
            res.send({
                message: 'success.', user: {
                    email: result.email,
                    mobile: result.mobile,
                    username: result.username
                }
            })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })
})

app.post('/my-products',(req,res)=>{
    const userId = req.body.userId;

    saleProducts.find({ addedby: userId })
        .then((result) => {
            res.send({ message: 'success', products: result })
        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })
})


app.post('/orders',(req,res)=>{
    let instance = new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET })

    var options = {
        amount: req.body.amount * 100,  // amount in the smallest currency unit
        currency: "INR",
    };

    instance.orders.create(options, function (err, order) {
        if (err) {
            return res.send({ code: 500, message: 'Server Err.' })
        }
        return res.send({ code: 200, message: 'order created', data: order })
    });
})

app.listen(port, () => {
    console.log(`listening to the port ${port}`);
})