import Cart from "../models/cart.Model.js";

import Product from "../models/product.model.js";

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).popukate(
      "items.product",
    );

    if (!cart) return res.json({ success: true, cart: { items: [] } });

    res.json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, tenure } = req.body;

    if (!productId)
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });

    //validate product exists and is in stock

    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    if(product.stock < 1)
        return res.status(400).json({success : false, message : "Product is out of stock."});


    let cart = await Cart.findOne({user : req.user._id});

    if(!cart){
        cart = await Cart.create({
            user : req.user._id,
            items : [{product : productId, quantity, tenure}]
        })
    }else{
        const existingItem = cart.items.find((item)=>item.product.toString() === productId);

        if(existingItem){
            existingItem.quantity = quantity;
            existingItem.tenure = tenure;
        }else{
            cart.items.push({product : productId, quantity, tenure})
        }

        await cart.save();


    }
    await cart.populate('items.product');
    res.json({success : true, message : "Item added to cart"});
        
  } catch (error) {
    next(error);
  }
};
