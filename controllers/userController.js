const User = require("../models/User");

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      // .populate('posts')
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req,res){
    User.findOneAndDelete( req.params.userId )
        .then((userData) => 
          !userData
          ? res.status(404).json() 
          : Thought.remove({ userName: userData.username} )
        );
  },
  updateUser(req,res){
    User.findOneAndUpdate( 
      {_id:req.params.userId},
      {$set: req.body},
      {runValidators:true, new:true}
    ).then((user)=>
      res.json(user)
    ).catch((err)=>{

    });
  },
  addFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      {
        $push: {
          friends: req.params.friendId,
        },
      }
    ).then ((dbUserData) => res.json(dbUserData))
  },
  async deleteFriend(req, res) {
    await User.findOneAndRemove( {friends: req.params.friendId} )
              .then ((dbUserData) => res.json(dbUserData));
  },
};
