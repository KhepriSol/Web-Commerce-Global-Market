const express = require('express');
const router = express.Router();
const { Category, Product } = require('../../models');

// GET all categories, including associated products
router.get('/', async (req, res) => {
  try {
    const dbCatData = await Category.findAll({
      include: [
        { 
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    });
    if (!dbCatData) {
      res.status(404).json({ message: 'No categories found' });
      return;
    }
    res.json(dbCatData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET a category by id, including associated products
router.get('/:id', async (req, res) => {
  try {
    const dbCatData = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [
        { 
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    });
    if (!dbCatData) {
      res.status(404).json({ message: 'No categories found' });
      return;
    }
    res.json(dbCatData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new category
router.post('/', async (req, res) => {
  try {
    const dbCatData = await Category.create({
      category_name: req.body.category_name
    });
    res.json(dbCatData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT update a category by id
router.put('/:id', async (req, res) => {
  try {
    const dbCatData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!dbCatData[0]) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json({ message: 'Category updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE a category by id
router.delete('/:id', async (req, res) => {
  try {
    const dbCatData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!dbCatData) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }
    res.json({ message: 'Category deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
