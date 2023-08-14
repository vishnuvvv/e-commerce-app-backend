import Product from "../models/Product"

export const addNewProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save()
        res.status(201).json(savedProduct)

    } catch (err) {
        res.status(500).json(err)
    }
}

export const updateProduct = async (req, res) => {
    const id = req.params.id;
    const product = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product)
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(500).josn(err)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted")
    } catch (err) {
        res.status(500).json("err")
    }
}

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
}


export const getAllProducts = async (req, res) => {

    const countQuery = req.query.count;
    const categoryQuery = req.query.category;

    try {
        let products;
        if (countQuery) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (categoryQuery) {
            products = await Product.find({
                categories: {
                    $in: [categoryQuery]
                }
            })
        } else {
            products = await Product.find()
        }
        res.status(200).json(products)

    } catch (err) {
        res.status(500).json(err)
    }
}