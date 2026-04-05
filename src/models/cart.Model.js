import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required : true
    },
    quanity : {
        type : Number,
        default : 1,
        min : 1
    },
    tenure : {
        type  : Number, 
        enum : [3, 6, 12],
        default : 3
    }
});

const cartSchema =  new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
        unique : true
    },
    items : [cartItemSchema]

},{timestamps : true});


const Cart = mongoose.model('Cart', cartSchema);

export default Cart;