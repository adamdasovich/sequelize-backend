module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define('product', {
		image: {
			type: DataTypes.STRING
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		published: {
			type: DataTypes.BOOLEAN
		}
	});

	return Product;
}