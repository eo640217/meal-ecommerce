import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    orderItems: [{
        name: {type:String, required:true},
        price: {type:Number, required:true},
        quantity: {type:Number, required:true},
        image: {type:String, required:true},
        meal: {type:mongoose.Schema.Types.ObjectId, required:true, ref: 'Meal'},
    }],
    shippingAddress:{
        address:{type:String,required:true},
        city:{type:String,required:true},
        postalCode:{type:String,required:true},
        country:{type:String,required:true},

    },
    billingAddress:{
        address:{type:String,required:true},
        city:{type:String,required:true},
        postalCode:{type:String,required:true},
        country:{type:String,required:true},

    },
    isAdmin: {
        type:Boolean,
        required:true,
        default: false
    },
    phoneNumber: {
        type:Number,
        required:true,
    },
    paymentMethod: {
        type:String,
        required:true,
    },
    paymentResult:{
        id:{type:String},
        status:{type:String},
        updateTime:{type:String},
        email_address:{type:String},
    },
    orderStatus:{
        type:String,
        required:true,
    },
    trackingNumber:{
        type:String,
        required:false,
    },
    taxPrice:{
        type:Number,
        required:true,
        default:0
    },
    shippingPrice:{
        type:Number,
        required:true,
        default:0
    },
    isPaid:{
        type:Boolean,
        required:true,
        default:false
    },
    paidAt:{
        type:Date
    },
    deliveredAt:{
        type:Date
    },

    

}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema);
export default Order