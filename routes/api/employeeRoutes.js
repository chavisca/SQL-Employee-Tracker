const router = require('express').Router();
const employeeModel = require('../../models/employeeModel');

// GET all employees
router.get('/', async (req, res) => {
  try {
    const empData = await employeeModel.findAll();
    res.status(200).json(empData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new user
router.post('/', async (req, res) => {
  try {
    const empData = await employeeModel.create(req.body);
    res.status(200).json(empData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a user
router.put('/:id', async (req, res) => {
  try {
    const empData = await employeeModel.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!empData[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(empData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
