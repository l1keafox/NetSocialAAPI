const { User } = require('../models');
const Thought = require('../models/Thought');


module.exports = {
    getThoughts(req,res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
  
    },
    getSingleThought(req,res){
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .populate('reactions')
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    async createThought(req,res){
      // We need to have this add this thought.id too 
      try{
        let dbUserData = await Thought.create(req.body);
        let userd = await User.findOneAndUpdate({username: req.body.userName},{$push:{thoughts: dbUserData._id}},{ new: true });
        res.json(dbUserData);
      }catch(err){
        res.status(500).json(err)
      }

    },
    updateThought(req,res){
        Thought.findOneAndUpdate( 
            {_id:req.params.thoughtId},
            {$set: req.body},
            {runValidators:true, new:true}
          ).then((user)=>
            res.json(user)
          ).catch((err)=>{
      
          });
      
    },
    deleteThought(req,res){
        Thought.findOneAndDelete( req.params.thoughtId )
        .then((dbUserData) => res.json(dbUserData));

    },
    addReactionToThought(req,res){
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            {
              $push: {
                reactions: req.body,
              },
            }
          ).then ((dbUserData) => res.json(dbUserData))
    },
    deleteReactionFromThought(req,res){
        Thought.findOneAndRemove( {reactions: req.params.thoughtId} )
        .then ((dbUserData) => res.json(dbUserData));
    },

};