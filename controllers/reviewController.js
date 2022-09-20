const db = require('../models');

const Review = db.reviews;

// 1. Add review
const addReview = async (req, res) => {
	const { rating, description } = req.body;
	const { id } = req.params;
	try {
		const review = await Review.create({
			rating,
			description,
			product_id: id
		})
			.then((review) => {
				const res = {
					success: true,
					message: 'Review Created',
					review
				}
				return res
			}).catch((error) => {
				const res = {
					success: false,
					message: 'Review not created',
					error
				}
				return res
			})
		res.json(review)
	} catch (error) {
		console.log(error);
	}
}

// get all reviews
const getAllReviews = async (req, res) => {
	try {
		const reviews = await Review.findAll();
		res.status(200).json(reviews);
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	addReview,
	getAllReviews
}