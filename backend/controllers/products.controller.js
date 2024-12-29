import Product from '../models/product.model.js';
import {redis} from '../lib/redis.js';
export const getAllProducts = async(req, res) => {
    try{
        const products = await Product.find({});
        res.json(products);
    }
    catch(error){
        console.log('Error in getAllProducts controller', error.message);
        res.status(500).json({message: error.message});
    }
}



export const getFeaturedProducts = async(req, res) => {
    try{

       let featuredProducts =  await redis.get("freaturedProducts");
       
       if (featuredProducts) {
        return res.json(JSON.parse(featuredProducts));
       }
       else{
        //lean method to convert mongoose object to json which is good for performance
        featuredProducts = await Product.find({isFeatured: true}).lean();
        //convert json to string and store in redis
        await redis.set("freaturedProducts", JSON.stringify(featuredProducts));
        res.json(featuredProducts); 
    }

}catch(error){
        console.log('Error in getFeaturedProducts controller', error.message);
        res.status(500).json({message: error.message});
    }
}

export const createProduct = async(req, res) => {
    try{
        const {name, description, price, image, catagory} = await Product.create(req.body);
        let cloudinaryResponse = null;

        if(image){
            cloudinaryResponse = await cloudinary.uploader.upload(image, {floder: "products"});
        }

        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url || "",
            catagory,
        });
        res.status(201).json(product);
    }
    catch(error){
        console.log('Error in createProduct controller', error.message);
        res.status(500).json({message: error.message});
    }
}


export const deleteProduct = async(req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        if (product.image) {
            public_id = product.image.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(`products/${public_id}`);
                console.log("Image deleted from cloudinary successfully");
            } catch (error) {
                console.log(error);
            }
        }

        await Product.findByIdAndDelete(req.params.id);
      
        res.json({message: "Product deleted successfully"});
    }
    catch(error){
        console.log('Error in deleteProduct controller', error.message);
        res.status(500).json({message: error.message});
    }
}


export const getRecommnededProducts = async(req, res) => {
    try{
        const products = await Product.aggeragte([
        {
            $sample: {size: 3},
        },
        {
            $project: {
                _id: 1,
                name: 1,
                image: 1,
                price: 1,
            },
        }

        ]);
        res.json(products);
    }


    catch(error){
        console.log('Error in getRecommnededProducts controller', error.message);
        res.status(500).json({message: error.message});
    }
}


export const getProductsByCatagory = async(req, res) => {
    const catagory = req.params.catagory;
        try{
            const products = await Product.find({catagory});
            res.json(products);
        }
        catch(error){
            console.log('Error in getProductsByCatagory controller', error.message);
            res.status(500).json({message: error.message});
    }
}
   

export const toggleFeaturedProduct = async(req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await product.save();
            return res.json(updatedProduct);
        }
       
    }catch(error){
        console.log('Error in toggleFeaturedProduct controller', error.message);
        res.status(500).json({message: error.message});
    }
}

async function updateFeaturedProductsCache() {
    try {
      const featuredProducts = await Product.find({ isFeatured: true });
      await redis.set("freaturedProducts", JSON.stringify(featuredProducts));
    } catch (error) {
      console.error("Error updating featured products cache:", error);
    }
  }