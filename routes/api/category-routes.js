const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product}]
    })
    res.status(200).json(categories)
    return categories
  } catch {
    res.status(500).json(err);
    }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.num, {
      include: [{ model: Product}]
    })
    res.status(200).json(category)
    return category
  } catch {
    res.status(500).json(err);
    }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = Category.create(req.body)
    res.status(200).json({newCategory})
  } catch {
    res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = Category.update(req.body)
    res.status(200).json(updatedCategory)
    return updatedCategory
    } catch {
    res.status(500).json(err)
    }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category with this ID' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
