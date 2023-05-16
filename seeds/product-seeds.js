const { Product } = require('../models');

const productData = [
  {
    product_name: 'Plain T-Shirt',
    price: 14.99,
    stock: 20,
    category_id: 1,
  },
  {
    product_name: 'Running Sneakers',
    price: 120.00,
    stock: 40,
    category_id: 5,
  },
  {
    product_name: 'Branded Baseball Hat',
    price: 14.99,
    stock: 10,
    category_id: 4,
  },
  {
    product_name: 'Top 40 Music Compilation Vinyl Record',
    price: 7.99,
    stock: 30,
    category_id: 3,
  },
  {
    product_name: 'Jeans',
    price: 35.99,
    stock: 22,
    category_id: 2,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
