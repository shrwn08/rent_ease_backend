import mongoose from "mongoose";


const maintenanceSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    order : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Order'
    },
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required : true
    },
    productName : String,
    issueTypes : {
        type : String,
        enum : ['repair', 'replacement', 'cleaning', 'installation', other],
        required : true
    },
    description : {
        type : String,
        required : [true, "Issue description is required"],
        maxlength : [500, 'Description cannot exceed 500 characters']
    },
    priority : {
        type : String,
        enum : ['low', 'medium', 'high'],
        default : 'medium'
    },
    status : {
        type : String,
        enum : ['open', 'in-progress', 'resolved', 'closed'],
        default : 'open'
    },
    adminNotes : String,
    resolvedAt : Date
},{
    timestamps : true
});

const maintenanceRequest = mongoose.model('maintenanceRequest',  maintenanceSchema);


export default maintenanceRequest;