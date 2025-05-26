const Product = require("../../models/Product")

exports.createProduct = async (req, res) => {
    const { name, price, categoryId, userId } = req.body
    // validataion
    if (!name || !price || !categoryId || !userId) {
        return res.status(403).json(
            { success: false, message: "Missing field" }
        )
    }
    try {
        const product = new Product(
            {
                name,
                price,
                categoryId,
                sellerId: userId
            }
        )
        await product.save()
        return res.status(200).json(
            {
                success: true,
                data: product,
                message: 'Product saved'
            }
        )
    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: 'Server error'
            }
        )
    }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("categoryId", "name")
            .populate("sellerId", "firstName email")
        // populate("key", "projection fields")
        return res.status(200).json(
            { success: true, message: "Product fetched", data: products }
        )
    } catch (err) {
        return res.status(500).json(
            { success: false, message: "Server error" }
        )
    }
}
