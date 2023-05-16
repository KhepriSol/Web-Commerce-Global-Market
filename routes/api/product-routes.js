const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Endpoint: /api/products

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'product_name', 'price', 'stock'],
      include: [
        {
          model: Category,
          attributes: ['category_name']
        },
        {
          model: Tag,
          attributes: ['tag_name']
        }
      ]
    });
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while retrieving the products' });
  }
});

// Get a specific product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'product_name', 'price', 'stock'],
      include: [
        {
          model: Category,
          attributes: ['category_name']
        },
        {
          model: Tag,
          attributes: ['tag_name']
        }
      ]
    });
    if (!product) {
      res.status(404).json({ message: 'No product found with the provided ID' });
      return;
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while retrieving the product' });
  }
});

// Create a new product
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: 'An error occurred while creating the product' });
    });
});

// Update a product by ID
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id
          };
        });
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags)
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((error) => {
      res.status(400).json({ error: 'An error occurred while updating the product' });
    });
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deletedProduct) {
      res.status(404).json({ message: 'No product found with the provided ID' });
      return;
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while deleting the product' });
  }
});

module.exports = router;
