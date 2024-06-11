import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import path from 'path';
const app = express();
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
const port = 3000;


mongoose.connect('mongodb://localhost:27017/Shoppers');
const Users = mongoose.model('Users', { username: String, password: String });
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


app.listen(port, () => {
    console.log(`listening to the port ${port}`);
})