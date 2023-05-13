const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// GET all products with their categories and tags
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ['category_name'],
        },
        {
          model: Tag,
          attributes: ['tag_name'],
        },
      ],
    });
    res.status(200).json(productData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve products' });
  }
});

// GET a single product with its category and tags
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          attributes: ['category_name'],
        },
        {
          model: Tag,
          attributes: ['tag_name'],
        },
      ],
    });
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve the product' });
  }
});

// CREATE a new product
router.post('/', async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    res.status(200).json(productData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create the product' });
  }
});

// UPDATE a product by its id
router.put('/:id', async (req, res) => {
  try {
    const [updatedRows] = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedRows) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update the product' });
  }
});

// DELETE a product by its id
router.delete('/:id', async (req, res) => {
  try {
    const deletedRows = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedRows) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete the product' });
  }
});

module.exports = router;
