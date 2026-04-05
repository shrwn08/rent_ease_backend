import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Product name is required'],
        trim : true,
    },
    category : {
        type : String,
        required : [true, 'Category is required'],
        enum : ['Furniture', 'Appliances'],
    },
    description : {
        type : String,
        required : [true, 'Description is required']
    },
    monthlyRent : {
        type : Number,
        required : [true, 'Monthly is required'],
        min : [0, 'Desposit cannot be negative'],
    },
     deposit : {
       type  : Number,
       required : [true, 'Security deposit is required'],
       min : [0, "Deposit cannot be negative"],
    },
    tenureoptions : {
        type : [Number],
        required : [true, 'Tenure options are required'],
        default : [3,6,12]
    },
    stock : {
        type : Number,
        required : [true, 'Stock count is required'],
        min : [0, 'Stock cannot be negative'],
        default : 0
    },
    imageUrl : {
        type  : String,
        default : 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
    },
    brand : {
        type : String,
        trim : true
    },
    rating : {
        type : Number,
        min : 0,
        max : 5,
        default : 4.0
    },
    isAvailable : {
        type : Boolean, 
        default : true
    }
},{timestamps : true});


productSchema.virtual('available').get(function (){
    return this.stock > 0 && this.isAvailable;
});


const  Product = mongoose.model('Product', productSchema);

export default Product;