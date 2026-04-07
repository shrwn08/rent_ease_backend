import Cart from "../models/cart.Model.js"

import Product from "../models/product.model.js";



export const getCart = async(req, res, next) =>{
    try {
        const cart = await Cart.findOne({user : req.user._id}).popukate('items.product');

        if(!cart)
            return res.json({success : true, cart : {items : []}});

        res.json({success : true, cart});
    } catch (error) {
        next(error)
    }
}