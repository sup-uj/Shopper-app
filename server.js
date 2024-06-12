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
const port = 3000;


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
const Users = mongoose.model('Users', { username: String, password: String });
const saleProducts = mongoose.model('saleProducts', { name: String, category: String, price: String, quantity: Number, description: String, image: String });

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
    const user = new Users({ username: username, password: password });
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
                    res.send({ message: 'found successfully', token: token });
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
    const spdt = new saleProducts({ name: name, category: category, price: price, quantity: quantity, description: description, image: image });
    spdt.save().then(() => {
        res.send({ message: 'saved successfully' })

    }).catch(() => {
        res.send({ message: 'server error' });
    })
})


app.get('/get-product', (req, res) => {
    saleProducts.find().then((result) => {
        console.log(result, 'user data');
        res.send({ message: 'success', products: result })
    }).catch((err) => {
        res.send({ message: 'server error' })
    })
})

app.listen(port, () => {
    console.log(`listening to the port ${port}`);
})