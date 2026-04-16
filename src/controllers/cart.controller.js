import Cart from "../models/cart.model.js";

import Product from "../models/product.model.js";

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
    );

    console.log(cart);

    if (!cart) return res.json({ success: true, cart: { items: [] } });

    res.json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res,next) => {
  try {
    const { productId, quantity = 1, tenure } = req.body;



    if (!productId)
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });

    //validate product exists and is in stock

    const product = await Product.findById(productId);



    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.stock < 1)
      return res
        .status(400)
        .json({ success: false, message: "Product is out of stock." });

    let cart = await Cart.findOne({ user: req.user._id });
    console.log(cart);

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity, tenure }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId,
      );

      if (existingItem) {
        existingItem.quantity = quantity;
        existingItem.tenure = tenure;
      } else {
        cart.items.push({ product: productId, quantity, tenure });
      }

      await cart.save();
    }
    await cart.populate("items.product");
    res.json({ success: true, message: "Item added to cart", cart });
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const { quantity, tenure } = req.body;
    const { productId } = req.params;
 
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found.' });
    }
 
    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not in cart.' });
    }
 
    if (quantity !== undefined) item.quantity = quantity;
    if (tenure !== undefined) item.tenure = tenure;
 
    await cart.save();
    await cart.populate('items.product');
    res.json({ success: true, message: 'Cart updated.', cart });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found.' });
    }
 
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.id
    );
 
    await cart.save();
    await cart.populate('items.product');
    res.json({ success: true, message: 'Item removed from cart.', cart });
  } catch (error) {
    next(error);
  }
};


export const clearCart = async (req, res, next) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
    res.json({ success: true, message: 'Cart cleared.' });
  } catch (error) {
    next(error);
  }
};



