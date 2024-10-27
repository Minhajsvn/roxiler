const productService = require('../services/product.service');

const storeData = async (req, res) => {
    try {
        await productService.storeInDatabase();
        res.status(200).send("Database has been stored successfully!");
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await productService.getAllTransactions(req.query);
        res.status(200).send(transactions);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const getProductStats = async (req, res) => {
    try {
        const transactions = await productService.getProductStats(req.query);
        res.status(200).send(transactions);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}



module.exports = {
    storeData,
    getAllTransactions,
    getProductStats,
}