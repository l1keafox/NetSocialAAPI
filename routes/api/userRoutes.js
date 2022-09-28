const router = require('express').Router();

const {deleteUser,updateUser,getUsers, getSingleUser,createUser,addFriend,deleteFriend}  = require('../../controllers/userController');
// GET all users
// POST a new user:
 router.route('/').get(getUsers).post(createUser);

 // GET a single user by its _id and populated thought and friend data
// PUT to update a user by its _id
// DELETE to remove user by its _id
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);
module.exports = router;