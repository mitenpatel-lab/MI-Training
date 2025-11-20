//1. Count all users
db.users.aggregate([{ $count: "totalUsers" }])

// Find products between price 1000–5000
db.products.aggregate([{ $match: { price: { $gte: 1000, $lte: 5000 } } }])

// Project name + email
db.users.aggregate([{ $project: { name: 1, email: 1, _id: 0 } }])

// Sort products by highest price
db.products.aggregate([{ $sort: { price: -1 } }])

// Count users per city
db.users.aggregate([{ $group: { _id: "$city", count: { $sum: 1 } } }])

// Total revenue
db.orders.aggregate([{ $group: { _id: null, totalRevenue: { $sum: "$amount" } } }])

//7. Distinct categories
db.products.aggregate([{ $group: { _id: "$category" } }])

//8. Products with rating >= 4
db.products.aggregate([{ $match: { rating: { $gte: 4 } } }])

//9. Last 5 orders
db.orders.aggregate([{ $sort: { createdAt: -1 } }, { $limit: 5 }])

//10. Top 3 expensive products
db.products.aggregate([{ $sort: { price: -1 } }, { $limit: 3 }])

//1// Users starting with A
db.users.aggregate([{ $match: { name: /^A/i } }])

//1// Avg price per category
db.products.aggregate([{ $group: { _id: "$category", avgPrice: { $avg: "$price" } } }])

//13. Users with email not verified
db.users.aggregate([{ $match: { isEmailVerified: false } }])

//1// Out of stock count
db.products.aggregate([{ $match: { stock: 0 } }, { $count: "totalOutOfStock" }])

//1// Price range wrong fix
db.products.aggregate([{ $match: { price: { $gte: 1000, $lte: 5000 } } }])

//16. Users age > 30
db.users.aggregate([{ $match: { age: { $gt: 30 } } }, { $project: { name: 1, age: 1, _id: 0 } }])

//17. Orders on specific date
db.orders.aggregate([{ $match: { createdAt: ISODate("2025-11-20T10:00:00Z") } }, { $count: "total" }])

//18. Most active user by order count
db.orders.aggregate([{ $group: { _id: "$userId", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 1 }])

//19. Product → Category lookup
db.products.aggregate([{ $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "category" } }])

//20. Top reviewer products
db.reviews.aggregate([{ $group: { _id: "$productId", total: { $sum: 1 } } }, { $match: { total: { $gte: 3 } } }])

//2// Product price < discount price check
db.products.aggregate([{ $match: { $expr: { $lt: ["$discountPrice", "$price"] } } }])

//2// Discount < 80 % price
db.products.aggregate([{ $match: { $expr: { $lt: ["$discountPrice", { $multiply: ["$price", 0.8] }] } } }])

//2// Category join + projection
db.products.aggregate([{ $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "category" } }, { $unwind: "$category" }, { $project: { name: 1, price: 1, categoryName: "$category.name", _id: 0 } }])

//2// Users with > 3 orders & spent > 5000
db.users.aggregate([{ $lookup: { from: "orders", localField: "_id", foreignField: "userId", as: "orders" } }, { $unwind: "$orders" }, { $group: { _id: "$_id", orderCount: { $sum: 1 }, totalSpent: { $sum: "$orders.amount" } } }, { $match: { orderCount: { $gt: 3 }, totalSpent: { $gt: 5000 } } }])

//2// Max rating in product reviews
db.products.aggregate([{ $addFields: { maxRating: { $max: "$reviews.rating" } } }, { $match: { maxRating: { $gte: 5 } } }, { $project: { name: 1, maxRating: 1, _id: 0 } }])

//2// Avg rating per product
db.products.aggregate([{ $addFields: { avgRating: { $avg: "$reviews.rating" } } }, { $match: { avgRating: { $gte: 2 } } }, { $project: { name: 1, avgRating: 1, _id: 0 } }])

//27. GST price
db.products.aggregate([{ $project: { name: 1, price: 1, priceWithGST: { $multiply: ["$price", 18] } } }])

//28. Good reviews count(>= 4)
db.products.aggregate([{ $addFields: { goodReviewCount: { $size: { $filter: { input: "$reviews", as: "r", cond: { $gte: ["$$r.rating", 4] } } } } } }])

//29. Users with orders using lookup & project
db.users.aggregate([{ $lookup: { from: "orders", localField: "_id", foreignField: "userId", as: "orders" } }, { $match: { "orders.0": { $exists: true } } }])

//30. Products with at least 10 reviews
db.products.aggregate([{ $match: { $expr: { $gte: [{ $size: "$reviews" }, 10] } } }])

//3// Top 3 categories by avg rating
db.reviews.aggregate([{ $lookup: { from: "products", localField: "productId", foreignField: "_id", as: "product" } }, { $unwind: "$product" }, { $lookup: { from: "categories", localField: "product.categoryId", foreignField: "_id", as: "category" } }, { $unwind: "$category" }, { $group: { _id: "$category._id", categoryName: { $first: "$category.name" }, totalReviews: { $sum: 1 }, avgRating: { $avg: "$rating" } } }, { $match: { totalReviews: { $gte: 5 } } }, { $sort: { avgRating: -1 } }, { $limit: 3 }])

//3// Latest 10 users
db.users.aggregate([{ $sort: { createdAt: -1 } }, { $limit: 10 }])

//3// Total quantity sold per product
db.orders.aggregate([{ $group: { _id: "$productId", totalQty: { $sum: "$quantity" } } }])

//3// Total order amount per user
db.orders.aggregate([{ $group: { _id: "$userId", totalSpent: { $sum: "$amount" } } }])

//3// List users with count of orders
db.users.aggregate([{ $lookup: { from: "orders", localField: "_id", foreignField: "userId", as: "orders" } }, { $project: { name: 1, orderCount: { $size: "$orders" } } }])

//3// Products sorted by number of reviews
db.products.aggregate([{ $project: { name: 1, reviewCount: { $size: "$reviews" } } }, { $sort: { reviewCount: -1 } }])

//37. Products with no reviews
db.products.aggregate([{ $match: { $expr: { $eq: [{ $size: "$reviews" }, 0] } } }])

//38. Top sold categories
db.orders.aggregate([{ $lookup: { from: "products", localField: "productId", foreignField: "_id", as: "p" } }, { $unwind: "$p" }, { $lookup: { from: "categories", localField: "p.categoryId", foreignField: "_id", as: "c" } }, { $unwind: "$c" }, { $group: { _id: "$c._id", categoryName: { $first: "$c.name" }, revenue: { $sum: { $multiply: ["$amount", "$quantity"] } } } }, { $sort: { revenue: -1 } }, { $limit: 3 }])

//39. Average order amount
db.orders.aggregate([{ $group: { _id: null, avg: { $avg: "$amount" } } }])

//40. Users who ordered more than once
db.orders.aggregate([{ $group: { _id: "$userId", count: { $sum: 1 } } }, { $match: { count: { $gt: 1 } } }])