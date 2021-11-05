const router = require('express').Router();
const { Manatee, User } = require('../../models');


// Find all Manatees. be sure to include its associated User data
router.get('/', async (req, res) => {
  try {
    const manateeData = await Manatee.findAll({
      include: [{ model: User }],
      order: [
        ['id', 'ASC']
      ]
    });
    res.status(200).json(manateeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Find a single Manatee by its `id`. be sure to include its associated User data
router.get('/:id', async (req, res) => {
  try {
    const manateeData = await Manatee.findByPk(req.params.id, {
      include: [{ model: User }],
    });

    if (!manateeData) {
      res.status(404).json({ message: 'No Manatee found with that id!' });
      return;
    }
    res.status(200).json(manateeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new Manatee
router.post('/', async (req, res) => {
  try {
    const manateeData = await Manatee.create({
      name:req.body.name,
      // score_requirements: req.body.score
    })
    res.status(200).json(manateeData)
  } catch(err) {
      res.status(400).json({ message: "an error occured", err: err });
    };
});


// Update a Manatee's score requirements or name by its `id` value 
router.put('/:id', async (req, res) => {
  try {
    const manateeData = await Manatee.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!manateeData[0]) {
      res.status(404).json({ message: 'No Manatee with this id!' });
      return;
    }
    res.status(200).json(manateeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a Manatee by its `id` value
router.delete('/:id', async (req, res) => {
    try {
      const manateeData = await Manatee.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!manateeData) {
        res.status(404).json({ message: 'No Manatee with this id!' });
        return;
      }
      res.status(200).json(manateeData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
