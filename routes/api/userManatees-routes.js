const router = require('express').Router();
const { UserManatee,Manatee, User } = require('../../models');

// The `http://localhost:3000/api/usermanatees` endpoint

// DONE - find all UserManatees. be sure to include its associated User and Manatee data
router.get('/', async (req, res) => {
  try {
    const usmanData = await UserManatee.findAll();
    res.status(200).json(usmanData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DONE - find a single Manatee by its `id`. be sure to include its associated User data
router.get('/:id', async (req, res) => {
  try {
    const usmanData = await UserManatee.findByPk(req.params.id);

    if (!usmanData) {
      res.status(404).json({ message: 'No UserManatee found with that id!' });
      return;
    }

    res.status(200).json(usmanData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DONE - create a new UserManatee
router.post('/', async (req, res) => {
  try {
    const usmanData = await UserManatee.create({
      user_id:req.body.user_id,
      manatee_id:req.body.manatee_id
      // score_requirements: req.body.score
    })
    res.status(200).json(usmanData)
  } catch(err) {
      console.log(err);
      res.status(400).json({ message: "an error occured", err: err });
    };
});


// DONE - update a UserManatee's count by its `id` value 
router.put('/:id', async (req, res) => {
  try {
    const usmanData = await UserManatee.update(req.body, {
      count: count++,
      where: {
        id: req.params.id,
      },
    });
    if (!usmanData[0]) {
      res.status(404).json({ message: 'No UserManatee with this id!' });
      return;
    }
    res.status(200).json(usmanData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DONE - delete a UserManatee by its `id` value
router.delete('/:id', async (req, res) => {
    try {
      const usmanData = await UserManatee.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!usmanData) {
        res.status(404).json({ message: 'No UserManatee with this id!' });
        return;
      }
      res.status(200).json(usmanData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
