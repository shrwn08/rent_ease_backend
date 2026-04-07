import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/order.model.js";

export const createOrder = async (req, res, next) => {
  try {
    const { deliveryDate, deliveryAddress, notes } = req.body;

    if (!deliveryDate || !deliveryAddress)
      return res.status(400).json({
        success: false,
        message: "Delivery date and address are required",
      });

    //Get user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
    );

    if (!cart || cart.items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Cart is empty." });
    }

    //Build order items with price snapshots
    let totalRent = 0;
    let totalDeposit = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = item.product;

      //check stock
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`,
        });
      }

      orderItems.push({
        product: product._id,
        productName: product.name,
        monthlyRent: product.monthlyRent,
        deposit: product.deposit,
        quantity: item.quantity,
        tenure: item.tenure,
      });

      totalRent += product.monthlyRent * item.quantity;
      totalDeposit += product.deposit * item.quantity;
    }

    const grandTotal = totalRent + totalDeposit; 

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalRent,
      totalDeposit,
      grandTotal,
      deliveryDate,
      deliveryAddress,
      notes,
    });

  // Reduce stock for each ordered product
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity },
      });
    }

    await Cart.findByIdAndUpdate({user : req.user._id},{items : []});

    await order.populate("user", "name email");

    res.status(201).json({success : true, message : "Order placed successfully!", order});


  } catch (error) {
    next(error);
  }
};


export const getMyOrders = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = { user: req.user._id };
    if (status) query.status = status;
 
    const orders = await Order.find(query)
      .populate('items.product', 'name imageUrl category')
      .sort('-createdAt');
 
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    next(error);
  }
};
