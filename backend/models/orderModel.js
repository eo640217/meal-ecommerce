import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    // email: {
    //     type:String,
    //     required:false
    // },
    orderItems: [{
        name: {type:String, required:true},
        price: {type:Number, required:true},
        qty: {type:Number, required:true},
        image: {type:String, required:true},
        meal: {type:mongoose.Schema.Types.ObjectId, required:true, ref: 'Meal'},
    }],
    shippingAddress:{
        address:{type:String,required:true},
        city:{type:String,required:true},
        postalCode:{type:String,required:true},
        country:{type:String,required:true},

    },
    // billingAddress:{
    //     address:{type:String,required:true},
    //     city:{type:String,required:true},
    //     postalCode:{type:String,required:true},
    //     country:{type:String,required:true},

    // },
    isAdmin: {
        type:Boolean,
        required:true,
        default: false
    },
    // phoneNumber: {
    //     type:Number,
    //     required:false,
    // },
    paymentMethod: {
        type:String,
        required:true,
    },
    paymentResult:{
        id:{type:String},
        status:{type:String},
        updateTime:{type:String},
        emailAddress:{type:String},
    },
    orderStatus:{
        type:String,
        required:false,
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
    totalPrice:{
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
    isDellivered:{
        type:Boolean,
        required:true,
        default:false
    },

    

}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema);
export default Order