const router = require('express').Router();
const roleModel = require('../../models/roleModel');

// GET all roles
router.get('/:id', async (req, res) => {
  try {
    const roleData = await roleModel.findAll();
    res.status(200).json(roleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new role
router.post('/', async (req, res) => {
  try {
    const roleData = await roleModel.create(req.body);
    res.status(200).json(roleData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a role
router.put('/:id', async (req, res) => {
  try {
    const roleData = await roleModel.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!roleData[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(roleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
