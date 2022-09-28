const router = require('express').Router();

const {deleteThought,updateThought,getThoughts,getSingleThought,createThought,addReactionToThought,deleteReactionFromThought}  = require('../../controllers/thoughtController');
//getUsers, getSingleUser,createUser
// GET to get all thoughts
// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
router.route('/').get(getThoughts).post(createThought);

// GET to get a single thought by its _id
// PUT to update a thought by its _id
// DELETE to remove a thought by its _id
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReactionToThought).delete(deleteReactionFromThought);
module.exports = router;