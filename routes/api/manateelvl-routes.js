const router = require('express').Router();
const { ManateeLevel, User } = require('../../models');

// The `/api/Levels` endpoint

// DONE - find all levels. be sure to include its associated User data
router.get('/', async (req, res) => {
  try {
    const levelData = await ManateeLevel.findAll({
      include: [{ model: User }],
    });
    res.status(200).json(levelData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DONE - find a single Level by its `id`. be sure to include its associated User data
router.get('/:id', async (req, res) => {
  try {
    const levelData = await ManateeLevel.findByPk(req.params.id, {
      include: [{ model: User }],
    });

    if (!levelData) {
      res.status(404).json({ message: 'No Level found with that id!' });
      return;
    }

    res.status(200).json(levelData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DONE - create a new Level
router.post('/', async (req, res) => {
  try {
    const levelData = await ManateeLevel.create({
      level_name: req.body.name,
      score_requirements: req.body.score
    })
    res.status(200).json(levelData)
  } catch(err) {
      console.log(err);
      res.status(400).json({ message: "an error occured", err: err });
    };
});


// DONE - update a Level's score requirements or name by its `id` value 
router.put('/:id', async (req, res) => {
  try {
    const levelData = await ManateeLevel.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!levelData[0]) {
      res.status(404).json({ message: 'No Level with this id!' });
      return;
    }
    res.status(200).json(levelData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DONE - delete on Level by its `id` value
router.delete('/:id', async (req, res) => {
    try {
      const levelData = await ManateeLevel.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!levelData) {
        res.status(404).json({ message: 'No Level with this id!' });
        return;
      }
      res.status(200).json(levelData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
