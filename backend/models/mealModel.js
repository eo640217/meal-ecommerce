import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema({
    name: {required: true, type:String},
    rating: {required: true, type:Number},
    feedback: {required: true,type:String}
}, {timestamps:true})

const mealSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type:String,
        required:true,
    },
    price: {
        type:Number,
        required:true,
    },
    description: {
        type:String,
        required:true
    },
    image: {
        type:String,
        required:true,
    },
    imageCarousel: {
        type:String,
        required:true,
    },
    metadata:{
        type:String,
    },
    reviews:[reviewsSchema]
    ,
    rating:{
        type:Number,
        required:true,
        default: 0
    },
    numReviews:{
        type:Number,
    },
    quantity:{
        type:Number,
        required:true,
        default:0
    },
}, {
    timestamps: true
})

const Meal = mongoose.model('Meal', mealSchema);
export default Meal