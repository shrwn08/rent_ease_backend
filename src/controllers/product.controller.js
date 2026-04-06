import Product from "../models/product.model.js"


export const getProduct = async (req, res, next)=>{
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