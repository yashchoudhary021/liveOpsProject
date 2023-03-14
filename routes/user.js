const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken')
const salt = 10;
const SECRET_CODE = 'ldsjfpOsdnFklskjdnfpioAdpifon';
const {user} = require('../Schemas/userschema')

router.post('/singup', async (req, res) => {
    //Here we are encrypt the password
    bcrypt.genSalt(salt, (saltError, saltValue) => {
        if(saltError){
            res.status(401).send("Unable to Process")
        }
        else{
            bcrypt.hash(req.body.password, saltValue, (hashError, hashValue) => {
                if(hashError){
                    res.status(401).send("Unable to Process");
                }
                else{
                    user.create({username: req.body.username, password: hashValue, email: req.body.email | "", moblie: req.body.mobile | ""})
                    .then((user) => {
                        res.status(200).send(`${user.username} Created SuccessFully`);
                    })
                    .catch((e) => {
                        res.status(400).send(e.message)
                    })
                }
            })
        }
    })
})
// Login tasks => {
    // 1. Read a user from Db
    // 2. userName Password
    // 3. user Exist or not
    // 4. verify password and genrate jwt
// }
router.post('/login', async (req, res) => {
    user.findOne({username: req.body.username})
    .then((user) => {
        if(!user){
            res.status(401).send("User Not Exist!")
        }
        else{
            if(!bcrypt.compareSync(req.body.password, user.password)){
                res.status(401).send("Invalid Password")
            }
            else{
                const token = jwt.sign({id: user._id, username: user.username}, SECRET_CODE);
                res.status(200).send({message: "User Logged in successfully", token: token});
            }
        }
    }).catch((e) => {
        console.log(e.message)
    })
})
module.exports = router;