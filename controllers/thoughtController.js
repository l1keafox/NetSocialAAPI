const Thought = require('../models/Thought');


module.exports = {
    getThoughts(req,res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
  
    },
    getSingleThought(req,res){
        Thought.findOne({ _id: req.params.thoughtId })
        // .select('-__v')
        // .populate('posts')
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    createThought(req,res){
        Thought.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },
    updateThought(req,res){

    },
    deleteThought(req,res){

    },
    addReactionToThought(req,res){
//        Thought.
    },
    deleteReactionFromThought(req,res){

    },

};