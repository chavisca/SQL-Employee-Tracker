const router = require('express').Router();
const departmentModel = require('../../models/departmentModel');

// GET all departments
router.get('/', async (req, res) => {
  try {
    const deptData = await departmentModel.findAll();
    res.status(200).json(deptData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new user
router.post('/', async (req, res) => {
  try {
    const deptData = await departmentModel.create(req.body);
    res.status(200).json(deptData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a user
router.put('/:id', async (req, res) => {
  try {
    const deptData = await departmentModel.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!deptData[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(deptData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
