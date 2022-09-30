const { Schema, Types , model} = require("mongoose");
const reactSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      // Set default value to the current timestamp
      default: Date.now,
      // Use a getter method to format the timestamp on query
      get: date=>date.toDateString()
    },
    username: {
      //creator
      type: String,
      required: true,
    },
      // sort of like replies.
      //Array of nested documents created with the reactionSchema
      reactions: [reactSchema], 

  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

//     Schema Settings

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema
    .virtual('reactionCount')
    .get(function(){
        return this.reactions.length;
    });

const Thought = model('thought',thoughtSchema)
module.exports = Thought;
