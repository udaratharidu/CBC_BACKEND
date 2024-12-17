import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productId : {
        type : String,
        required : true,
        unique : true    
    }, 
    productName : {
        type : String,
        required : true
    },
   altName : [
    {
       type : String,
   }
],
    image : [{
        type : String,
    }
],
    price : {
        type : Number,
        require : true
    },
    lastPrice : {
        type : Number
    },
    description : {
        type : String
    }
})
 const Product = mongoose.model("Product", productSchema);

 export default Product;
    
   
    