const db = require('../models');

//image upload
const multer = require('multer');
const path = require('path');

// Create main model for product
const Product = db.products;
const Review = db.reviews;

//main work
// 1. create product

const addProduct = async (req, res) => {

	let info = {
		image: req.file.path,
		title: req.body.title,
		price: req.body.price,
		description: req.body.description,
		published: req.body.published ? req.body.published : false
	}

	const product = await Product.create(info)
	res.status(200).send(product)
	console.log(product.dataValues)
	console.log(req.file)

}


// 2. get all products
const getAllProducts = async (req, res) => {
	try {
		const products = await Product.findAll();
		res.status(200).json(products);
	} catch (error) {
		console.log(error);
	}
}

// 3. get product by id
const getProductById = async (req, res) => {
	const { id } = req.params;
	try {
		const product = await Product.findOne({
			where: {
				id
			}
		});
		res.status(200).json(product);
	} catch (error) {
		console.log(error);
	}
}

// 4. update product by id
const updateProductById = async (req, res) => {
	const { id } = req.params;
	const { title, description, price, published } = req.body;
	try {
		const product = await Product.update({
			title,
			description,
			price,
			published
		}, {
			where: {
				id
			}
		});
		res.status(200).json(product);
	} catch (error) {
		console.log(error);
	}
}

// 5. delete product by id
const deleteProductById = async (req, res) => {
	const { id } = req.params;
	try {
		const product = await Product.destroy({
			where: {
				id
			}
		});
		res.status(200).send(`Product with id ${id} has been deleted.`);
	} catch (error) {
		console.log(error);
	}
}

// 6. get published products
const getPublishedProducts = async (req, res) => {
	try {
		const products = await Product.findAll({
			where: {
				published: true
			}
		});
		res.status(200).send(products);
	} catch (error) {
		console.log(error);
	}
}

// 7. connect one to many relationship products and reviews
const getProductReviews = async (req, res) => {
	const { id } = req.params;
	try {
		const product = await Product.findAll({
			include: [{
				model: Review,
				as: 'review'
			}],
			where: {
				id: id
			},
		})
		res.status(200).json(product);
	} catch (error) {
		console.log(error);
	}
}
// 8. upload image controller
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './images')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname))
	}
})

const upload = multer({
	storage: storage,
	limits: { fileSize: 10000000 },
	fileFilter: (req, file, cb) => {
		const fileTypes = /jpeg|jpg|png|gif/;
		const mimetype = fileTypes.test(file.mimetype);
		const extname = fileTypes.test(path.extname(file.originalname));
		if (mimetype && extname) {
			return cb(null, true);
		}
		cb('Error: Images only!');
	}
}).single('image');


module.exports = {
	addProduct,
	getAllProducts,
	getProductById,
	updateProductById,
	deleteProductById,
	getPublishedProducts,
	getProductReviews,
	upload
}