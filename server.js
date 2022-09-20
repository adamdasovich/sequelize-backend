const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
//Middleware


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const router = require('./routes/productRouter');
app.use('/api/products', router);

//static images folder
app.use('/images', express.static('./images'));

app.get('/', (req, res) => {
	res.send('Server is ready');
});


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
})