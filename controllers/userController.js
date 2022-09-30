const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate('thoughts')
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

  async deleteUser(req,res){
    let user = await User.findOneAndDelete( req.params.userId );
    if(!user){
      res.status(404).json() 
    } else {
      await Thought.deleteMany({ userName: user.username} );
    }
    res.status(200).json(user);
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
