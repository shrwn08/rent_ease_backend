import Product from "../models/product.model.js"


export const getProducts = async (req, res, next)=>{
    try {
        const {category, search, page = 1, limit = 12, sort = '-createdAt'} = req.query;

        const query = {};

        //build query object

        if(category && category !== 'All')
            query.category = category;


        if(search){
            query.$or = [
                {name : {$regex: search, $option : 'i'}},
                {description : {$regex : search, $options : 'i'}},
                {brand : {$regec : search, $options : "i"}},
            ]
        }


        const total = await Product.countDocuments(query);
        const products = await Product.find(query).sort(sort).limit(Number(limit)).skip((Number(page) - 1) * Number(limit));


        res.json({
            success : true,
            count : products.length,
            total,
            totalPage : Match.ceil(total / limit),
            currentPage : Number(page),
            products
        })
    } catch (error) {
        next(error);
    }
}


export const getProduct = async (req, res, next)=>{
    try {
        const product =await Product.findById(req.params.id);

        if(!product)
            return rees.status(404).json({success : false, message : "Product not found"});
    } catch (error) {
        next(error);
    }
}


//Create a new product

export const createProduct = async (req, res, next) =>{
    try {
        const product = await Product.create(req.body);

        res.status(201).json({success : true, message : "Product created successfully.", product});
    } catch (error) {
        next(error);
    }
}

//Update a product

export const updateProduct = async (req, res, next) =>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            runValidators : true
        });

        if(!product)
            return res.status(404).json({success : false, message : "Product not found. "});

        res.json({success : true, message : "product updated successfully.", product});

    } catch (error) {
        next(error);
    }
}