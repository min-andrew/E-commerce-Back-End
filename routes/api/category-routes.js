const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categorydata = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categorydata);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categorydata = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!categorydata) {
      res.status(404).json({ message: 'No category found with this ID!' });
      return;
    }

    res.status(200).json(categorydata);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const categorydata = await Category.create({ cateogry_name: req.body.category_name });
    res.status(200).json(categorydata);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categorydata = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!categorydata) {
      res.status(404).json({ message: 'No category found with this ID!' });
      return;
    }

    res.status(200).json(categorydata);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categorydata = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categorydata) {
      res.status(404).json({ message: 'No category found with this ID!' });
      return;
    }

    res.status(200).json(categorydata);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
