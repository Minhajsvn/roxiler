const axios = require('axios');
const Product = require('../models/product.model');

const storeInDatabase = async () => {
    try {
        const existingProducts = await Product.countDocuments();
        if (existingProducts > 0) {
            throw new Error("Database already initialized.");
        }

        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const products = response.data;
            
        const productList = products.map(product => ({
            productId: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
            sold: product.sold,
            dateOfSale: product.dateOfSale ? new Date(product.dateOfSale) : null,

        }))

        await Product.insertMany(productList);
    } catch (error) {
        throw new Error("Error occurred while initializing the database.");
    }
}

const filterInMonth = (month) => {
    return month 
            ? {
                $expr:{
                    $eq: [{ $month: "$dateOfSale" }, new Date(`${month} 1`).getMonth() + 1],
                },
            } : {}
}

const getAllTransactions = async (query) => {
    const { month, search = '', page = 1, perPage = 10 } = query;

    try {
        const filter = filterInMonth(month);

        if (search) {
            filter.$or = [
                { title: new RegExp(search, "i") },
                { description: new RegExp(search, "i") },
                { price: parseFloat(search) || 0 },
                ];
            }

            const transactions = await Product.find(filter)
            .skip((page - 1) * perPage)
            .limit(parseFloat(perPage));

            return transactions;
            
    } catch (error) {
        throw new Error("Error occurred while fetching the transactions.", error);
    }
}

const getSaleStats = async (month) => {

    try {
        const statistics = await Product.aggregate([
            { $match: filterInMonth(month) },
            {
                $group: {
                    _id: null,
                    totalSaleAmount: { $sum: "$price" },
                    soldItemsCount: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },
                    notSoldItemsCount: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } },
                    },
                },
            ]);
    
            const result = statistics[0]  || {
                totalSaleAmount: 0,
                soldItemsCount: 0,
                notSoldItemsCount: 0,
            };
    
            return result;
    } catch (error) {
        throw new Error("Error occurred while fetching the sale stats.");
    }
}

const getBarChartData = async (month) => {

    try {
        const barChartData = await Product.aggregate([
            { $match: filterInMonth(month) }, 
            {
            $group: {
                _id: {
                $switch: {
                    branches: [
                    { case: { $and: [{ $gte: ["$price", 0] }, { $lte: ["$price", 100] }] }, then: "0-100" },
                    { case: { $and: [{ $gte: ["$price", 101] }, { $lte: ["$price", 200] }] }, then: "101-200" },
                    { case: { $and: [{ $gte: ["$price", 201] }, { $lte: ["$price", 300] }] }, then: "201-300" },
                    { case: { $and: [{ $gte: ["$price", 301] }, { $lte: ["$price", 400] }] }, then: "301-400" },
                    { case: { $and: [{ $gte: ["$price", 401] }, { $lte: ["$price", 500] }] }, then: "401-500" },
                    { case: { $and: [{ $gte: ["$price", 501] }, { $lte: ["$price", 600] }] }, then: "501-600" },
                    { case: { $and: [{ $gte: ["$price", 601] }, { $lte: ["$price", 700] }] }, then: "601-700" },
                    { case: { $and: [{ $gte: ["$price", 701] }, { $lte: ["$price", 800] }] }, then: "701-800" },
                    { case: { $and: [{ $gte: ["$price", 801] }, { $lte: ["$price", 900] }] }, then: "801-900" },
                    { case: { $gte: ["$price", 901] }, then: "901-above" },
                    ],
                    default: "Unknown Range",
                },
                },
                count: { $sum: 1 },
            },
            },
            {
            $project: {
                _id: 0,
                priceRange: "$_id",
                count: 1,
            },
            },
        ]);
    
        return barChartData;
    } catch (error) {
        throw new Error("Error occurred while fetching the bar chart stats.", error);
    }
}

const getPieChartData = async (month) => {

    try {
        const pieChartData = await Product.aggregate([
            { $match: filterInMonth(month) }, 
            {
            $group: {
                _id: "$category",
                count: { $sum: 1 },
            },
            },
            {
            $project: {
                _id: 0,
                category: "$_id",
                count: 1,
            },
            },
        ]);
    
        return pieChartData;
    } catch (error) {
        throw new Error("Error occurred while fetching the pie chart stats.", error);
    }
}

const getProductStats = async (query) => {
    const { month } = query;

    try {
        const [saleStats, barChart, pieChart] = await Promise.all([
            getSaleStats(month),
            getBarChartData(month),
            getPieChartData(month)
        ]);
    
        const combinedData = {
            saleStats,
            barChart,
            pieChart
        };
    
        return combinedData;
    } catch (error) {
        throw new Error('Error occurred while fetching the product stats in month.')
    }
}

module.exports = {
    storeInDatabase,
    getAllTransactions,
    getProductStats,
}