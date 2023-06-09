const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const {authenticateJWT,ensureLoggedIn,ensureCorrectUser } = require("../middleware/auth");
const User = require('../models/user');
const Message = require('../models/message');
/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/
router.get('/:id',ensureLoggedIn,async (req,res,next) => {
    try {
        const id = req.params.id
        const result = await Message.get(id);
        if(req.user.username ===result.from_user.username || req.user.username ===result.to_user.username){
            return res.json(result)
        } 
        throw new ExpressError('Not auth',401)
    } catch(e) {
        next(e)
    }
    
    
})


/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/
router.post('/',ensureLoggedIn,async (req,res,next) => {
    try {
        const user = req.user.username
        
        const {to_username,body} = req.body;
        console.log(user)
        const result = await Message.create({from_username:user,to_username,body});
        return res.json(result)
    } catch(e) {
        next(e)
    }
    

})


/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/
router.post('/:id/read',ensureLoggedIn,(req,res,next) => {

})

module.exports = router

