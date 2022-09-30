const { User } = require('../models');
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');


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
      Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((dbUserData) => res.json(dbUserData));
    },
    // async addReactionToThought(req,res){
    //     let update = await Thought.findByIdAndUpdate(
    //         { _id: req.params.thoughtId },
    //         { $addToSet: { reactions: this } },
    //         {runValidators:true, new:true}
    //       );
    //       // we find the user by userName and find that.
    //       console.log(update);
    //     // let user = User.findByIdAndUpdate(
    //     //     {username : req.body.username },
    //     //     {
    //     //       $push: {
    //     //         reactions: req.body,
    //     //       },
    //     //     }
    //     //   );
    //       console.log("out?",update);
    //       // res.json(update)
    //       res.json();
    // },
    addReactionToThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: "No thought with this id!" })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteReactionFromThought(req,res){
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      ).then ((dbUserData) => res.json(dbUserData));

//      Reaction.findOneAndRemove( {reactions: req.params.reactionId} )
 //       
    },

};