const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'product-tagged' }]
    })
    res.status(200).json(tags)
    return tags
  } catch {
    res.status(500).json(err);
    }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'product-tagged' }]
    })
    res.status(200).json(tag)
    return tag
  } catch {
    res.status(500).json(err);
    }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
  const newTag = Tag.create(req.body)
  res.status(200).json(newTag)
  return newTag
} catch {
  res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
  const updatedTag = Tag.update(req.body)
  res.status(200).json(updatedTag)
  return updatedTag
  } catch {
  res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
    try {
      const tagData = await Tag.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!tagData) {
        res.status(404).json({ message: 'No tag with this ID' });
        return;
      }
  
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;



