const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect
});

sequelize.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	}).catch(err => {
		console.error('Unable to connect to the database:', err);
	})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require('./productModel.js')(sequelize, DataTypes);
db.reviews = require('./reviewModel.js')(sequelize, DataTypes);

db.sequelize.sync({ force: false })
	.then(() => {
		console.log('Tables have been resynced successfully.');
	})
	.catch(err => {
		console.log(err)
	})

// i to many relationship
db.products.hasMany(db.reviews, {
	foreignKey: 'product_id',
	as: 'review'
});
db.reviews.belongsTo(db.products, {
	foreignKey: 'product_id',
	as: 'product'
});

module.exports = db;
