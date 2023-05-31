const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");


const productSchema = mongoose.Schema({
    model:{
        required:[true,'You Need To Add Unique Model'],
        type:String,
        unique:1,
        maxlength:250
    },
    brand:{
        type:Schema.Types.ObjectId,
        ref:'Brand',
        required:true
    },
    frets:{
        type:Number
    },
    size:{
        type:String,
        
    },
    description:{
        required:[true,'You Need A Description'],
        type:String,
        maxlength:10000,
    },
    price:{
        required:true,
        type:Number,
        maxlength:255
    },
    available:{
        required:[true,'How many of this model we own'],
        type:Number,
        maxlength:5000,
        default:0
    },
    itemsSold:{
        required:true,
        type:Number,
        default:0
    },
    shipping:{
        type:Boolean,
        required:[true,'Specify this product has free shipping'],
        default:false
    },
    images:{
        type:Array,
        default:[]
    },
    date:{
        type:Date,
        default:Date.now
    }

})
productSchema.plugin(aggregatePaginate)

const Product = mongoose.model('Product',productSchema);

module.exports={
    Product
}